import React, { forwardRef } from "react";

export const MenuCard = forwardRef(({ ref, children, className }) => {
    return (
        <div
            className={`absolute w-full rounded-xl animate-fadeInDown transition-all border border-gray-700 duration-300 p-5 shadow-2xl z-[1000] bg-bgHero ${className}`}
            ref={ref}
        >
            {children}
        </div>
    );
});
