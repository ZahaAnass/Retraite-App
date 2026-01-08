<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Service;
use App\Models\Message;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. MAIN ACCOUNTS (for your demo)
        $admin = User::factory()->create([
            'name' => 'Super Admin',
            'email' => 'admin@example.com',
            'role' => 'admin',
        ]);

        $retraite = User::factory()->create([
            'name' => 'Jean Retraité',
            'email' => 'retraite@example.com',
            'role' => 'retraite',
            'bio' => 'Expert en tout, passionné par rien.',
        ]);

        $demandeur = User::factory()->create([
            'name' => 'Sophie Demandeur',
            'email' => 'demandeur@example.com',
            'role' => 'demandeur',
        ]);

        // 2. MASS USERS GENERATION
        // Create 40 Retirees with 1 to 4 services each
        $retirees = User::factory(40)->create(['role' => 'retraite'])->each(function ($u) {
            Service::factory(rand(1, 4))->create(['user_id' => $u->id]);
        });

        // Create 60 Demandeurs
        $demandeurs = User::factory(60)->create(['role' => 'demandeur']);

        // Merge all users for messaging logic
        $allUsers = $retirees->merge($demandeurs)->push($retraite, $demandeur);

        // 3. MASS MESSAGES GENERATION (Conversations)

        // Let's create 300 active conversations
        for ($i = 0; $i < 300; $i++) {
            // Pick two random distinct users
            $userA = $allUsers->random();
            $userB = $allUsers->where('id', '!=', $userA->id)->random();

            // Create a conversation history of 5 to 20 messages between them
            $msgCount = rand(5, 20);
            $startDate = now()->subDays(rand(1, 60));

            for ($j = 0; $j < $msgCount; $j++) {
                // Alternate sender
                $sender = ($j % 2 === 0) ? $userA : $userB;
                $receiver = ($sender->id === $userA->id) ? $userB : $userA;

                Message::factory()->create([
                    'sender_id' => $sender->id,
                    'receiver_id' => $receiver->id,
                    // Messages happen every few minutes/hours after start date
                    'created_at' => $startDate->copy()->addMinutes($j * rand(10, 120)),
                ]);
            }
        }

        // 4. Ensure "Jean Retraité" has a lot of messages for the Demo
        $jeansPartners = $demandeurs->random(5); // Jean talks to 5 random people
        foreach ($jeansPartners as $partner) {
            for ($k = 0; $k < 15; $k++) {
                Message::factory()->create([
                    'sender_id' => ($k % 2 === 0) ? $partner->id : $retraite->id,
                    'receiver_id' => ($k % 2 === 0) ? $retraite->id : $partner->id,
                    'created_at' => now()->subDays(2)->addHours($k),
                    'content' => "Message de test numéro $k pour la démo."
                ]);
            }
        }
    }
}
