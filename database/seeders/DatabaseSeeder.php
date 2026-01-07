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
        // 1. Create specific accounts for testing (Password: 'password')

        $admin = User::factory()->create([
            'name' => 'Super Admin',
            'email' => 'admin@example.com',
            'role' => 'admin',
        ]);

        $retraite = User::factory()->create([
            'name' => 'Jean Retraité',
            'email' => 'retraite@example.com',
            'role' => 'retraite',
            'bio' => 'Ancien ingénieur passionné de bricolage et de jardinage.',
        ]);

        $demandeur = User::factory()->create([
            'name' => 'Sophie Demandeur',
            'email' => 'demandeur@example.com',
            'role' => 'demandeur',
        ]);

        // 2. Create Services for our main Retiree
        Service::factory(3)->create(['user_id' => $retraite->id]);

        // 3. Create 10 other random Retirees with 2 services each
        User::factory(10)->create(['role' => 'retraite'])->each(function ($user) {
            Service::factory(2)->create(['user_id' => $user->id]);
        });

        // 4. Create 5 other random Demandeurs
        User::factory(5)->create(['role' => 'demandeur']);


        // Chat: Demandeur -> Retraité
        Message::create([
            'sender_id' => $demandeur->id,
            'receiver_id' => $retraite->id,
            'content' => 'Bonjour Jean, je suis intéressé par vos services de jardinage.',
            'created_at' => now()->subHours(5),
        ]);

        Message::create([
            'sender_id' => $retraite->id,
            'receiver_id' => $demandeur->id,
            'content' => 'Bonjour Sophie ! Avec plaisir. Quelle est la surface de votre jardin ?',
            'created_at' => now()->subHours(4),
        ]);

        Message::create([
            'sender_id' => $demandeur->id,
            'receiver_id' => $retraite->id,
            'content' => 'Environ 50m2. Êtes-vous disponible samedi ?',
            'created_at' => now()->subHours(2),
        ]);

        // Chat: Random User -> Retraité
        Message::factory(3)->create([
            'receiver_id' => $retraite->id,
        ]);
    }
}
