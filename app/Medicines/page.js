'use client'
import React from "react";
import Navbar from "@/Components/Navbar";
import { SessionContext } from "@/Components/SessionContextProvider";
import { useContext } from "react";
const Medicines = () => {
  const { authState } = useContext(SessionContext);

  return (
    <>
      <Navbar UserMode={authState.USER_MODE} />
      <h1>Medicines</h1>

    </>
  );
};

export default Medicines;
