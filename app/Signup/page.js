"use client";
import React, { useState } from "react";
const Signup = () => {
  const [pass, setpass] = useState("");
  const validinput = (e) => {
    console.log(e);
  };
  return (
    <>
      <h1 className="text-center text-xl font-bold my-5 ">Signup FORM</h1>
      <div>
        <center>
          <div className="flex items-center justify-center h-auto w-1/4 border-2 border-black px-20  rounded-xl lg:w-1/4 sm:w-1/4 ">
            <form
              action=""
              className="text-center flex-column items-center gap-5 mt-5"
            >
              <input
                type="text"
                placeholder="Name"
                required
                className="my-5 p-2 rounded-md border-2 border-black"
              />
              <input
                type="email"
                placeholder="Email"
                required
                className="my-5 p-2 rounded-md border-2 border-black"
              />
              <br />
              <input
                type="number"
                placeholder="Phone Number"
                className="my-5 p-2 rounded-md border-2 border-black"
              />
              <br />
              <input
                type="text"
                placeholder="City"
                required
                className="my-5 p-2 rounded-md border-2 border-black"
              />
              <br />
              <input
                type="date"
                placeholder="DOB"
                className="my-5 p-2 px-11 rounded-md border-2 border-black"
              />
              <input
                type="password"
                placeholder="Password"
                value={pass}
                onChange={(e) => {
                  setpass(e.target.value);
                }}
                className="my-5 p-2 rounded-md border-2 border-black"
              />
              <br />
              <input
                type="password"
                placeholder="Confirm Password"
                className="my-5 p-2 rounded-md border-2 border-black mb-8"
              />
              <button className="mb-8 font-semibold text-lg border-2 border-zinc-300 rounded-lg px-10 p-2 hover:bg-pink-300 hover:text-white hover:cursor-pointer">
                SignUp
              </button>
            </form>
          </div>
        </center>
      </div>
    </>
  );
};

export default Signup;
