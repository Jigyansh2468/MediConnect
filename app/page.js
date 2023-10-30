import React from "react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import Searchbar from "@/Components/SearchBar";
const page = () => {
  return (
    <>
      <Navbar />
      <center>
        <img src="https://images.pexels.com/photos/7195118/pexels-photo-7195118.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt=""
        />
      </center>
      <Searchbar />
      Interactive Elements - Make use of subtle hover effects and animations for buttons and cards. This provides a more engaging user experience.

      <Footer />
    </>
  );
};
export default page;
