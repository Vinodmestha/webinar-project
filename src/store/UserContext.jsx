import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [state, setState] = useState({
        userInfo: localStorage.getItem("userInfo")
            ? JSON.parse(localStorage.getItem("userInfo"))
            : null,
        isLoggedIn: localStorage.getItem("isLoggedIn") == true,
    });

    const { userInfo, isLoggedIn } = state;

    const handleLogin = (userInfo) => {
        setState((prev) => {
            return { ...prev, userInfo: userInfo, isLoggedIn: true };
        });
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        localStorage.setItem("isLoggedIn", true);
    };

    const handleLogout = () => {
        setState((prev) => {
            return { ...prev, userInfo: null, isLoggedIn: false };
        });
        localStorage.removeItem("userInfo");
        localStorage.setItem("isLoggedIn", false);
    };

    return (
        <UserContext.Provider
            value={{ userInfo, isLoggedIn, handleLogin, handleLogout }}
        >
            {children}
        </UserContext.Provider>
    );
};
