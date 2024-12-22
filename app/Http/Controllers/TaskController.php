<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Http\Resources\UserResource;
use App\Models\Project;
use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;


class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Task::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "asc");

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");// like for pattern recog
        }
        if (request("status")) {
            $query->where("status", request("status"));
        }


        $tasks = $query->orderBy($sortField, $sortDirection)
        ->paginate(10)
        ->onEachSide(1);
            
        // connects ProjectResource.php + Index.jsx
        return inertia("Task/Index" , [
            "tasks" => TaskResource::collection($tasks),
            'queryParams' => request()->query() ? : null,
            'success' => session('success')

        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    // for creating new tasks
    public function create()
    {
        $projects = Project::query()->orderby('name','asc')->get();
        $users = User::query()->orderby('name','asc')->get();
        
        return Inertia("Task/Create",[
            'projects' => ProjectResource::collection($projects),
            'users' => UserResource::collection($users),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
     // for storing the newly created task in the database
    public function store(StoreTaskRequest $request)
    {
        $data = $request->validated();// getting all the date from StoreProjectRequest.php
        //** @var $image \Illuminate\Http\UploadedFile */
        $image = $data['image'] ?? null;
        //dd($data);// used to output the contents of a variable or multiple variables for debugging purposes
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();

        if($image){
            $data['image_path'] = $image->store('task/' . Str::random(), 'public');
        }

        Task::create($data);

        return to_route('task.index')
                       ->with('success',"Task Created Successfully!!");
    }

    /**
     * Display the specified resource.
     */
    // when we click on any task it should drive us to the Task details page
    // see Show.jsx 
    public function show(Task $task)
    {
        return inertia('Task/Show', [
            'task' => new TaskResource($task),// showing proejct's things in Task's page 
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        $projects = Project::query()->orderby('name','asc')->get();
        $users = User::query()->orderby('name','asc')->get();
        
        // we have to maintain the serial of passing variables here to match the Edit() line - 9
        return Inertia("Task/Edit",[
            'task' => new TaskResource($task),
            'projects' => ProjectResource::collection($projects),
            'users' => UserResource::collection($users),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $data = $request->validated();// getting all the date from StoreProjectRequest.php
        //** @var $image \Illuminate\Http\UploadedFile */
        $image = $data['image'] ?? null;
        //dd($data);// used to output the contents of a variable or multiple variables for debugging purposes
        $data['updated_by'] = Auth::id();

        if($image){
            if($task->image_path){
                Storage::disk('public')->deleteDirectory(dirname($task->image_path));
            }
            $data['image_path'] = $image->store('task/' . Str::random(), 'public');
        }
        $task->update($data);
        //dd(session()->all());
        return to_route('task.index')->with('success',"Task \"$task->name\" Updated Successfully");
       // return to_route('task.index')->with('success',"Task \"$task->name\" Updated Successfully");

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $pro_name = $task->name;
        $task->delete();
        if($task->image_path){
            Storage::disk('public')->deleteDirectory(dirname($task->image_path));
        }
        return to_route('task.index')->with('success'
        ,"Task \"$pro_name\" Deleted Successfully");
    }

    // for My Tasks page
    public function myTasks()
    {
        $user = auth()->user();
        // dd(auth()->user());
        $query = Task::query()->where('assigned_user_id',$user->id);

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "asc");

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");// like for pattern recog
        }
        if (request("status")) {
            $query->where("status", request("status"));
        }


        $tasks = $query->orderBy($sortField, $sortDirection)
        ->paginate(10)
        ->onEachSide(1);
            
        // When we edit or do smth on my tasks page it would drive us to the Index.jsx of Task
        return inertia("Task/Index" , [
            "tasks" => TaskResource::collection($tasks),
            'queryParams' => request()->query() ? : null,
        ]);
    }
   
}
