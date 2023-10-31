"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Image from "next/image"

const BookAppointment = ({ doctor }) => {
  const [slotlist, setslotlist] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState({});
  useEffect(() => {
    axios.get("http://localhost:8080/doctor/getavailableslots",
      {
        params: { doctorId: doctor.id },
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
    setSelectedSlot(slotId);
  }
  function showslot() {
    if (slotlist.length === 0) {
      return (<div>No slot Available for Today</div>)
    }
    return slotlist.map((slot, i) =>
      <div
        key={i}
        onClick={() => handleSlotClick(slot)}
        className={` w-40 py-3 px-4 text-center rounded-lg bg-purple-200 hover:text-white hover:bg-purple-600 font-bold hover:cursor-pointer m-5 ${selectedSlot === slot ? 'bg-purple-900 text-white cursor-pointer' : ''
          }`}>
        {slot.startTime}-{slot.endTime}
      </div>
    )
  }
  return (
    <>
      <div className=" h-screen w-screen flex">
        <div className="ml-16 mr-16 mt-10 flex">
          <div className="flex gap-2 border-b-red-200 flex-col ">
            <div>
              <Image src="/Profile.png" alt="Profile Picture" width={300} height={30} className='rounded-full border-4 border-black' />
            </div>
            <center>
              <div className="mx-20 font-bold text-2xl">{doctor.name}</div>
              <div className="mx-20 font-bold text-xl">{doctor.specialization}</div>
              <div className="mx-20 font-semibold text-xl">Rating</div>
            </center>
          </div>
        </div >
        <div className="ml-16 mr-16 mt-10 flex-1">
          <div className="bg-white p-10">
            <h2 className="text-xl font-bold mb-4 text-center ">Available Time Slots</h2>
            <div className='flex flex-wrap flex-row'>
              {showslot()}
            </div>
          </div>
          <div className='flex items-center justify-center'>
            <button
              className='bg-green-300 text-xl px-4 py-6 rounded-lg font-bold float-right mt-10 hover:bg-green-500'
              onClick={() => {
                axios.put("http://localhost:8080/doctor/bookslot", null, {
                  params: {
                    doctorId: doctor.id,
                    slotId: selectedSlot.id
                  },
                  withCredentials: true,
                }).then((response) => {
                  alert("Slot booked. You will get further details on mail");
                })
              }}>
              Confirm Appointment
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default BookAppointment
