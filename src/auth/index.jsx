import React, { useState } from "react";
// import { authImage, authBg } from "../assets";

import { useNavigate, useSearchParams } from "react-router-dom";

import Login from "./Login";
import SignUp from "./SignUp";
import ForgotPassword from "./ForgotPassword";
import { H2 } from "../components/Typography";

export default function Auth(props) {
    let navigate = useNavigate();
    const [params, setParams] = useSearchParams();

    let authPage = params?.get("action");

    const setAuthPage = (type) => {
        navigate(`/auth?action=${type}`);
    };
    const currentAuthHandler = () => {
        switch (authPage) {
            case "login":
                return <Login navigate={navigate} setAuthPage={setAuthPage} />;
            case "signup":
                return <SignUp navigate={navigate} />;
            case "forgotPassword":
                return <ForgotPassword navigate={navigate} />;
            default:
                return <Login navigate={navigate} />;
        }
    };

    const headerContent = {
        login: {
            heading: "Login",
            desc: "Please enter log in details",
            footerText: "Don't have a account?",
            linkText: " Sign Up",
            footerLink: "signup",
        },
        signup: {
            heading: "Sign up",
            desc: "Please enter your details",
            footerText: " Already have a account?",
            linkText: "Login",
            footerLink: "login",
        },
        forgotPassword: {
            heading: "Forgot Password",
            desc: "Please enter your details",
            footerText: "Back to",
            linkText: "Login",
            footerLink: "login",
        },
    };

    return (
        <div
            className={`grid md:grid-cols-1 py-20 w-full ${
                authPage === "signup" ? "max-w-screen-lg" : "max-w-screen-md"
            } mx-auto`}
        >
            <p
                className="flex items-center gap-2 text-xl mb-3 font-semibold text-blue-600 hover:text-blue-400 transition-all duration-200 w-fit cursor-pointer"
                onClick={() => navigate("/")}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-8 h-8"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
                    />
                </svg>
                Back to home
            </p>
            <div className="border border-gray-700 p-10 rounded-lg">
                <div className="relative *:text-gray-400 text-center mb-10">
                    <H2>{headerContent[authPage]?.heading}</H2>
                    <p>{headerContent[authPage]?.desc}</p>
                    {/* <span className="absolute top-0 right-0">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-8 h-8"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                        </svg>
                    </span> */}
                </div>
                {currentAuthHandler()}
                <span className="flex items-center gap-2 mt-4 justify-center text-black">
                    {headerContent[authPage]?.footerText}
                    <b
                        className="underline cursor-pointer text-tertiary"
                        onClick={() =>
                            setAuthPage(headerContent[authPage]?.footerLink)
                        }
                    >
                        {headerContent[authPage]?.linkText}
                    </b>
                </span>
            </div>
            {/* <div className="flex justify-center py-24">
                <img src={authImage} className="size-[400px]" />
            </div> */}
        </div>
    );
}
