"use client";
import React from "react";
import { useState } from "react";
const Login = () => {
  const [input, setinput] = useState({
    email: "",
    pass: "",
  });
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setinput({ ...input, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // check pass with database
    // if correct then verify otp
  };
  const submitbtnp = () => {
    window.location.href = "/SignupP";
  };
  const submitbtnd = () => {
    window.location.href = "/SignupD";
  };
  return (
    <>
      <h1 className="text-center font-bold text-xl py-12">
        Welcome to Login/SignUP Page
      </h1>
      <div>
        <center>
          <div className="flex items-center justify-center h-72 w-1/4 border-2 border-black px-20  rounded-xl lg:w-1/4 sm:w-1/4 ">
            <form
              onSubmit={handleSubmit}
              className="text-center flex-column items-center gap-10"
            >
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={input.email}
                onChange={onInputChange}
                className="my-5 p-2 rounded-md border-2 border-black"
                required
              />
              <br />
              <input
                type="password"
                placeholder="Password"
                name="pass"
                value={input.pass}
                onChange={onInputChange}
                className="my-5 p-2 rounded-md border-2 border-black"
                required
              />
              <br />
              <button className="font-semibold text-lg border-2 border-zinc-300 rounded-lg px-10 p-2 hover:bg-blue-300 hover:text-white hover:cursor-pointer">
                Login
              </button>
            </form>
          </div>
          <div className="flex gap-5 items-center justify-center ">
            <button
              className="my-10 font-semibold text-xl border-2 border-zinc-300 rounded-lg px-10 p-2 hover:bg-green-300 hover:text-white hover:cursor-pointer"
              type="submit"
              onClick={submitbtnp}
            >
              SignUp as Patient
            </button>
            <button
              className="my-10 font-semibold text-xl border-2 border-zinc-300 rounded-lg px-10 p-2 hover:bg-green-300 hover:text-white hover:cursor-pointer"
              type="submit"
              onClick={submitbtnd}
            >
              SignUp as Doctor
            </button>
          </div>
        </center>
      </div>
    </>
  );
};

export default Login;
