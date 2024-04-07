import React from "react";
import { useNavigate } from "react-router-dom";

import redirect from "../../assets/icons/redirect.svg";

export const RedirectionButton = ({
    label,
    className,
    redirectLink,
    ...props
}) => {
    let navigate = useNavigate();
    return (
        <button
            className={`group flex items-center justify-center gap-3 px-4 py-3 rounded-3xl font-semibold text-white bg-primaryBtn ${className}`}
        >
            <p>{label}</p>
            {redirectLink ? (
                <img
                    src={redirect}
                    alt="webinar"
                    className="w-6 h-6 group-hover:scale-125 transition-all duration-200"
                    onClick={() =>
                        navigate(
                            redirectLink,
                            props.navigateData
                                ? { state: { ...props.navigateData } }
                                : null
                        )
                    }
                />
            ) : null}
        </button>
    );
};

export const Button = ({ label, icon, className, onClick }) => {
    return (
        <button
            className={`group flex items-center justify-center gap-3 px-4 py-3 rounded-3xl font-semibold border border-white text-white bg-transparent ${className}`}
            onClick={() => onClick()}
        >
            {icon ? (
                <img
                    src={icon}
                    alt="webinar"
                    className="w-6 h-6 group-hover:scale-125 transition-all duration-200"
                    onClick={() => onClick()}
                />
            ) : null}
            <p>{label}</p>
        </button>
    );
};
