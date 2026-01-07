<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ServiceFactory extends Factory
{
    public function definition(): array
    {
        $services = [
            'Cours de Mathématiques', 'Jardinage et Potager', 'Bricolage à domicile',
            'Garde d\'animaux', 'Cours de Piano', 'Aide administrative',
            'Cuisine traditionnelle', 'Couture et Retouches'
        ];

        return [
            'user_id' => User::factory(), // Will be overridden in Seeder
            'title' => fake()->randomElement($services) . ' - ' . fake()->city(),
            'description' => fake()->paragraph(3) . "\n\nJe suis disponible le matin.",
            'price' => fake()->randomElement([null, 15, 20, 30, 50]), // Null = Free
        ];
    }
}
