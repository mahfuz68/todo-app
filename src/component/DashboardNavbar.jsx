import React from "react";
import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function DashboardNavbar() {
  return (
    <nav className="flex items-center justify-between p-4 bg-gray-200 dark:bg-gray-800">
      <h1 className="text-xl font-bold">Todo App</h1>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <NavLink
          to="/"
          className="text-gray-700 dark:text-gray-300 hover:text-indigo-500"
        >
          Home
        </NavLink>
      </div>
    </nav>
  );
}
