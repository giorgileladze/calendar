<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Holiday>
 */
class HolidayFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = $this->faker->company(); // for holidays names we can use faker->company method for testing purpuses
        $date = $this->faker->dateTimeBetween('-3 month', '+9 month');

        return [
            'title' => $title,
            'date' => $date,
        ];
    }
}
