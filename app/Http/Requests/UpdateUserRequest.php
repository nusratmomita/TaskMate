<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;


class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    // validation of the form
    // input data meets certain criteria.
    public function rules(): array
    {
        $user = $this->route("user");// getting the user
        return [
            "name" => ['required', 'string','max:255'],
            "email" => ['required', 
                       'email',
                       Rule::unique('users')->ignore($user->id),
                       ],// email must be unique except for the current user  
            "password" => ['nullable','confirmed',Password::min(8)->letters()->symbols()],// Ensures password matches "password_confirmation"
        ];
    }
}
