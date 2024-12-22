<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserCrudResource extends JsonResource
{
    public static $wrap = false;// showing the data of the form when we are on the edit page
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // what we are showing in the frontend
        return [
            "id" => $this->id,
            "name" => $this->name,
            "email" => $this->email,
            'created_at' => (new Carbon($this->created_at))->format('d-m-Y:i:s'),
        ];
    }
}
