"use client";
import React, { useContext } from 'react'
import Footer from '@/Components/Footer';
import Image from 'next/image';
import CardDeck from '@/Components/CardDeck';
import { SessionContext } from '@/Components/SessionContextProvider';


const PatientProfile = () => {
  const { authState } = useContext(SessionContext)
  return (
    <>
      <div>
        <Navbar UserMode={authState.USER_MODE} />
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
