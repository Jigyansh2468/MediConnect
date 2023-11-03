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
      <center className="py-10">
        <Link href="/Patient/Signup">
          <Image
            src="/CARD.jpg"
            alt="Logo"
            width={1500}
            height={300}
            className="rounded-xl mt-28"
            priority
          />
        </Link>
      </center>
      <CardDeck />
      <hr />
      {/* fix width of slider div it is making page unresponsive */}
      <Slider />
      <hr />
      {/* <DummyArticle /> */}
      <hr />
      <Footer />
    </>
  );
};

export default Page;