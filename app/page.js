"use client"
import React, { useContext, useEffect, useState } from "react";
import Image from 'next/image'
import Link from 'next/link'

import { SessionContext } from "@/Components/SessionContextProvider";
import Navbar from "@/Components/Navbar";
import HeroSection from "@/Components/HeroSection";
import CardDeck from "@/Components/CardDeck";
import Slider from "@/Components/Slider";
import Footer from "@/Components/Footer";

const Page = () => {

  const [UserMode, setUserMode] = useState("")
  const { authState } = useContext(SessionContext)
  useEffect(() => { setUserMode("DEFAULT") }, [])
  return (
    <div className="w-full h-full overflow-x-hidden">
      <div>
        <Navbar UserMode={authState.USER_MODE} />
        <HeroSection />
        <center>
          <Link href="/Patient/Signup">
            <Image
              src="/CARD.jpg"
              alt="Logo"
              width={1000}
              height={300}
              className="rounded-xl mt-20 w-auto h-auto"
              priority
            />
          </Link>
        </center>
        <CardDeck />
        <hr />
        {/* fix width of slider div it is making page unresponsive */}
        <Slider />
        <hr />
        <Footer />
      </div>
    </div>
  );
};

export default Page;
