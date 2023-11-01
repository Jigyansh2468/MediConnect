"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PatientDashboard from '@/Components/PatientDashboard';

const UpdateProfile = () => {
    const [data, setdata] = useState({
        name: '',
        phoneNo: '',
        city: '',
        dob: '',
    })
    const [dob,setDob]=useState('');
   
    const [input, setInput] = useState({
        name: data.name,
        phoneNo: data.phoneNo,
        dob: data.dob,
        city: data.city,
    });
    useEffect(() => {
        axios.get("http://localhost:8080/patient/view-profile", {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        })
        .then((response) =>{
            console.log(response);
            setdata(response.data)
            const formattedDate = new Date(data.dob).toLocaleDateString();
            setDob(formattedDate);
            setInput({
                name: response.data.name,
                phoneNo: response.data.phoneNo,
                dob: formattedDate,
                city: response.data.city,
            });
        })
        .catch((error) => console.log(error))
        console.log(data);
    }, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };

    const handleSubmit = async () => {
        axios.put("http://localhost:8080/patient/update", input, {
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
            <PatientDashboard />
            <center>
                <div className="bg-white">
                    <div className="flex justify-center">
                        <div className="w-full sm:w-4/5 md:w-3/4 lg:w-3/5 xl:w-2/5 p-4 md:p-8">
                            <div className="flex flex-col gap-4">
                                <div>
                                    <img
                                        src="/Profile.png"
                                        alt="Profile Picture"
                                        className="h-80 w-80 mx-auto rounded-full"
                                    />
                                </div>
                                <div>
                                    <p htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                                        Name
                                    </p>
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
                                    <p htmlFor="phoneNo" className="block text-gray-700 text-sm font-bold mb-2">
                                        Phone Number
                                    </p>
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
                                    <p htmlFor="dob" className="block text-gray-700 text-sm font-bold mb-2">
                                        Date of Birth
                                    </p>
                                    <input
                                        type="date"
                                        name="dob"
                                        placeholder={dob}
                                        value={input.dob}
                                        onChange={handleInputChange}
                                        className="w-full max-w-md p-2 border rounded-md mx-auto"
                                    />
                                </div>
                                <div>
                                    <p htmlFor="city" className="block text-gray-700 text-sm font-bold mb-2">
                                        City
                                    </p>
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
            </center>
        </div>
    );
}

export default UpdateProfile;