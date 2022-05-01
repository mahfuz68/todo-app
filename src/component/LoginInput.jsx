import React from 'react';
import '../assets/css/LoginInput.css';

export default function LoginInput() {
    return (
        <div>
            <label htmlFor="email">
                <input type="email" name="email" placeholder="Email" className="input-login" />
            </label>
            <label htmlFor="password">
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="input-login"
                />
            </label>

            <button
                type="submit"
                className="login-btn bg-gradient-to-r from-purple-500 to-pink-500  hover:bg-gradient-to-l hover:from-indigo-500 hover:to-purple-500 focus:ring-2 focus: ring-indigo-600 "
            >
                Sign in
            </button>
        </div>
    );
}
