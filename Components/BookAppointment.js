"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
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
        className={`border-2 w-40 py-3 px-4 text-center rounded-lg border-black hover:text-white hover:bg-black font-bold hover:cursor-pointer m-5 ${selectedSlot === slot ? 'bg-black text-white cursor-pointer' : ''
          }`}>
        {slot.startTime}-{slot.endTime}
      </div>
    )
  }
  return (
    <>
      <div className="bg-gray-100 h-screen w-screen flex">
        <div className="ml-16 mr-16 mt-10 flex">
          <div className="flex gap-2 border-b-red-200 flex-col ">
            <div>
              <img
                // src={input.photo} if photo is there in the database
                alt="Profile Picture"
                className="h-80 w-80 border-2 border-black"
              />
            </div>
            <div className="mx-20 font-bold text-2xl">{doctor.name}</div>
            <div className="mx-20 font-bold text-xl">{doctor.specialization}</div>
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
    </>
  )
}

export default BookAppointment
