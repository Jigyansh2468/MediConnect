"use client"
import React, { useEffect, useState } from 'react'
import PatientDashboard from '@/Components/PatientDashboard'
import axios from 'axios';
import { useRouter } from 'next/router';
function BookAppointment() {
  const [slotlist, setslotlist] = useState([]);
  const [selectedSlotId, setSelectedSlotId] = useState(null);

  const route = useRouter();
  const id = route.query.doctorId;
  useEffect(() => {
    axios.get("http://localhost:8080/doctor/getavailableslots",
      {
        params: { doctorId: id },
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        setslotlist(response.data);
        console.log(response.data);
      })
      .catch(error => console.log(error))
  }, [])
  function handleSlotClick(slotId) {
    setSelectedSlotId(slotId);
  }
  function showslot() {
    if (slotlist.length === 0) {
      return (<div>No slot Available for Today</div>)
    }
    return slotlist.map((slot, i) =>
      <div
        key={i}
        onClick={() => handleSlotClick(slot.id)}
        className={`border-2 w-40 py-3 px-4 text-center rounded-lg border-black hover:text-white hover:bg-black font-bold hover:cursor-pointer m-5 ${selectedSlotId === slot.id ? 'bg-black text-white cursor-pointer' : ''
          }`}>
        {slot.startTime}-{slot.endTime}
      </div>
    )
  }
  return (
    <>
      <PatientDashboard user={"jigs"} />
      <div className="bg-gray-100 h-screen w-screen flex">
        <div className="ml-16 mr-16 mt-10 flex">
          <div className="flex gap-2 border-b-red-200 flex-col">
            <div>
              <img
                // src={input.photo} if photo is there in the database
                alt="Profile Picture"
                className="h-80 w-80 border-2 border-black"
              />
            </div>
            <div className="mx-20">Name</div>
            <div className="mx-20">Specialization</div>
            <div className="mx-20">Rating</div>
          </div>
        </div >
        <div className="ml-16 mr-16 mt-10 flex-1">
          <div className="bg-white p-10">
            <h2 className="text-xl font-bold mb-4 text-center ">Available Time Slots</h2>
            <div className='flex flex-wrap flex-row'>
              {showslot()}
            </div>
          </div>
          <button
            className='border-2 border-black px-2 py-3 rounded-lg font-bold float-right mt-10 hover:text-white hover:bg-green-300 hover:border-green-300'
            onClick={() => { axios.get("", { selectedSlotId, id }) }}>
            Confirm Appointment
          </button>
        </div>
      </div >
    </>
  )
}

export default BookAppointment
