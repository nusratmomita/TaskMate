<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Project::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        if (request("status")) {
            $query->where("status", request("status"));
        }


        $projects = $query->orderBy($sortField, $sortDirection)
        ->paginate(10)
        ->onEachSide(1);
            
        // connects ProjectResource.php + Index.jsx
        return inertia("Project/Index" , [
            "projects" => ProjectResource::collection($projects),
            'queryParams' => request()->query() ? : null,
            'success' => session('success')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    // for creating new projects
    public function create()
    {
        return Inertia("Project/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    // for storing the newly created project in the database
    public function store(StoreProjectRequest $request)
    {
        $data = $request->validated();// getting all the date from StoreProjectRequest.php (database connection here)
        //** @var $image \Illuminate\Http\UploadedFile */
        $image = $data['image'] ?? null;
        //dd($data);// used to output the contents of a variable or multiple variables for debugging purposes
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();

        if($image){
            $data['image_path'] = $image->store('project/' . Str::random(), 'public');
        }

        Project::create($data);

        return to_route('project.index')
                       ->with('success',"Project Created Successfully!!");
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        $query = $project->tasks();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "asc");

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        if (request("status")) {
            $query->where("status", request("status"));
        }

        $tasks = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);

        return inertia('Project/Show', [
            'project' => new ProjectResource($project),// showing proejct's things in Task's page 
            "tasks" => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        return inertia('Project/Edit',[
            "project" => new ProjectResource($project)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        $data = $request->validated();// getting all the date from StoreProjectRequest.php
        //** @var $image \Illuminate\Http\UploadedFile */
        $image = $data['image'] ?? null;
        //dd($data);// used to output the contents of a variable or multiple variables for debugging purposes
        $data['updated_by'] = Auth::id();

        if($image){
            if($project->image_path){
                Storage::disk('public')->deleteDirectory(dirname($project->image_path));
            }
            $data['image_path'] = $image->store('project/' . Str::random(), 'public');
        }
        $project->update($data);

        return to_route('project.index')->with('success',"Project \"$project->name\" Updated Successfully");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        $pro_name = $project->name;
        $project->delete();
        if($project->image_path){
            Storage::disk('public')->deleteDirectory(dirname($project->image_path));
        }
        return to_route('project.index')->with('success'
        ,"Project \"$pro_name\" Deleted Successfully");
    }
}
