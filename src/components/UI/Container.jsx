import React from "react";

export const Container = ({ children, className }) => {
    return (
        <div className={`max-w-screen-xl mx-auto py-10 ${className}`}>
            {children}
        </div>
    );
};
export const Wrapper = ({ children, className }) => {
    return <div className={` my-20 ${className}`}>{children}</div>;
};
