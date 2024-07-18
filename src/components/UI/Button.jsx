import React from "react";
import { useNavigate } from "react-router-dom";

import redirect from "../../assets/icons/redirect.svg";
import DotedLoader from "./loaders/DotedLoader";

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
            className={`group flex items-center justify-center gap-3 px-4 py-3 rounded-3xl font-semibold border-2 border-primaryBtn text-primaryBtn bg-transparent ${className}`}
            onClick={() => onClick()}
        >
            {icon ? (
                React.isValidElement(icon) ? null : (
                    <img
                        src={icon}
                        alt="webinar"
                        className="w-6 h-6 group-hover:scale-125 transition-all duration-200"
                        onClick={() => onClick()}
                    />
                )
            ) : null}
            <p>{label}</p>
            {React.isValidElement(icon) ? icon : null}
        </button>
    );
};

export const IconButton = (props) => {
    return props?.loading ? (
        <div className=" border-2 border-tertiary px-[1px] py-2 rounded-full">
            <DotedLoader fill="#0077b6" />
        </div>
    ) : (
        <button
            onClick={props?.onClick}
            disabled={props?.disabled}
            className={`${
                props?.disabled ? "cursor-not-allowed" : "cursor-pointer"
            }`}
        >
            {React.isValidElement(props?.icon) ? (
                props?.icon
            ) : (
                <img src={props?.icon} alt={props?.value} className="size-10" />
            )}
        </button>
    );
};
