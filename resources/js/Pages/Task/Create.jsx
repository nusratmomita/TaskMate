import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import style from "./CreateTaskHeader.module.css";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import TextAreaInput from "@/Components/TextAreaInput";
import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";

export default function Create({auth,projects,users}){
    const {data,setData,post,errors} = useForm({
        // form object
        image : '',
        name : '',
        status : '',
        description : '',
        due_date : ''
    })

    const onSubmit = (e) =>{
        e.preventDefault();// Clicking on a "Submit" button, prevent it from submitting a form. but use

        post(route("task.store"));// what data needs to pass to the server

    }
    return(       
        <AuthenticatedLayout
            user={auth.user}
            // improve this UI
            header={
                <div className="flex justify-between items-center">
                  <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                      Create New Task
                  </h2>

                </div>
            } >

            <Head title="Create Task" />

            <div className="gap-8 text-align:center">
            <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-8">
                    <div className="flex flex-wrap md:flex-nowrap">
                        {/* Left Container - Image */}
                        <div className="w-full md:w-1/2 flex items-center justify-center">
                            <div className="text-center">
                                <h1 className="container">Let's Organize Things Real Quick</h1>
                                <img
                                    src="/left_side_pic.jpeg"
                                    alt="pic"
                                    style={{
                                        maxWidth: "100%",
                                        height: "auto",
                                    }}
                                    className="rounded"
                                />
                            </div>
                        </div>
                        
                        {/* Right Container - Form */}
                        <div className="w-full md:w-1/2 mt-14">
                            <form onSubmit={onSubmit}>
                                {/* Project Image Input */}
                                <div>
                                    <InputLabel htmlFor="task_project_id" value="Project" />

                                    <SelectInput
                                        name="project_id"
                                        id="task_project_id"
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData("project_id", e.target.value)}
                                    >
                                        <option value="">Select Project</option>
                                        {/* to choose a project */}
                                        {projects.data.map(project => (
                                            <option value={project.id} key={project.id}>{project.name}</option>
                                        ))}
                                    </SelectInput>

                                    <InputError message={errors.project_id} className="mt-2" />
                                </div>
        
                                {/* Task Name Input */}
                                <div className="mt-4">
                                    <InputLabel htmlFor="task_image_path" value="Task Image" />
                                    <TextInput
                                        id="task_image_path"
                                        type="file"
                                        name="image"
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData("image", e.target.files[0])}
                                    />
                                    <InputError message={errors.image} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="task_name" value="Task Name" />

                                    <TextInput
                                        id="task_name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={(e) => setData("name", e.target.value)}
                                    />

                                    <InputError message={errors.name} className="mt-2" />
                                </div>
                                
                                <div className="mt-4">
                                    <InputLabel
                                    htmlFor="task_description"
                                    value="Task Description"
                                    />

                                    <TextAreaInput
                                        id="task_description"
                                        name="description"
                                        value={data.description}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData("description", e.target.value)}
                                    />

                                    <InputError message={errors.description} className="mt-2" />
                                </div>

                                {/* Project Deadline Input */}
                                <div className="mt-4">
                                    <InputLabel htmlFor="task_due_date" value="Task Deadline" />
                                        <div className="relative">
                                            <TextInput
                                                id="taskdue_date"
                                                type="date"
                                                name="due_date"
                                                value={data.due_date}
                                                className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 text-gray-700 appearance-none"
                                                onChange={(e) => setData("due_date", e.target.value)}
                                            />
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-100 pointer-events-none"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M8 7V3m8 4V3m-9 4h10M5 11h14m-1 9H6a2 2 0 01-2-2V7a2 2 0 012-2h12a2 2 0 012 2v11a2 2 0 01-2 2z"
                                                />
                                            </svg>
                                        </div>
                                    <InputError message={errors.due_date} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="task_status" value="Task Status" />

                                    <SelectInput
                                        name="status"
                                        id="task_status"
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData("status", e.target.value)}
                                        >
                                        <option value="">Select Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="in_progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                    </SelectInput>

                                    <InputError message={errors.task_status} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="task_priority" value="Task Priority" />

                                    <SelectInput
                                    name="priority"
                                    id="task_priority"
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData("priority", e.target.value)}
                                    >
                                    <option value="">Select Priority</option>
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                    </SelectInput>

                                    <InputError message={errors.priority} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel
                                    htmlFor="task_assigned_user"
                                    value="Assigned User"
                                    />

                                    <SelectInput
                                        name="assigned_user_id"
                                        id="task_assigned_user"
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData("assigned_user_id", e.target.value)}
                                        >
                                        <option value="">Select User</option>
                                         {/* to choose a user */}
                                         {users.data.map(user => (
                                            <option value={user.id} key={user.id}>{user.name}</option>
                                        ))}
                                    </SelectInput>

                                    <InputError
                                    message={errors.assigned_user_id}
                                    className="mt-2"
                                    />
                                </div>

                                <div className="mt-4 text-right">
                                    <Link
                                        href={route("project.index")}
                                        className="bg-gray-100 py-1 px-3 text-xl font-bold text-red-500 rounded shadow transition-all hover:bg-gray-200 mr-2"
                                    >
                                        Cancel
                                    </Link>
                                    <button className="bg-indigo-600 py-1 px-3 text-xl font-bold text-white rounded shadow transition-all hover:bg-indigo-800">
                                        Submit
                                    </button>
                                </div> 
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            </div>

        </AuthenticatedLayout>
    );
}