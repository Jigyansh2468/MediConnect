"use client";
import React, { useState } from "react";
const Signup = () => {
  const [input, setinput] = useState({
    username: "",
    email: "",
    PhNum: "",
    city: "",
    DOB: "",
    pass: "",
    cnfrmpass: "",
  });

  const oninputchange = (e) => {
    const { name, value } = e.target;
    setinput({ ...input, [name]: value });
  };

  const checkcpass = () => {
    if (input.pass !== input.cnfrmpass) {
      alert("Confirm Password does not match Password.");
    }
  };

  const handlesubmit = (e) => {
    e.preventDefault();

    if (input.pass !== input.cnfrmpass) {
      alert("Password and Confirm Password do not match.");
    } else {
      if (
        input.username &&
        input.email &&
        input.PhNum &&
        input.city &&
        input.pass &&
        input.cnfrmpass
      ) {
        window.location.href = "/OTP";
      } else {
        alert("Please fill in all the required fields before proceeding.");
      }
    }
  };

  return (
    <>
      <h1 className="text-center text-xl font-bold my-5">Signup FORM</h1>
      <div>
        <center>
          <div className="flex items-center justify-center h-auto w-1/4 border-2 border-black px-20 rounded-xl lg:w-1/4 sm:w-1/4">
            <form
              onSubmit={handlesubmit}
              className="text-center flex-column items-center gap-5 mt-5"
            >
              <input
                type="text"
                placeholder="UserName"
                name="username"
                value={input.username}
                onChange={oninputchange}
                className="my-5 p-2 rounded-md border-2 border-black"
                required
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={input.email}
                onChange={oninputchange}
                className="my-5 p-2 rounded-md border-2 border-black"
                required
              />
              <br />
              <input
                type="number"
                placeholder="Phone Number"
                name="PhNum"
                value={input.PhNum}
                onChange={oninputchange}
                className="my-5 p-2 rounded-md border-2 border-black"
                required
              />
              <br />
              <input
                type="text"
                placeholder="City"
                name="city"
                value={input.city}
                onChange={oninputchange}
                className="my-5 p-2 rounded-md border-2 border-black"
                required
              />
              <br />
              <input
                type="password"
                placeholder="Password"
                name="pass"
                value={input.pass}
                onChange={oninputchange}
                className="my-5 p-2 rounded-md border-2 border-black"
                required
              />
              <br />
              <input
                type="password"
                placeholder="Confirm Password"
                name="cnfrmpass"
                value={input.cnfrmpass}
                onBlur={checkcpass}
                onChange={oninputchange}
                className="my-5 p-2 rounded-md border-2 border-black mb-8"
                required
              />

              <button
                className="mb-8 font-semibold text-lg border-2 border-zinc-300 rounded-lg px-10 p-2 hover:bg-pink-300 hover:text-white hover:cursor-pointer"
                type="submit"
              >
                Sign Up
              </button>
            </form>
          </div>
        </center>
      </div>
    </>
  );
};

export default Signup;
