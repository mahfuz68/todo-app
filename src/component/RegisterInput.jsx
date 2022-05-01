import React from 'react';

export default function RegisterInput() {
    return (
        <div>
            <label htmlFor="name">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    required
                    className="input-login"
                />
            </label>
            <label htmlFor="email">
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
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
        </div>
    );
}
