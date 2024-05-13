"use client";
import { useState } from "react";

import { MdArrowOutward } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

import { useRouter } from "next/navigation";
import toast, { Toaster } from 'react-hot-toast';
import loginPic from '@/public/employeeLogin.svg'

export default function Page() {
  const [error, setError] = useState("");
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [eyeClick, setEyeClick] = useState(true);



  const handleLogin = async () => {
    console.log("Email is " + email);
    console.log("Password is " + password);
    const loginFailed = () => toast.error('Credentials are incorrect.');
    const loginSuccess =() => toast.success('Login Success');

    try {
     if(email === 'admin' && password === "password"){
        setEmail("");
        setPassword("");
  
      
         loginSuccess()
          router.push("/")
        setError("")
    
   
      }else {
        setError("Login failed. ");
        loginFailed();
      }
    } catch (error) {
      console.error(error);
     
     
    }
  };

  return (
    <div
      className={`h-full md:min-h-screen relative overflow-hidden flex justify-center items-center min-w-full bg-white`}
    >
       <Toaster   toastOptions={{ className: '',duration: 3000,style: { background: '#363636',color: '#fff',}}} />
      <div className="hidden md:flex md:w-1/2 h-screen items-center justify-center transition-all ease-out duration-500 ">
        <div className=" group   justify-center items-center">
         
          <Image
            src={loginPic}
            alt="login"
            width={600}
            height={600}
            className="scale-110"
          ></Image>
        </div>
      </div>
      
      <div className="md:w-1/2 w-full flex flex-col items-center justify-center">
        <div className="flex md:w-[50%] font-poppins text-4xl justify-items-start ml-6 items-center  mb-5">
         
          <div className="font-bold text-black -ml-3">Welcome back</div>
        </div>
        <div className="text-gray-950 md:text-2xl text-xl opacity-80 font-medium flex-col mb-3 text-left md:w-1/2 w-full md:px-0  justify-start flex ">
        {error ? <div className="error-message">{error}</div> : <div className="text-lg w-full">Manage your workspace at ease</div>}  
        </div>
        <div className="flex-col flex md:w-1/2   justify-items-start items-start ">
          <label htmlFor="email" className="text-xl my-3 font-normal ml-2">
            Email
          </label>
          <input
            type="text"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="inputField"
          />
          <label
            htmlFor="password"
            className="text-xl  mb-2 mt-3 font-normal ml-2"
          >
            Password
          </label>
          <div className="w-full relative flex">
            <input
              type={eyeClick ? "password" : "text"}
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="inputField "
            ></input>
            {eyeClick ? (
              <FaEye
                onClick={() => {
                  setEyeClick(!eyeClick);
                }}
                className="absolute right-0 mr-4 mt-3 text-xl text-gray-950 opacity-50 hover:opacity-100 cursor-pointer"
              />
            ) : (
              <FaEyeSlash
                onClick={() => {
                  setEyeClick(!eyeClick);
                }}
                className="absolute right-0 mr-4 mt-3 text-xl text-gray-950 opacity-50 hover:opacity-100 cursor-pointer"
              />
            )}
          </div>
        </div>
        <div className="flex flex-col mt-8 gap-4 md:w-[50%] w-full">
          {/* <a
            href=""
            className="text-right text-blue-700 hover:text-blue-500 mb-3 mr-6 md:mr-0"
          >
            Forgot Password?
          </a> */}
          <button
            className="bg-[#1b1b1b] hover:bg-[#3f3f3f] text-white transition-all duration-100 ease text-xl py-4 md:px-6 mx-6 md:mx-0  rounded-lg"
            onClick={handleLogin}
          >
            Log In
          </button>
        </div>
        
        <div className="  md:w-1/2 mt-10 flex  justify-center items-center">
          <p className="mr-2 text-black">Admin?</p>
          <button className=" mr-1 flex rounded-full px-3 py-[2px] text-sm justify-center items-center bg-transparent border border-gray-950 text-black">
            <Link href={"/login"}>Login as Admin</Link>
          </button>
          <div className="bg-[#f4fd6b] w-7 h-7 flex justify-center items-center rounded-full text-black">
            <MdArrowOutward />
          </div>
        </div>
      </div>
    </div>
  );
}