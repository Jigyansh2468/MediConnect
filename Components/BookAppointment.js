"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Image from "next/image"
import './BookAppointment.css'
import { useRouter } from 'next/navigation';
import { FaCalendarAlt, FaClock, FaUserMd, FaMapMarkerAlt, FaStar } from 'react-icons/fa';

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
        console.log(response.data);
        setslotlist(response.data);
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
      alert('Select a Slot First');
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
      return (
        <div className="text-lg text-gray-600 text-center p-8 bg-gray-50 rounded-lg">
          No slots available for today
        </div>
      )
    }
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {slotlist.map((slot, i) => (
          <div
            key={i}
            onClick={() => handleSlotClick(slot)}
            className={`flex items-center justify-center p-4 rounded-lg transition-all duration-300 cursor-pointer
              ${selectedSlot === slot 
                ? 'bg-blue-600 text-white shadow-lg transform scale-105' 
                : 'bg-blue-50 text-blue-900 hover:bg-blue-100'}`}
          >
            <FaClock className="mr-2" />
            <span className="font-semibold">{slot.startTime}-{slot.endTime}</span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="md:flex">
            {/* Doctor Info Section */}
            <div className="md:w-1/3 bg-gradient-to-b from-blue-50 to-white p-8">
              <div className="text-center">
                <Image 
                  src="/Profile.png" 
                  alt="Profile Picture" 
                  width={200} 
                  height={200} 
                  className="rounded-full border-4 border-white shadow-lg mx-auto"
                />
                <h2 className="mt-4 text-2xl font-bold text-gray-900">{doctor.name}</h2>
                <div className="mt-2 flex items-center justify-center text-blue-600">
                  <FaUserMd className="mr-2" />
                  <span className="font-semibold">{doctor.specialization}</span>
                </div>
                <div className="mt-2 flex items-center justify-center text-gray-600">
                  <FaMapMarkerAlt className="mr-2" />
                  <span>{doctor.city}</span>
                </div>
                <div className="mt-4 flex items-center justify-center text-yellow-500">
                  <FaStar className="mr-1" />
                  <FaStar className="mr-1" />
                  <FaStar className="mr-1" />
                  <FaStar className="mr-1" />
                  <FaStar className="opacity-50" />
                </div>
              </div>
            </div>

            {/* Booking Section */}
            <div className="md:w-2/3 p-8">
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                  <FaCalendarAlt className="mr-2 text-blue-600" />
                  Available Time Slots
                </h3>
                <p className="mt-2 text-gray-600">Select your preferred appointment time</p>
              </div>

              <div className="mb-8">
                {showslot()}
              </div>

              <div className="flex justify-center">
                {btn === 1 ? (
                  <button
                    onClick={confirmapt}
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md"
                  >
                    Confirm Appointment
                  </button>
                ) : btn === 2 ? (
                  <button className="bg-blue-100 px-8 py-3 rounded-lg font-semibold relative min-w-[200px] flex items-center justify-center">
                    <div className="dot-flashing" />
                  </button>
                ) : (
                  <button
                    onClick={() => Route.push('/')}
                    className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-all"
                  >
                    Appointment Confirmed ✓
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookAppointment