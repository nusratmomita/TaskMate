<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // what we are showing in the frontend
        
        // made mistake here
        // wrote $id instead of "id"
        return [
            "id" => $this->id,
            "name" => $this->name,
            "email" => $this->email
        ];
    }
}
