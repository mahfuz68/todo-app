import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const logout = () => {
  localStorage.removeItem("user");
  window.location.href = "/";
};

export default function DashboardNavbar() {
  return (
    <nav className="h-[60px] flex items-center justify-between px-6">
      <h1 className="text-[20px] font-bold text-white">
        Task<span className="text-[#FF5A3C]">Flow</span>
      </h1>
      <button
        onClick={logout}
        className="text-white hover:text-[#FF5A3C] transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 16l4-4m0 0m-4 4l4 4m-4-4l-4-4m4 4l-4 4"
          />
        </svg>
      </button>
    </nav>
  );
}
