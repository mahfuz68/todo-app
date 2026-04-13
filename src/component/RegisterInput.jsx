import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterInput() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && password) {
      navigate("/dashboard");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="input-login"
        />
      </label>
      <label htmlFor="email">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input-login"
          autoComplete="new-password"
        />
      </label>
      <label htmlFor="password">
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="input-login"
        />
      </label>

      <button
        type="submit"
        className="login-btn bg-gradient-to-r from-purple-500 to-pink-500  hover:bg-gradient-to-l hover:from-indigo-500 hover:to-purple-500 focus:ring-2 focus: ring-indigo-600 "
      >
        Sign up
      </button>
    </form>
  );
}
