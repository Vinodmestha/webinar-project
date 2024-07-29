import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [state, setState] = useState({
        userInfo: localStorage.getItem("userInfo")
            ? JSON.parse(localStorage.getItem("userInfo"))
            : null,
        isLoggedIn: !!JSON.parse(localStorage.getItem("isLoggedIn")),
        authModal: false,
        authPage: "",
    });

    const { userInfo, isLoggedIn, authModal, authPage } = state;

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

    const setAuthPage = (v, type) => {
        setState((prev) => {
            return { ...prev, authModal: v, authPage: type };
        });
        // navigate(`/auth?action=${type}`);
    };

    return (
        <UserContext.Provider
            value={{
                userInfo,
                isLoggedIn,
                authModal,
                authPage,
                setAuthPage,
                handleLogin,
                handleLogout,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
