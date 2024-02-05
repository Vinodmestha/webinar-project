import React from "react";
import loginBanner from "../assets/images/loginBanner.svg";
import authUser from "../assets/icons/authUser.png";
import signupBanner from "../assets/images/signupBanner.svg";

import Login from "./Login";
import SignUp from "./SignUp";
import Modal from "../components/UI/Modal";

export default function Auth(props) {
    let banners = { login: loginBanner, signup: signupBanner };
    return (
        <Modal
            size="sm"
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
                    {props?.authComp === "login" ? <Login /> : <SignUp />}
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
