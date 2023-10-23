import React from "react";
import PatientDashboard from "@/Components/PatientDashboard";
import DoctorDashboard from "@/Components/DoctorDashboard";
const page = () => {
  return (
    <>
      <PatientDashboard />
      <DoctorDashboard />
    </>
  );
};
export default page;
