"use client";
import React, { useContext } from 'react'
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import Image from 'next/image';
import CardDeck from '@/Components/CardDeck';
import { SessionContext } from '@/Components/SessionContextProvider';
import HeroSection from '@/Components/HeroSection';

const PatientProfile = () => {
  const { authState } = useContext(SessionContext)
  return (
    <>
      <div>
        <Navbar UserMode={authState.USER_MODE} />
        <HeroSection />
        <div className="pt-20">
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
          <Footer />
        </div>
      </div>
    </>
  );
};

export default PatientProfile;
