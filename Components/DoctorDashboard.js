"use client"
import React, { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SessionContext } from './SessionContextProvider';

const DoctorDashboard = () => {
  const { authState } = useContext(SessionContext);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* View Profile Card */}
        <Link href="/Doctor/ViewProfile" className="transform hover:scale-105 transition-all">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <Image 
                  src="/Profile.png" 
                  alt="View Profile" 
                  width={40} 
                  height={40}
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">View Profile</h3>
                <p className="text-gray-600">Check your profile information</p>
              </div>
            </div>
          </div>
        </Link>

        {/* Update Profile Card */}
        <Link href="/Doctor/UpdateProfile" className="transform hover:scale-105 transition-all">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-full">
                <Image 
                  src="/Profile.png" 
                  alt="Update Profile" 
                  width={40} 
                  height={40}
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Update Profile</h3>
                <p className="text-gray-600">Modify your profile details</p>
              </div>
            </div>
          </div>
        </Link>

        {/* Update Slots Card */}
        <Link href="/Doctor/UpdateSlot" className="transform hover:scale-105 transition-all">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-100 rounded-full">
                <Image 
                  src="/Profile.png" 
                  alt="UpdateSlot" 
                  width={40} 
                  height={40}
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Update Slots</h3>
                <p className="text-gray-600">Manage your appointment slots</p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default DoctorDashboard;
