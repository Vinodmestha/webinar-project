import React, { useState } from "react";
import authUser from "../assets/icons/authUser.png";
import loginBanner from "../assets/images/loginBanner.svg";
import signupBanner from "../assets/images/signupBanner.svg";

import Login from "./Login";
import SignUp from "./SignUp";
import ForgotPassword from "./ForgotPassword";
import Modal from "../components/UI/Modal";

export default function Auth(props) {
    const [state, setState] = useState({
        authModal: props?.authModal ?? false,
        authComp: props?.authComp ?? "login",
    });

    const setAuthModal = (type) => {
        setState((prev) => {
            return {
                ...prev,
                authComp: type,
            };
        });
    };

    let banners = { login: loginBanner, signup: signupBanner };
    return (
        <Modal
            size="sm"
            backOption={state?.authComp === "forgotPassword"}
            backAction={() =>
                setState((prev) => {
                    return { ...prev, authComp: "login" };
                })
            }
            open={props?.authModal}
            onClose={props?.closeAuthModal}
        >
            <div className="grid grid-cols-1 lg:grid-cols-1">
                <div className="flex flex-col justify-start items-center">
                    <img
                        src={authUser}
                        alt="login/signup"
                        className="w-16 h-16"
                    />
                    {state?.authComp === "login" ? (
                        <Login setAuthModal={setAuthModal} />
                    ) : state?.authComp === "signup" ? (
                        <SignUp />
                    ) : (
                        <ForgotPassword />
                    )}
                </div>
                {/* <img
                    src={banners[props?.authComp]}
                    alt={props?.authComp}
                    className=""
                /> */}
            </div>
        </Modal>
    );
}
