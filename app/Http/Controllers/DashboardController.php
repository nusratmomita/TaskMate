<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        $totalPendingTasks = Task::query()->where('status','pending')->count(); // total pending tasks
        $myPendingTasks = Task::query()
          ->where('status','pending')
          ->where('assigned_user_id',$user->id)// might not be needed
          ->count(); // total pending tasks

        $totalInProgressTasks = Task::query()->where('status','in_progress')->count(); // total pending tasks
        $myInProgressTasks = Task::query()
        ->where('status','in_progress')
        ->where('assigned_user_id',$user->id)// might not be needed
        ->count(); // total pending tasks

        $totalCompletedTasks = Task::query()->where('status','completed')->count(); // total pending tasks
        $myCompletedTasks = Task::query()
          ->where('status','completed')
          ->where('assigned_user_id',$user->id)
          ->count(); // total pending tasks

        
        $myCurrentTasks = Task::query()
        ->whereIn('status', ['pending', 'in_progress'])
        ->where('assigned_user_id', $user->id)
        ->limit(10)
        ->get();

        $myCurrentTasks = TaskResource::collection($myCurrentTasks);


        return inertia('Dashboard',compact('totalPendingTasks','myPendingTasks',
                                           'totalInProgressTasks', 'myInProgressTasks',
                                           'totalCompletedTasks','myCompletedTasks',
                                            'myCurrentTasks'));
    }
}
