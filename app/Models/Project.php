<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    // does mass assignment to save the data while creating a new project
    protected $fillable = ['image_path','name','description','status',
                          'status','due_date','created_by','updated_by'];
                          
    /** @use HasFactory<\Database\Factories\ProjectFactory> */
    use HasFactory;

    // relation defining between Project and Task
    public function tasks()
    {
        return $this->hasMany(Task::class);
    }

    // establishing relation between User and Project Table
    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

}
