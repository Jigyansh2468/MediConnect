"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import PatientDashboard from '@/Components/PatientDashboard'
const MyAppointment = () => {
    const [list, setlist] = useState([])
    useEffect(() => {
        axios.get("", input, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        })
            .then((response) => { setlist(response.data) })
            .catch((error) => { console.log(error) })
    }, [])
    return (
        <>
            <PatientDashboard />
            <div className="bg-blue-100 p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {list.map((item, i) => (
                        <div
                            key={i}
                            className="bg-white rounded p-4 shadow-md transition transform hover:scale-105"
                        >
                            <div>Mode</div>
                            <div>Specialization</div>
                            <div>Doctor Name</div>
                            <div>Patient Name</div>
                            <div>Date</div>
                            <div>Prescrioption</div>
                            {/*Prescrioption DropDown*/}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default MyAppointment