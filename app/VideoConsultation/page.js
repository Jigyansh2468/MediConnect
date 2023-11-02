'use client'
import React from "react";
import Navbar from "@/Components/Navbar";
import { SessionContext } from "@/Components/SessionContextProvider";
import { useContext } from "react";
const VideoConsultation = () => {
  const { authState } = useContext(SessionContext);

  return (
    <>
      <Navbar UserMode={authState.USER_MODE} />
      <h1>Video Consultation</h1>
    </>
  );
};

export default VideoConsultation;
