"use client"
import React, { useState } from 'react';
import axios from 'axios';
import PatientDashboard from '@/Components/PatientDashboard';

const UpdateProfile = () => {
    const [input, setInput] = useState({
        name: '',
        phoneNo: '',
        dob: '',
        city: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };

    const handleSubmit = async () => {
        axios.put("your_api_endpoint", input)
            .then((response) => alert("Your Profile Updated Successfully"))
            .catch(error => console.log(error));
    };

    return (
        <div className="bg-gray-100 min-h-screen w-screen">
            <PatientDashboard />
            <center>
                <div className="bg-white">
                    <div className="flex justify-center">
                        <div className="w-full sm:w-4/5 md:w-3/4 lg:w-3/5 xl:w-2/5 mt-10 p-4 md:p-8">
                            <div className="flex flex-col gap-4">
                                <div>
                                    <img
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQabPnL65PJtnyc3OgCKevPT-1eIOWDjC_f86xZ2x9qB81e9NKK25pkKjg_IKJWeEKt__g&usqp=CAU"
                                        alt="Profile Picture"
                                        className="h-80 w-80 mx-auto"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={input.name}
                                        onChange={handleInputChange}
                                        className="w-full max-w-md p-2 border rounded-md mx-auto"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phoneNo" className="block text-gray-700 text-sm font-bold mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="text"
                                        name="phoneNo"
                                        value={input.phoneNo}
                                        onChange={handleInputChange}
                                        className="w-full max-w-md p-2 border rounded-md mx-auto"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="dob" className="block text-gray-700 text-sm font-bold mb-2">
                                        Date of Birth
                                    </label>
                                    <input
                                        type="text"
                                        name="dob"
                                        value={input.dob}
                                        onChange={handleInputChange}
                                        className="w-full max-w-md p-2 border rounded-md mx-auto"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="city" className="block text-gray-700 text-sm font-bold mb-2">
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={input.city}
                                        onChange={handleInputChange}
                                        className="w-full max-w-md p-2 border rounded-md mx-auto"
                                    />
                                </div>
                                <div className="mt-6 flex justify-center">
                                    <button
                                        type="button"
                                        onClick={handleSubmit}
                                        className="bg-blue-500 text-white p-2 rounded-md w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 hover:bg-blue-600"
                                    >
                                        Update
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </center>
        </div>
    );
}

export default UpdateProfile;
