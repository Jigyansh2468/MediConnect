"use client"
import React, { useContext, useState } from "react";
import Navbar from "@/Components/Navbar";
import { SessionContext } from "@/Components/SessionContextProvider";
import SearchbarOnlineConsultation from "@/Components/SearchbarOnlineConsultation";

const VideoConsultation = () => {
  const { authState } = useContext(SessionContext);

  return (
    <>
      <div>
        <div>
          <div className="min-h-screen flex items-center justify-center">
            <video
              autoPlay
              muted
              loop
              className="fixed object-cover object-center w-full h-full z-0 filter blur-md m-20"
            >
              <source src='/VideoConsultation.mp4' type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute w-full h-full z-10">
              <Navbar UserMode={authState.USER_MODE} />
              <SearchbarOnlineConsultation />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoConsultation;