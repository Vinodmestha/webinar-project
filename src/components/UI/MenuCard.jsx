import React from "react";

export default function MenuCard({ children, className }) {
    return (
        <div
            className={`absolute top-14 -left-[150px] rounded-xl w-max animate-fadeInDown transition-all duration-300 p-5 shadow-2xl z-[1000] bg-blue-50 ${className}`}
        >
            {children}
        </div>
    );
}
