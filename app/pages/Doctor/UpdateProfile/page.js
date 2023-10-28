"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DoctorDashboard from '@/Components/DoctorDashboard';

const UpdateProfile = () => {
    const [data, setdata] = useState({
        name: "",
        email: "",
        phoneNo: "",
        address: "",
        city: "",
        modeOfConsultation: "",
    });

    useEffect(() => {
        axios.get("http://localhost:8080/patient/view-profile", {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        })
            .then((response) => setdata(response.data))
            .catch((error) => console.log(error));
    }, []);

    const [input, setInput] = useState({
        name: "",
        email: "",
        phoneNo: "",
        address: "",
        city: "",
        modeOfConsultation: "",
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };
    const handleModeChange = (e) => {
        const selectedMode = e.target.value;
        setInput({ ...input, modeOfConsultation: selectedMode });
    };
    const handleSubmit = async () => {
        axios.put("http://localhost:8080/doctor/update", input, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        })
            .then((response) => alert("Your Profile Updated Successfully"))
            .catch(error => console.log(error));
    };

    return (
        <div className="bg-gray-100 min-h-screen w-screen">
            <DoctorDashboard />
            <center>
                <div className="bg-white h-screen">
                    <div className="flex justify-center">
                        <div className="w-full sm:w-4/5 md:w-3/4 lg:w-3/5 xl:w-2/5 mt-10 p-4 md:p-8 flex flex-wrap">
                            <div className="w-full md:w-1/2 p-2">
                                <div className="flex flex-col gap-4">
                                    <div>
                                        <img
                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQabPnL65PJtnyc3OgCKevPT-1eIOWDjC_f86xZ2x9qB81e9NKK25pkKjg_IKJWeEKt__g&usqp=CAU"
                                            alt="Profile Picture"
                                            className="h-80 w-80 mx-auto"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="modeOfConsultation" className="mt-10 block text-gray-700 text-sm font-bold mb-2">
                                        Mode of Appointment
                                    </label>
                                    <div className="space-x-2">
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                name="modeOfConsultation"
                                                value="ONLINE"
                                                checked={input.modeOfConsultation === "ONLINE"}
                                                onChange={handleModeChange}
                                            />
                                            Online
                                        </label>
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                name="modeOfConsultation"
                                                value="OFFLINE"
                                                checked={input.modeOfConsultation === "OFFLINE"}
                                                onChange={handleModeChange}
                                            />
                                            Offline
                                        </label>
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                name="modeOfConsultation"
                                                value="BOTH"
                                                checked={input.modeOfConsultation === "BOTH"}
                                                onChange={handleModeChange}
                                            />
                                            Both
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 p-2">
                                <div className="flex flex-col gap-4">
                                    <div>
                                        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder={data.name}
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
                                            placeholder={data.phoneNo}
                                            value={input.phoneNo}
                                            onChange={handleInputChange}
                                            className="w-full max-w-md p-2 border rounded-md mx-auto"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
                                            Address
                                        </label>
                                        <input
                                            type="text"
                                            name="address"
                                            placeholder={data.address}
                                            value={input.address}
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
                                            placeholder={data.city}
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
                </div>
            </center>
        </div>
    );
};

export default UpdateProfile;
