"use client";
import React from 'react'
import PatientDashboard from "@/Components/PatientDashboard";
import Footer from '@/Components/Footer';
import Image from 'next/image';
import CardDeck from '@/Components/CardDeck';


const PatientProfile = () => {
  return (
    <>

      <div>
        <PatientDashboard />
        <hr />
        <center className="py-10">
          <Image
            src="/CARD.jpg"
            alt="Logo"
            width={1500}
            height={300}
            className="rounded-xl"
            priority
          />
        </center>
        <hr />
        <CardDeck />
        slidbar doctor specializarion cards with photos
        <Footer />
      </div>
    </>
  );
};

export default PatientProfile;
