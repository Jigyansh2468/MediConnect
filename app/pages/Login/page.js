"use client"
import axios from "axios";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
const Login = () => {
  const history = useRouter();
  const [input, setinput] = useState({
    email: "",
    password: "",
    user: "PATIENT",
  });

  // const onInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setinput({ ...input, [name]: value });
  // };
  const onInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      const newValue = checked ? value : "";
      setinput({ ...input, [name]: newValue });
    } else {
      setinput({ ...input, [name]: value });
    }
  };
  const Handlelogin = (e) => {
    if (input.email && input.password) {
      e.preventDefault();
      console.log(input);
      axios
        .post("http://localhost:8080/login", input, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })
        .then((response) => {
          if (response.data === "login successful") {
            if (input.user === "PATIENT") {
              history.replace("/pages/Patient/Hom");
            } else {
              history.replace("/pages/Doctor/Hom");
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
    <div className="bg-gray-100 h-screen flex items-center justify-center">
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
              className="w-full border border-gray-300 rounded-md py-2 px-3"
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
              className="w-full border border-gray-300 rounded-md py-2 px-3"
              required
            />
          </div>
          <div className="flex flex-row gap-10 font-bold">
            <label className="block font-medium text-gray-700">Are You a Doctor</label>
            <div className="space-x-2">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="user"
                  value="DOCTOR"
                  checked={input.user === "DOCTOR"}
                  onChange={onInputChange}
                />
                If yes Click here
              </label>
            </div>
          </div>
          <div>
            <button
              type="button"
              className="w-full bg-blue-500 text-white py-2 px-3 rounded-md hover:bg-blue-600"
              onClick={Handlelogin}
            >
              Login
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <Link href="/pages/Patient/Signup/">
            Sign up as Patient
          </Link>
          <span className="mx-2 text-gray-500">|</span>
          <Link href="/pages/Doctor/Signup">
            Sign up as Doctor
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
