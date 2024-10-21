'use client'
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./login.css";
import { SessionContext } from "@/Components/SessionContextProvider";

const Login = () => {
  useEffect(() => { console.log("hello") }, []);
  const route = useRouter();

  const [input, setInput] = useState({
    email: "",
    password: "",
    user: "PATIENT",
  });

  const { setAuthState } = useContext(SessionContext)

  const onInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      const newValue = checked ? value : "";
      setInput({ ...input, [name]: newValue });
    } else {
      setInput({ ...input, [name]: value });
    }
  };

  const Handlelogin = (e) => {

    if (input.email && input.password) {
      e.preventDefault();
      axios
        .post("http://localhost:8080/login", input, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })
        .then((response) => {
          // cookies
          const cookies = document.cookie.split('; '); // Split the cookies
          let USER_MODE = null;

          cookies.forEach((cookie) => {
            const [name, value] = cookie.split('=');
            if (name.trim() === 'USER_MODE') {
              USER_MODE = value.trim();
            }
            console.log(cookie);
          });

          if (USER_MODE !== null) {
            console.log('USER_MODE:', USER_MODE);
          } else {
            console.log('USER_MODE cookie not found');
          }
          setAuthState((prev) => {
            return {
              USER_MODE: USER_MODE,
            }
          })
          console.log(USER_MODE);

          // handling response
          if (response.data === "login successful") {
            if (input.user === "PATIENT") {
              route.replace("/");
            } else {
              route.replace("/");
            }
          } else {
            if (response.data === "Incorrect password") {
              alert("Password is incorrect");
            } else {
              alert("User Not Found");
            }
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
    <div className="min-h-screen flex items-center justify-center">
      <video
        autoPlay
        muted
        loop
        className="fixed object-cover object-center w-full h-full z-0 filter blur-md"
      >
        <source src='/LoginBlur.mp4' type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute w-full h-full z-10">
        <div className="flex items-center justify-center h-full">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h1 className="text-center text-2xl font-bold mb-4">Login</h1>
            <form className="space-y-4">
              <div>
                <label htmlFor="email" className="block font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={input.email}
                  onChange={onInputChange}
                  className="w-full border-2 border-blue-600 rounded-md py-2 px-3"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={input.password}
                  onChange={onInputChange}
                  className="w-full border-blue-600 border-2 rounded-md py-2 px-3"
                  required
                />
              </div>
              <div className="flex flex-row flex-wrap gap-2 font-bold">
                <label className="block font-medium text-gray-700 ">Doctor</label>
                <div className="space-x-2 flex">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="user"
                      value="DOCTOR"
                      checked={input.user === "DOCTOR"}
                      onChange={onInputChange}
                      className="hidden"
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
              <div>
                <button
                  type="button"
                  className="w-full bg-blue-400 text-white py-2 px-3 rounded-md hover:bg-blue-600"
                  onClick={Handlelogin}
                >
                  Login
                </button>
              </div>
            </form>
            <div className="text-center mt-4">
              <Link href="/Patient/Signup">Sign up as Patient</Link>
              <span className="mx-2 text-gray-500">|</span>
              <Link href="/Doctor/Signup">Sign up as Doctor</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
