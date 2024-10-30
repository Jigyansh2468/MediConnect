"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DoctorDashboard from '@/Components/DoctorDashboard';
import { FaPlus, FaTrash, FaClock } from 'react-icons/fa';

const UpdateSlot = () => {
  const [slots, setSlots] = useState([]);
  const [newSlot, setNewSlot] = useState({
    startTime: '',
    endTime: '',
    date: new Date().toISOString().split('T')[0]
  });

  // Fetch existing slots
  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    try {
      const response = await axios.get("http://localhost:8080/doctor/getavailableslots", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      setSlots(response.data);
    } catch (error) {
      console.error("Error fetching slots:", error);
    }
  };

  const handleAddSlot = async () => {
    try {
      await axios.post("http://localhost:8080/doctor/addslot", newSlot, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      fetchSlots();
      setNewSlot({
        startTime: '',
        endTime: '',
        date: new Date().toISOString().split('T')[0]
      });
    } catch (error) {
      console.error("Error adding slot:", error);
    }
  };

  const handleDeleteSlot = async (slotId) => {
    try {
      await axios.delete("http://localhost:8080/doctor/deleteslot", {
        params: { slotId },
        withCredentials: true,
      });
      fetchSlots();
    } catch (error) {
      console.error("Error deleting slot:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DoctorDashboard />
      
      <div className="max-w-6xl mx-auto px-4 py-8 mt-16">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Appointment Slots</h1>
          
          {/* Add New Slot Section */}
          <div className="bg-blue-50 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">Add New Slot</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <FaClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="time"
                  value={newSlot.startTime}
                  onChange={(e) => setNewSlot({...newSlot, startTime: e.target.value})}
                  className="w-full pl-10 pr-4 py-2 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>
              <div className="relative">
                <FaClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="time"
                  value={newSlot.endTime}
                  onChange={(e) => setNewSlot({...newSlot, endTime: e.target.value})}
                  className="w-full pl-10 pr-4 py-2 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>
              <div className="relative">
                <input
                  type="date"
                  value={newSlot.date}
                  onChange={(e) => setNewSlot({...newSlot, date: e.target.value})}
                  className="w-full pl-4 pr-4 py-2 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>
            </div>
            <button
              onClick={handleAddSlot}
              className="mt-4 flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FaPlus /> Add Slot
            </button>
          </div>

          {/* Existing Slots Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Available Slots</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {slots.map((slot) => (
                <div
                  key={slot.id}
                  className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-lg font-medium text-gray-800">
                        {slot.startTime} - {slot.endTime}
                      </p>
                      <p className="text-sm text-gray-600">{new Date(slot.date).toLocaleDateString()}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteSlot(slot.id)}
                      className="text-red-500 hover:text-red-600 transition-colors"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {slots.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                No slots available. Add some slots above.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateSlot;
