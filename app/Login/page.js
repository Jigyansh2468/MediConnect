import React from "react";
import Link from "next/link";
const Login = () => {
  return (
    <>
      <h1 className="text-center font-bold text-xl py-12">
        Welcome to Login/SignUP Page
      </h1>
      <div>
        <center>
          <div className="flex items-center justify-center h-72 w-1/4 border-2 border-black px-20  rounded-xl lg:w-1/4 sm:w-1/4 ">
            <form
              action=""
              className="text-center flex-column items-center gap-10"
            >
              <input
                type="email"
                placeholder="Email"
                required
                className="my-5 p-2 rounded-md border-2 border-black"
              />
              <br />
              <input
                type="password"
                placeholder="Password"
                required
                className="my-5 p-2 rounded-md border-2 border-black"
              />
              <br />
              <button className="font-semibold text-lg border-2 border-zinc-300 rounded-lg px-10 p-2 hover:bg-blue-300 hover:text-white hover:cursor-pointer">
                Login
              </button>
            </form>
          </div>
          <button className="my-10 font-semibold text-xl border-2 border-zinc-300 rounded-lg px-10 p-2 hover:bg-green-300 hover:text-white hover:cursor-pointer">
            <Link href="/Signup" className="mx-8">
              SignUp
            </Link>
          </button>
        </center>
      </div>
    </>
  );
};

export default Login;
