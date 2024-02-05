import React from "react";

export const Input = ({ label, type, placeholder, className }) => {
    return (
        <>
            <label className="text-white">{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                className={`w-full rounded-full !px-5 !py-2.5 !outline-none border-none bg-black ${
                    className ?? ""
                }`}
            />
        </>
    );
};
