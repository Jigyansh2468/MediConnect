"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Image from "next/image"
import './BookAppointment.css'
import { useRouter } from 'next/navigation';

const BookAppointment = ({ doctor, UserMode }) => {
  const [slotlist, setslotlist] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState({});
  const Route = useRouter();
  const [btn, setbtn] = useState(1);
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
  const confirmapt = () => {
    setTimeout(() => {
      setbtn(2);
    }, 10);
    if (UserMode === "") {
      alert('Login First')
      Route.push("/Login");
    }
    if (selectedSlot.id === null) {
      alert('Select a SLot First');
    }
    axios.put("http://localhost:8080/doctor/bookslot", null, {
      params: {
        doctorId: doctor.id,
        slotId: selectedSlot.id
      },
      withCredentials: true,
    })
      .then((response) => {
        setTimeout(() => {
          setbtn(3);
        }, 3000);
        alert("Slot booked. You will get further details on mail");
      })
      .catch(error => console.log(error))

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
      <div className=" h-screen w-screen flex ">
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
          <div className="bg-transparent p-10  ">
            <h2 className="text-xl font-bold mb-4 text-center underline
            ">Available Time Slots</h2>
            <div className='flex flex-wrap flex-row'>
              {showslot()}
            </div>
            <div className='flex items-center justify-center'>
              {
                btn === 1 ? (
                  <button
                    className='bg-green-300 text-xl px-4 py-6 rounded-lg font-bold float-right mt-10 hover:bg-green-500'
                    onClick={confirmapt} >
                    Confirm Appointment
                  </button>
                ) : btn === 2 ? (
                  <button className='bg-green-300 text-xl w-32  flex items-center justify-center px-4 py-6 rounded-lg font-bold float-right mt-10 relative'>
                    <div className='dot-flashing absolute '></div>
                  </button>
                ) : btn === 3 ? (
                  <button
                    className='bg-green-300 text-xl px-4 py-6 rounded-lg font-bold float-right mt-10 hover:bg-green-500' onClick={Route.push('/')}>
                    Appointment Confirmed
                  </button>
                ) : null
              }
            </div>
          </div>
        </div>
      </div >
    </>
  )
}
export default BookAppointment