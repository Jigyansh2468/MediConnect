"use client"
import React, { useContext, useEffect, useState } from "react";
import Image from 'next/image'
import Link from 'next/link'

import { SessionContext } from "@/Components/SessionContextProvider";
import Navbar from "@/Components/Navbar";
import CardDeck from "@/Components/CardDeck";
import Slider from "@/Components/Slider";
import Footer from "@/Components/Footer";

const Page = () => {

  const [UserMode, setUserMode] = useState("")
  const { authState } = useContext(SessionContext)
  useEffect(() => { setUserMode("DEFAULT") }, [])
  return (
    <>
      <Navbar UserMode={authState.USER_MODE} />
      <hr />
      <center className="py-10">
        <Link href="/Login">
          <Image
            src="/CARD.jpg"
            alt="Logo"
            width={1500}
            height={300}
            className="rounded-xl"
            priority
          />
        </Link>
      </center>
      <CardDeck />
      <hr />
      <Slider />
      <hr />
      <Footer />
    </>
  );
};

export default Page;