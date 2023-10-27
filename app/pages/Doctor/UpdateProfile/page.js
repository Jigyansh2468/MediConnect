"use client"
import React, { useState } from 'react';
import axios from 'axios';
import DoctorDashboard from '@/Components/DoctorDashboard';

const UpdateProfile = () => {
    const [input, setInput] = useState({
        name: "",
        phoneNo: "",
        address: "",
        city: "",
        specialization: "",
        certificateNo: "",
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
        axios
            .put("your_api_endpoint", input)
            .then((response) => alert("Your Profile Updated Successfully"))
            .catch((error) => console.log(error));
    };

    return (
        <div className="bg-gray-100 min-h-screen w-screen">
            <DoctorDashboard />
            <center>
                <div className="bg-white">
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
                                    {/* Content for the left column */}
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
                                        <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
                                            Address
                                        </label>
                                        <input
                                            type="text"
                                            name="address"
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
                                            value={input.city}
                                            onChange={handleInputChange}
                                            className="w-full max-w-md p-2 border rounded-md mx-auto"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="specialization" className="block text-gray-700 text-sm font-bold mb-2">
                                            Specialization
                                        </label>
                                        <select
                                            name="specialization"
                                            value={input.specialization}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 rounded-lg py-2 px-3  block text-gray-700 text-sm font-bold mb-2 xl:w-80 text-center"
                                            required
                                        >
                                            <option value="">Select Specialization</option>
                                            <option value="Internal medicine">Internal medicine</option>
                                            <option value="General surgery">General surgery</option>
                                            <option value="Family medicine">Family medicine</option>
                                            <option value="Otorhinolaryngology">Otorhinolaryngology</option>
                                            <option value="Pediatrics">Pediatrics</option>
                                            <option value="Dermatology">Dermatology</option>
                                            <option value="Surgeon">Surgeon</option>
                                            <option value="Emergency medicine">Emergency medicine</option>
                                            <option value="Ophthalmology">Ophthalmology</option>
                                            <option value="Radiology">Radiology</option>
                                            <option value="Psychiatrist">Psychiatrist</option>
                                            <option value="Neurologist">Neurologist</option>
                                            <option value="Pediatrician">Pediatrician</option>
                                            <option value="Geriatrics">Geriatrics</option>
                                            <option value="Radiologist">Radiologist</option>
                                            <option value="Dermatologist">Dermatologist</option>
                                            <option value="Cardiologist">Cardiologist</option>
                                            <option value="Oncologist">Oncologist</option>
                                            <option value="Ophthalmologist">Ophthalmologist</option>
                                            <option value="Gastroenterologist">Gastroenterologist</option>
                                            <option value="Pulmonologist">Pulmonologist</option>
                                            <option value="Dentist">Dentist</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="certificateNo" className="block text-gray-700 text-sm font-bold mb-2">
                                            Certificate Number
                                        </label>
                                        <input
                                            type="text"
                                            name="certificateNo"
                                            value={input.certificateNo}
                                            onChange={handleInputChange}
                                            className="w-full max-w-md p-2 border rounded-md mx-auto"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="modeOfConsultation" className="block text-gray-700 text-sm font-bold mb-2">
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
