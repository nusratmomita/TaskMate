import { Head, Link } from '@inertiajs/react';
import '../../styles/card.css';

export default function Welcome() {
    return (
        <>
            <Head title="Welcome" />

            <div
                className="bg-gradient-to-r from-purple-900 to-indigo-600 text-white min-h-screen flex flex-col items-center justify-center"
                id="background">
                
                <header className="text-center animate-fade">
                    <div className="mt-4 flex items-center justify-center gap-4">
                        {/* Left Section: Image */}
                        <div className="left_pic">
                            <img src="TM1.jpeg" width="120px" alt="TaskMate Logo" />
                        </div>

                        {/* Right Section: Text */}
                        <div className="right_text">
                            <h1 className="text-5xl font-bold text-fuchsia-50">Welcome to <span className="text-blue-700">TaskMate</span></h1>
                        </div>
                    </div>
                        {/* <h1 className="text-5xl font-bold mb-4">Welcome to TaskMate</h1> */}
                        <p className="text-xl ml-12 mt-2 mb-4 text-indigo-50">Stay organized and boost your productivity</p>
                </header>

                
                <div className="flex items-center justify-center gap-8 min-h-screen bg-gradient-to-r from-purple-500 to-pink-500">
                    <div className="card-container flex justify-center items-center gap-8">
                        <div className="card">
                            <div className="icon">
                                <img src="taskdone.jpeg" alt="icon" />
                            </div>
                            <div className="title">
                                <span>Project Management</span>
                            </div>
                            <div className="paragraph">
                                <p>Manage projects easily by sorting them with priority-setting features.</p>
                            </div>
                            <button className="learn-more-btn">Learn More</button>
                        </div>

                        <div className="card">
                            <div className="icon">
                                <img src="taskdone.jpeg" alt="icon" />
                            </div>
                            <div className="title">
                                <span>Task Management</span>
                            </div>
                            <div className="paragraph">
                                <p>Manage tasks easily by sorting them with priority-setting features.</p>
                            </div>
                            <button className="learn-more-btn">Learn More</button>
                        </div>

                        <div className="card">
                            <div className="icon">
                                <img src="taskdone.jpeg" alt="icon" />
                            </div>
                            <div className="title">
                                <span>User List</span>
                            </div>
                            <div className="paragraph">
                                <p>Assign users according to tasks and projects.Also view all users with just one click.</p>
                            </div>
                            <button className="learn-more-btn">Learn More</button>
                        </div>
                    </div>
                </div>



                <div className="flex flex-col items-center justify-center mt-10 gap-6 animate-slide">
                    <div className="text-center" id="docs-card">
                        {/* Text Content */}
                        <p className="text-xl mb-4" id="docs-card-content">
                            Join our platform to manage your tasks efficiently and effectively.
                        </p>

                        {/* Buttons */}
                        <div className="flex justify-center gap-4 mb-4">
                            <Link
                                href="/login"
                                className="bg-white text-indigo-600 px-6 py-3 rounded-full shadow-lg hover:bg-indigo-50 transition"
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="bg-indigo-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-indigo-500 transition"
                            >
                                Register
                            </Link>
                        </div>
                    </div>
            </div>
            </div>
        </>
    );
}
