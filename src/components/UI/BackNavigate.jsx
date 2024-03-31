import React from "react";
import backIcon from "../../assets/icons/backBtn.svg";

import { useNavigate } from "react-router-dom";

import { H3 } from "../Typography";

export default function BackNavigate({ backLabel, backLink, className }) {
    let navigate = useNavigate();
    return (
        <div
            className={`flex items-center max-w-screen-xl gap-3 px-3 pt-24 mx-auto lg:pt-5 text-tertiary ${className}`}
        >
            <img
                src={backIcon}
                alt="back"
                className="w-6 transition-all duration-200 cursor-pointer sm:w-8 hover:scale-110"
                onClick={() => navigate(backLink ?? -1)}
            />
            {backLabel ? <H3 className="!mb-0">{backLabel}</H3> : null}
        </div>
    );
}
