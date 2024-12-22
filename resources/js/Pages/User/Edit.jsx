import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import style from "./CreateUserHeader.module.css";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import TextAreaInput from "@/Components/TextAreaInput";
import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";

export default function Edit({auth,user,success}){

    const {data,setData,post,errors} = useForm({
        // form object
        name : user.name || "",
        email : user.email || "",
        password : "",
        password_confirmation : "",
        _method: 'PUT'
    })

    const onSubmit = (e) =>{
        e.preventDefault();// Clicking on a "Submit" button, prevent it from submitting a form. but use

        post(route("user.update",user.id));// what data needs to pass to the server/update in Contoller file

    }
    return(       
        <AuthenticatedLayout
            user={auth.user}
            // improve this UI
            header={
                <div className="flex justify-between items-center">
                  <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                      Edit user "{user.name}"
                  </h2>

                </div>
            } >

            <Head title="Edit User" />

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
                    
                                <div className="mt-4">
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
                                            href={route("user.index")}
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