"use client";
import axios from "axios";
import React, { useState } from "react";
const Signup = () => {
  const [input, setinput] = useState({
    name: "",
    email: "",
    PhoneNo: "",
    city: "",
    DOB: "",
    password: "",
    cnfrmpass: "",
  });

  const oninputchange = (e) => {
    const { name, value } = e.target;
    setinput({ ...input, [name]: value });
  };

  const checkcpass = () => {
    if (input.password !== input.cnfrmpass) {
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
      // axios post
      axios
        .post("http://localhost:8080/patient/register", input, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {});

      if (input.password === input.cnfrmpass) {
        console.log("Form submitted with matching passwords:", input);
      } else {
        alert("Password and Confirm Password do not match.");
      }
    }

    return (
      <>
        <h1 className="text-center text-xl font-bold my-5">Signup FORM</h1>
        <div>
          <center>
            <div className="flex items-center justify-center h-auto w-1/4 border-2 border-black px-20 rounded-xl lg:w-1/4 sm:w-1/4">
              <form
                action=""
                onSubmit={handlesubmit}
                className="text-center flex-column items-center gap-5 mt-5"
              >
                <input
                  type="text"
                  placeholder="UserName"
                  name="name"
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
                  name="phoneNo"
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
                  name="password"
                  value={input.password}
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
                ></button>
                Sign Up
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
};

export default Signup;
