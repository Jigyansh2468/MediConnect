import React from "react";
import Link from "next/link";

import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import Searchbar from "@/Components/SearchBar";
import Card from "@/Components/Cards";

const Page = () => {
  return (
    <>
      <Navbar />
      <center>
        <img
          src="https://images.pexels.com/photos/7195118/pexels-photo-7195118.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
      </center>
      <Searchbar />
      <p className="text-center text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
        Interactive Elements - Make use of subtle hover effects and animations for buttons and cards. This provides a more engaging user experience.
      </p>
      <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-8 lg:gap-10 mb-20 mt-20 px-4 sm:px-10 md:px-16 lg:px-20 xl:px-24">
        <Link href="/pages/FindDoctor">
          <Card
            title="Find Doctor"
            src="https://images.pexels.com/photos/8376168/pexels-photo-8376168.jpeg?auto=compress&cs=tinysrgb&w=600"
          />
        </Link>
        <Link href="/pages/VideoConsultation">
          <Card
            title="Video Consultation"
            src="https://images.pexels.com/photos/8376278/pexels-photo-8376278.jpeg?auto=compress&cs=tinysrgb&w=600"
          />
        </Link>
        <Link href="/pages/Medicines">
          <Card
            title="Medicines"
            src="https://images.pexels.com/photos/4046945/pexels-photo-4046945.jpeg?auto=compress&cs=tinysrgb&w=600"
          />
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default Page;
