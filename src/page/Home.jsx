import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/Home.css";
import HomeNavbar from "../component/HomeNavbar";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="h-full dark:bg-gray-900">
      <HomeNavbar />
      <div className="my-36 dark:text-white text-center">
        <h1 className="text-4xl font-bold">Tsks, just tasks.</h1>
        <div className="w-1/5 text-center mx-auto">
          <p className="my-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
          <div className="flex space-x-8 ">
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="button-primary bg-gradient-to-r from-purple-500 to-pink-500  hover:bg-gradient-to-l hover:from-indigo-500 hover:to-purple-500"
            >
              Get Started
            </button>
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="button-primary bg-gradient-to-r from-gray-500 to-zinc-500  hover:bg-gradient-to-l hover:from-indigo-500 hover:to-purple-500"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
