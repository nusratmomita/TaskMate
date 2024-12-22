<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserCrudResource;

use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = User::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");// how this works
        }
        if (request("email")) {
            $query->where("email", "like", "%" . request("email") . "%");// how this works
        }


        $users = $query->orderBy($sortField, $sortDirection)
        ->paginate(10)// learn more about it
        ->onEachSide(1);
            
        // connects UserResource.php + Index.jsx
        return inertia("User/Index" , [
            'users' => UserCrudResource::collection($users),
            'queryParams' => request()->query() ? : null,
            'success' => session('success')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia("User/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    // after editing the user's info we need to store it using "StoreUserRequest" 
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();// getting all the date from StoreProjectRequest.php

        $data['email_verified_at'] = time();// 

        $data['password'] = bcrypt($data['password']);// encrypting the password
        
        User::create($data);

        return to_route('user.index')
                       ->with('success',"User Created Successfully!!");
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return inertia('User/Edit',[
            "user" => new UserCrudResource($user),// going to UserCrudRes.php by using this
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();// getting all the date from StoreProjectRequest.php

        $password = $data['password'] ?? null;
        if($password){
            $data['password'] = bcrypt($password);
        }
        else{
            unset($password);
        }
        $user->update($data);

        return to_route('user.index')->with('success',"USer \"$user->name\" Updated Successfully");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user_name = $user->name;
        $user->delete();
        
        return to_route('user.index')->with('success'
        ,"User \"$user_name\" Deleted Successfully");
    }
}
