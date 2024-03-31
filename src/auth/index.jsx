import React, { useState } from "react";
import { authImage, authBg } from "../assets";

import { useNavigate, useSearchParams } from "react-router-dom";

import Login from "./Login";
import SignUp from "./SignUp";

export default function Auth(props) {
    const [state, setState] = useState({
        detailsData: {},
        detailsLoading: false,
    });

    let navigate = useNavigate();
    const [params, setParams] = useSearchParams();

    let authPage = params?.get("action");

    const currentAuthHandler = () => {
        switch (authPage) {
            case "login":
                return <Login navigate={navigate} />;
            case "signup":
                return <SignUp navigate={navigate} />;
            default:
                return <Login navigate={navigate} />;
        }
    };
    return (
        <div className="grid md:grid-cols-2">
            <div className=" w-full flex justify-center px-10 py-20">
                {currentAuthHandler()}
            </div>
            <div className="flex justify-center py-20">
                <img src={authImage} className="size-[400px]" />
            </div>
        </div>
    );
}
