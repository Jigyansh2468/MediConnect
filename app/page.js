"use client"
import React, { useEffect, useState } from "react";
import Image from 'next/image'

import Navbar from "@/Components/Navbar";
import CardDeck from "@/Components/CardDeck";
import Footer from "@/Components/Footer";

const Page = () => {
  const [UserMode, setUserMode] = useState("")
  useEffect(() => { setUserMode("DEFAULT") }, [])
  return (
    // login page se data lekr set usermode
    <>
      <Navbar UserMode={UserMode} />
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
      <CardDeck />
      slidbar doctor specializarion cards with photos
      <Footer />
    </>
  );
};

export default Page;