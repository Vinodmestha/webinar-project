import React from "react";

export const MenuCard = ({ children, className }) => {
    return (
        <div
            className={`absolute w-full rounded-xl animate-fadeInDown transition-all duration-300 p-5 shadow-2xl z-[1000] bg-gray-100 ${className}`}
        >
            {children}
        </div>
    );
};
