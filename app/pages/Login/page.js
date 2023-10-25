"use client";
import axios from "axios";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
const Login = () => {
  const Router = useRouter();
  const [input, setinput] = useState({
    email: "",
    password: "",
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setmode] = useState("");
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setinput({ ...input, [name]: value });
  };
  const Handlelogin = (e) => {
    if (input.email && input.password) {
      e.preventDefault();
      console.log(input, mode);
      const URL = mode === "PATIENT" ? "patient/login" : "doctor/login";
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
              Router.replace(`/pages/Patient/Hom`);
            } else {
              Router.replace(`/pages/Doctor/Hom`);
            }
          } else {
<<<<<<< HEAD
            if (response.data == "User Not Found") {
              alert(`User with email :${input.email}\nNot found`);
            } else {
              alert("Password Incorrect");
=======
            if(response.data==="user not found") {
              alert(`User with email :${input.email}\nNot found`);
            } else {
              alert("password incorrect");
>>>>>>> a6f3184ec48f292d0694c0b40ca707738995a47f
            }
            setEmail("");
            setPassword("");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("Please fill in all the required fields before proceeding.");
    }
  };
  return (
    <>
      <h1 className="text-center font-bold text-xl py-12">
        Welcome to Login/SignUP Page
      </h1>
      <div>
        <center>
          <div className="flex items-center justify-center h-72 w-1/4 border-2 border-black px-20  rounded-xl lg:w-1/4 sm:w-1/4 ">
            <form className="text-center flex-column items-center gap-10">
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
                    onChange={(e) => {
                      setmode(e.target.value);
                    }}
                  />{" "}
                  Patient
                </label>
                <label>
                  <input
                    type="radio"
                    name="mode"
                    value="DOCTOR"
                    checked={mode === "DOCTOR"}
                    onChange={(e) => {
                      setmode(e.target.value);
                    }}
                  />{" "}
                  Doctor
                </label>
              </div>
              <br />
              <button
                className="font-semibold text-lg border-2 border-zinc-300 rounded-lg px-10 p-2 hover:bg-blue-300 hover:text-white hover:cursor-pointer mb-3"
                onClick={Handlelogin}
              >
                Login
              </button>
            </form>
          </div>
          <div className="flex gap-5 items-center justify-center ">
            <Link
              href="/pages/Patient/Signup/"
              className="my-10 font-semibold text-xl border-2 border-zinc-300 rounded-lg px-10 p-2 hover:bg-green-300 hover:text-white hover:cursor-pointer"
              type="submit"
            >
              SignUp as Patient
            </Link>
            <Link
              href="/pages/Doctor/Signup"
              className="my-10 font-semibold text-xl border-2 border-zinc-300 rounded-lg px-10 p-2 hover:bg-green-300 hover:text-white hover:cursor-pointer"
              type="submit"
            >
              SignUp as Doctor
            </Link>
          </div>
        </center>
      </div>
    </>
  );
};

export default Login;
