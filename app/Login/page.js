"use client";
import axios from "axios";
import React from "react";
import { useState } from "react";
const Login = () => {
  const [input, setinput] = useState({
    email: "",
    password: "",
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setmode] = useState("");
  const handleModeChange = (e) => {
    setmode(e.target.value);
  };
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setinput({ ...input, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const URL = mode === "Patient" ? "patient/login" : "doctor/login";
    axios
      .post(`http://localhost:8080/${URL}`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        if (response.data === "login successful") {
          if (mode == "PATIENT") {
            alert("got to patient profile page");
          } else {
            alert("got to doctor profile page");
          }
        } else {
          if (response.data == "Incorrect password") {
            alert("password incorrect");
          } else if (response.data == "Patient not found with email") {
            alert("Email is not exist in database");
          }
          setEmail("");
          setPassword("");
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
                name="password"
                value={input.password}
                onChange={onInputChange}
                className="my-5 p-2 rounded-md border-2 border-black"
                required
              />
              <div className="flex gap-1 font-bold">
                Login as
                <br />
                <label>
                  <input
                    type="radio"
                    name="mode"
                    value="PATIENT"
                    checked={mode === "PATIENT"}
                    onChange={handleModeChange}
                  />{" "}
                  Patient
                </label>
                <label>
                  <input
                    type="radio"
                    name="mode"
                    value="DOCTOR"
                    checked={mode === "DOCTOR"}
                    onChange={handleModeChange}
                  />{" "}
                  Doctor
                </label>
              </div>
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
