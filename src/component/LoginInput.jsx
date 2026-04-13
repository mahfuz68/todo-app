import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/LoginInput.css";

export default function LoginInput() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      navigate("/dashboard");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-login"
        />
      </label>
      <label htmlFor="password">
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-login"
        />
      </label>

      <button
        type="submit"
        className="login-btn bg-gradient-to-r from-purple-500 to-pink-500  hover:bg-gradient-to-l hover:from-indigo-500 hover:to-purple-500 focus:ring-2 focus: ring-indigo-600 "
      >
        Sign in
      </button>
    </form>
  );
}
