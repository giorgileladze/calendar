<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class HolidayResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $date = explode(" ", $this->date)[0];

        return [
            'id' => $this->id,
            'title' => $this->title,
            'date' => $date,
        ];
    }
}
