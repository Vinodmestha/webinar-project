import React, { useContext, useState } from "react";

import { postAPI } from "../api";
import { authURL } from "../endpoints";
import { UserContext } from "../../store/UserContext";

export default function useLogout() {
    const { handleLogout } = useContext(UserContext);
    const [state, setState] = useState({
        logoutLoading: false,
    });

    const logoutHandler = () => {
        setState((prev) => {
            return { ...prev, logoutLoading: true };
        });
        postAPI(authURL?.LOGOUT)
            .then(() => {
                handleLogout();
                window.location.reload();

                // localStorage.setItem("userAuth", JSON.stringify(authData));
            })
            .finally(() => {
                setState((prev) => {
                    return { ...prev, logoutLoading: false };
                });
            });
    };

    const { logoutLoading } = state;
    return { logoutHandler, logoutLoading };
}
