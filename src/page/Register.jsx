import React from 'react';
import { NavLink } from 'react-router-dom';
import RegisterInput from '../component/RegisterInput';
import SocialRegister from '../component/SocialRegister';

export default function Register() {
    return (
        <div className="w-72 flex h-full mx-auto">
            <div className="pt-14 text-center">
                <h1 className="text-3xl font-bold mb-8">Sign up.</h1>
                <SocialRegister />
                <p className="my-2">or</p>
                <RegisterInput />
                <div className="mt-3 text-sm">
                    <p className="text-gray-800 dark:text-gray-300">
                        Already have an account?{' '}
                        <span>
                            <NavLink
                                to="/login"
                                className="dark:text-white text-black text-sm font-semibold"
                            >
                                Log in
                            </NavLink>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}
