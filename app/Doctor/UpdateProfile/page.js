"use client"
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '@/Components/Navbar';
import { SessionContext } from '@/Components/SessionContextProvider';

const UpdateProfile = () => {
    const [input, setInput] = useState({
        name: '',
        phoneNo: '',
        address: '',
        city: '',
        specialization: '',
        certificateNo: '',
        modeOfConsultation: '',
        experience: '',
        consultationFee: ''
    });

    useEffect(() => {
        axios.get("http://localhost:8080/doctor/view-profile", {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        })
            .then((response) => {
                setInput({
                    name: response.data.name,
                    phoneNo: response.data.phoneNo,
                    address: response.data.address,
                    city: response.data.city,
                    specialization: response.data.specialization,
                    certificateNo: response.data.certificateNo,
                    modeOfConsultation: response.data.modeOfConsultation,
                    experience: response.data.experience,
                    consultationFee: response.data.consultationFee
                });
            })
            .catch((error) => console.log(error));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
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

    const { authState } = useContext(SessionContext);

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar UserMode={authState.USER_MODE} />
            <div className="container mx-auto py-8 px-4">
                <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto mt-20">
                    <div className="flex flex-col items-center mb-8">
                        <img
                            src="/Profile.png"
                            alt="Profile"
                            className="w-32 h-32 rounded-full border-4 border-purple-300 mb-4"
                        />
                        <h2 className="text-2xl font-bold text-purple-800">Update Profile</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={input.name}
                                onChange={handleInputChange}
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Phone Number</label>
                            <input
                                type="text"
                                name="phoneNo"
                                value={input.phoneNo}
                                onChange={handleInputChange}
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-bold mb-2">City</label>
                            <input
                                type="text"
                                name="city"
                                value={input.city}
                                onChange={handleInputChange}
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Address</label>
                            <input
                                type="text"
                                name="address"
                                value={input.address}
                                onChange={handleInputChange}
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Specialization</label>
                            <select
                                name="specialization"
                                value={input.specialization}
                                onChange={handleInputChange}
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                            >
                                <option value="">Select Specialization</option>
                                <option value="Cardiologist">Cardiologist</option>
                                <option value="Dermatologist">Dermatologist</option>
                                <option value="Neurologist">Neurologist</option>
                                <option value="Pediatrician">Pediatrician</option>
                                <option value="Psychiatrist">Psychiatrist</option>
                                <option value="Orthopedic">Orthopedic</option>
                                <option value="Gynecologist">Gynecologist</option>
                                <option value="Dentist">Dentist</option>
                                <option value="ENT Specialist">ENT Specialist</option>
                                <option value="Ophthalmologist">Ophthalmologist</option>
                                <option value="General Physician">General Physician</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Certificate Number</label>
                            <input
                                type="text"
                                name="certificateNo"
                                value={input.certificateNo}
                                onChange={handleInputChange}
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Mode of Consultation</label>
                            <select
                                name="modeOfConsultation"
                                value={input.modeOfConsultation}
                                onChange={handleInputChange}
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                            >
                                <option value="">Select Mode</option>
                                <option value="Online">Online</option>
                                <option value="Offline">Offline</option>
                                <option value="Both">Both</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-center mt-8">
                        <button
                            onClick={handleSubmit}
                            className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors duration-200 font-semibold"
                        >
                            Update Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;