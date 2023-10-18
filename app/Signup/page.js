"use client";
import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    phoneNo: "",
    city: "",
    DOB: "",
    password: "",
    cnfrmpass: "",
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const checkPasswordMatch = () => {
    if (input.password !== input.cnfrmpass) {
      alert("Password and Confirm Password do not match.");
    }
  };

  const sendOTP = () => {
    // Send only the email to your backend API
    axios
      .get("http://localhost:8080/patient/reqOTP",{params:{to:input.email}})
      .then((response) => {
        console.log(response.data);
        // Now, you can proceed to OTP verification
        // You may want to store the email in a state variable for later use.
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (input.password !== input.cnfrmpass) {
      alert("Password and Confirm Password do not match.");
    } else {
      if (
        input.name &&
        input.email &&
        input.phoneNo &&
        input.city &&
        input.password &&
        input.cnfrmpass
      ) {
        sendOTP();
        window.location.href = "/OTP";
      } else {
        alert("Please fill in all the required fields before proceeding.");
      }
    }
  };

  return (
    <div>
      <h1 className="text-center text-xl font-bold my-5">Signup FORM</h1>
      <center>
        <div className="flex items-center justify-center h-auto w-1/4 border-2 border-black px-20 rounded-xl lg:w-1/4 sm:w-1/4">
          <form
            action=""
            onSubmit={handleSubmit}
            className="text-center flex-column items-center gap-5 mt-5"
          >
            <input
              type="text"
              placeholder="UserName"
              name="name"
              value={input.name}
              onChange={onInputChange}
              className="my-5 p-2 rounded-md border-2 border-black"
              required
            />
            <input
              type="text"
              placeholder="Email"
              name="email"
              value={input.email}
              onChange={onInputChange}
              className="my-5 p-2 rounded-md border-2 border-black"
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              name="phoneNo"
              value={input.phoneNo}
              onChange={onInputChange}
              className="my-5 p-2 rounded-md border-2 border-black"
              required
            />
            <input
              type="text"
              placeholder="City"
              name="city"
              value={input.city}
              onChange={onInputChange}
              className="my-5 p-2 rounded-md border-2 border-black"
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={input.password}
              onChange={onInputChange}
              className="my-5 p-2 rounded-md border-2 border-black"
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              name="cnfrmpass"
              value={input.cnfrmpass}
              onBlur={checkPasswordMatch}
              onChange={onInputChange}
              className="my-5 p-2 rounded-md border-2 border-black mb-8"
              required
            />
            <button
              className="mb-8 font-semibold text-lg border-2 border-zinc-300 rounded-lg px-10 p-2 hover:bg-pink-300 hover:text-white hover:cursor-pointer"
              type="submit"
              onClick={handleSubmit}
            >
              Sign Up
            </button>
          </form>
        </div>
      </center>
    </div>
  );
};

export default Signup;
