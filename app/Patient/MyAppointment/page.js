"use client"
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '@/Components/Navbar';
import { SessionContext } from '@/Components/SessionContextProvider';
import { FaCalendar, FaClock, FaUser, FaStethoscope, FaMapMarkerAlt } from 'react-icons/fa';

const MyAppointment = () => {
    const { authState } = useContext(SessionContext);
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/patient/getappointments", {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        })
            .then((response) => {
                setAppointments(response.data);
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
            <Navbar UserMode={authState.USER_MODE} />
            <div className="pt-20 p-4">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="p-6">
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">My Appointments</h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Doctor
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Specialization
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Date & Time
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Location
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {appointments.map((appointment, index) => (
                                            <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10">
                                                            <img
                                                                className="h-10 w-10 rounded-full border-2 border-blue-200"
                                                                src="/Profile.png"
                                                                alt="Doctor"
                                                            />
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">Dr. {appointment.doctorName}</div>
                                                            <div className="text-sm text-gray-500">{appointment.specialization}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{appointment.specialization}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{appointment.date} {appointment.time}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{appointment.location}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{appointment.status}</div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyAppointment;