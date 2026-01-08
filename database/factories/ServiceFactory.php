<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ServiceFactory extends Factory
{
    public function definition(): array
    {
        $categories = [
            'Mathématiques', 'Anglais', 'Physique', 'Piano', 'Guitare',
            'Jardinage', 'Plomberie', 'Électricité', 'Peinture',
            'Couture', 'Tricot', 'Cuisine', 'Pâtisserie',
            'Garde d\'animaux', 'Aide administrative', 'Comptabilité'
        ];

        return [
            'user_id' => User::factory(),
            'title' => 'Cours de ' . fake()->randomElement($categories) . ' - ' . fake()->city(),
            'description' => fake()->paragraph(5) . "\n\nDisponibilité : " . fake()->dayOfWeek(),
            'price' => fake()->randomElement([null, 10, 15, 20, 25, 30, 40, 50]),
        ];
    }
}
