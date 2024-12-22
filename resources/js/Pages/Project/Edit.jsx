import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import TextAreaInput from "@/Components/TextAreaInput";
import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";

export default function Edit({auth,project,success}){

    const {data,setData,post,errors} = useForm({
        // form object
        image :  "",
        name : project.name || "",
        status : project.status || "",
        description : project.description ||  "",
        due_date : project.due_date ||  "",
        _method: 'PUT'
    })

    const onSubmit = (e) =>{
        e.preventDefault();// Clicking on a "Submit" button, prevent it from submitting a form. but use

        post(route("project.update",project.id));// what data needs to pass to the server

    }
    return(       
        <AuthenticatedLayout
            user={auth.user}
            // improve this UI
            header={
                <div className="flex justify-between items-center">
                  <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                      Edit project "{project.name}"
                  </h2>

                </div>
            } >

            <Head title="Edit Project" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                {success && (
                    <div className="bg-emerald-500 py-3 px-6 text-white rounded-lg text-lg shadow-md max-w-xs mx-auto text-center mb-4">
                        {success}
                    </div>
                )}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">                        
                            <form onSubmit={onSubmit} >
                                {/* <div className="signup-container">
                                    <div className="left-container">
                                        <div className={style.container}>
                                            {/* make this to be on the center of the image */}
                                          {/* <h1>Let's Organize Things Real Quick!</h1>
                                        </div>
                                        <div className="max-w-full h-auto mt-40">
                                          <img src="/left_side_pic.jpeg" alt="pic" style={{ maxWidth: "100%", height: "auto",marginTop:"50px" }} />
                                        </div>
                                    </div> */}
                                {/* </div> */} 
                    
                                {project.image_path &&
                                (<div className="mb-4">
                                    <img src={project.image_path} className="w-64"/>
                                </div>
                                )}
                                {/* Project Image Input */}
                                    <div>
                                        <InputLabel htmlFor="project_image_path" value="Project Image" />
                                        <TextInput
                                            id="project_image_path"
                                            type="file"
                                            
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData("image", e.target.files[0])}
                                        />
                                        <InputError message={errors.image} className="mt-2" />
                                    </div>
                                    <br/>
                                    {/* Project Name Input */}
                                    <div className="mt-4">
                                        <InputLabel htmlFor="project_name" value="Project Name" />
                                        <TextInput
                                            id="project_name"
                                            type="text"
                                            name="name"
                                            value={data.name}
                                            className="mt-1 block w-full"
                                            isFocused={true}
                                            onChange={(e) => setData("name", e.target.value)}
                                        />
                                        <InputError message={errors.name} className="mt-2" />
                                    </div>

                                    {/* Project Description Input */}
                                    <div className="mt-4">
                                        <InputLabel htmlFor="project_description" value="Project Description" />
                                        <TextAreaInput
                                        id="project_description"
                                        name="description"
                                        value={data.description}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData("description", e.target.value)}
                                        />
                                        <InputError message={errors.description} className="mt-2" />
                                    </div>

                                    {/* Project Deadline Input */}
                                    <div className="mt-4">
                                        <InputLabel htmlFor="project_due_date" value="Project Deadline" />
                                        <TextInput
                                        id="project_due_date"
                                        type="date"
                                        name="due_date"
                                        value={data.due_date}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData("due_date", e.target.value)}
                                        />
                                        <InputError message={errors.due_date} className="mt-2" />
                                    </div>

                                    {/* Project Status Input */}
                                    <div className="mt-4">
                                        <InputLabel htmlFor="project_status" value="Project Status" />
                                        <SelectInput
                                        name="status"
                                        id="project_status"
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData("status", e.target.value)}
                                        >
                                        <option value="">Select Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="in_progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                        </SelectInput>
                                        <InputError message={errors.project_status} className="mt-2" />
                                    </div>
                                    <div className="mt-4 text-right">
                                        <Link
                                            href={route("project.index")}
                                            className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
                                            >
                                            Cancel
                                        </Link>
                                        <button className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
                                            Save
                                        </button>
                                    </div>                         
                            </form>                            
                        </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}