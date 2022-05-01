import React from 'react';

export default function SocialRegister() {
    return (
        <div>
            <button
                type="button"
                className=" flex gap-x-3 focus:ring-2 focus:outline-none items-center border-2 border-gray-700 px-10 py-2 rounded-xl dark:focus:ring-gray-700  focus:ring-gray-700 font-medium"
            >
                <svg
                    className="w-4 h-4 mr-2 -ml-1"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="google"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 488 512"
                >
                    <path
                        fill="currentColor"
                        d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                    />
                </svg>
                <p>Continue with Google</p>
            </button>
            <button
                type="button"
                className="mt-5 flex gap-x-3 focus:ring-2 focus:outline-none items-center border-2 border-gray-700 px-8 py-2 rounded-xl dark:focus:ring-gray-700 focus:border-gray-700 font-medium focus:ring-gray-700"
            >
                <svg x="0px" y="0px" className="w-6 h-6" viewBox="0 0 24 24" fill="#fff;">
                    <path
                        fill="currentColor"
                        d="M12,2C6.477,2,2,6.477,2,12c0,5.395,4.275,9.78,9.621,9.981v-6.942H9.278v-2.725h2.343v-2.005 c0-2.324,1.421-3.591,3.495-3.591c0.699-0.002,1.397,0.034,2.092,0.105v2.43h-1.428c-1.13,0-1.35,0.534-1.35,1.322v1.735h2.7 l-0.351,2.725h-2.365v6.659C18.768,20.613,22,16.689,22,12C22,6.477,17.523,2,12,2z"
                    />
                </svg>
                <p>Continue with Facebook</p>
            </button>
        </div>
    );
}
