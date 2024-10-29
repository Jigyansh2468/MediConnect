"use client"
import React, { useContext, useEffect, useState } from "react";
import Searchbar from "@/Components/SearchBar";
import Navbar from "@/Components/Navbar";
import BookAppointment from "@/Components/BookAppointment";
import { SessionContext } from "@/Components/SessionContextProvider";
import { useSearchParams } from "next/navigation";
import ListofDoctor from "@/Components/ListOfDoctors";
import VideoBackground from '@/Components/VideoBackground';

const FindDoctor = () => {
  const searchparam = useSearchParams()
  const loadcomp = searchparam.get('data')
  const [doctor, setdoctor] = useState({});
  const [bookapt, setbookapt] = useState(false);
  const { authState } = useContext(SessionContext);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {!bookapt ? (
        <div className="relative">
          <VideoBackground 
            src="/findDoctor.mp4"
            className="fixed top-0 left-0 w-full h-full object-cover z-0 filter blur-sm opacity-60"
          />
          
          <div className="relative z-10">
            <Navbar UserMode={authState.USER_MODE} />
            
            <div className="container mx-auto px-4 pt-20 pb-12">
              <h1 className="text-5xl font-bold text-center mb-4 text-blue-900 drop-shadow-lg">
                Find Your Perfect Doctor
              </h1>
              <p className="text-xl text-center mb-12 text-blue-700">
                Search from our network of qualified healthcare professionals
              </p>

              <div className="max-w-4xl mx-auto backdrop-blur-md bg-white/30 rounded-2xl shadow-xl p-8">
                {loadcomp === 'fromhome' ? (
                  <ListofDoctor setdoctor={setdoctor} setbookapt={setbookapt} />
                ) : (
                  <Searchbar setdoctor={setdoctor} setbookapt={setbookapt} />
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-b from-blue-50 to-white">
          <Navbar UserMode={authState.USER_MODE} />
          <BookAppointment doctor={doctor} UserMode={authState.USER_MODE} />
        </div>
      )}
    </div>
  );
};

export default FindDoctor;
