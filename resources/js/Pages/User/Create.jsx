import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import style from "./CreateUserHeader.module.css";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import TextAreaInput from "@/Components/TextAreaInput";
import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";

export default function Create({auth}){
    const {data,setData,post,errors} = useForm({
       // form object
       name : '',
       email : '',
       password : '',
       password_confirmation: ''
    })

    const onSubmit = (e) =>{
        e.preventDefault();// Clicking on a "Submit" button, prevent it from submitting a form. but use

        post(route("user.store"));// what data needs to pass to the server

    }
    return(       
        <AuthenticatedLayout
            user={auth.user}
            // improve this UI
            header={
                <div className="flex justify-between items-center">
                  <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                      Create New User
                  </h2>

                </div>
            } >

            <Head title="Create User" />

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
                        <form onSubmit={onSubmit} >
                                {/* User Name Input */}
                                <div className="mt-7">
                                    <InputLabel htmlFor="user_name" value="User Name" />

                                    <TextInput
                                        id="user_name"
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
                                    <InputLabel htmlFor="user_email" value="User Email" />
                                    
                                    <TextInput
                                        id="user_email"
                                        type="text"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData("email", e.target.value)}
                                    />

                                    <InputError message={errors.email} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="user_password" value="Password" />

                                    <TextInput
                                        id="user_password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData("password", e.target.value)}
                                    />

                                    <InputError message={errors.password} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="user_password_confirmation" value="Confirm Password" />

                                    <TextInput
                                        id="user_password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData("password_confirmation", e.target.value)}
                                    />

                                    <InputError message={errors.password_confirmation} className="mt-2" />
                                    
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