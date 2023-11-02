"use client"
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '@/Components/Navbar'
import { SessionContext } from '@/Components/SessionContextProvider'
const MyAppointment = () => {
    const [list, setlist] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8080/patient/getappointments", {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        })
            .then((response) => {
                console.log(response);
                if (Array.isArray(response.data)) {
                    setlist(response.data);
                }
            })
            .catch((error) => { console.log(error) })
    }, [])
    const { authState } = useContext(SessionContext)
    return (
        <>
            <Navbar UserMode={authState.USER_MODE} />
            <div className=" p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {list.map((item, i) => (
                        <div
                            key={i}
                            className="bg-gray-100 rounded p-2 shadow-md transition transform hover:scale-105"
                        >
                            <div>Mode: {item.mode}</div>
                            <div>Date: {item.date}</div>
                            <div>Doctor Name: Dr. {item.doctorName}</div>
                            <div>Patient Name: {item.patientName}</div>
                            <div>Specialization: {item.specialization}</div>
                            {/* <div>Prescrioption</div> */}
                            {/* {/Prescrioption DropDown/} */}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default MyAppointment