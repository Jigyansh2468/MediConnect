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
  const items = [
    {
      title: "Surgeon",
      description: "Description for Slide 1",
      image: "/Specialization/Surgeon.jpg",
    },
    {
      title: "Dentist",
      description: "Description for Slide 2",
      image: "/Specialization/Dentist.jpg",
    },
    {
      title: "Dermatology",
      description: "Description for Slide 3",
      image: "/Specialization/Dermatology.jpg",
    },
    {
      title: "Neurologist",
      image: "/Specialization/Neurologist.jpg",
      description: "Description for Slide 3",
    },
    {
      title: "Psychiatrist",
      description: "Description for Slide 3",
      image: "/Specialization/Psychiatrist.jpg",
    },
    {
      title: "Dentist",
      description: "Description for Slide 2",
      image: "/Specialization/Dentist.jpg",
    },
    {
      title: "Dermatology",
      description: "Description for Slide 3",
      image: "/Specialization/Dermatology.jpg",
    },
    {
      image: "/Specialization/Neurologist.jpg",
      title: "Neurologist",
      description: "Description for Slide 3",
    },
    {
      title: "Psychiatrist",
      description: "Description for Slide 3",
      image: "/Specialization/Psychiatrist.jpg",
    },
  ];
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