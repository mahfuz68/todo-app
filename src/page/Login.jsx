import React from 'react';
import { NavLink } from 'react-router-dom';
import LoginInput from '../component/LoginInput';
import SocialLogin from '../component/SocialLoginInput';

export default function Login() {
    return (
        <div className="mx-auto h-full w-72 flex">
            <div className="text-center ">
                <div className="pt-24 pb-8">
                    <h1 className="text-3xl font-bold">Sign in.</h1>
                </div>
                <SocialLogin />
                <p className="my-2">or</p>
                <LoginInput />
                <div className="mt-3 text-sm">
                    <p className="text-gray-800 dark:text-gray-300">
                        Dont have an account?{' '}
                        <span>
                            <NavLink
                                to="/register"
                                className="dark:text-white text-black text-sm font-semibold"
                            >
                                Create Account
                            </NavLink>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}
