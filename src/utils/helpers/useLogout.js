import React, { useEffect, useState } from "react";

import { getAPI } from "../api";
import { webinarsURL } from "../endpoints";

export default function useLogout() {
    const [state, setState] = useState({
        logoutLoading: false,
    });

    const logoutHandler = () => {
        setState((prev) => {
            return { ...prev, logoutLoading: true };
        });
        getAPI(webinarsURL?.TYPES)
            .then((res) => {
                let authData = {
                    info: {
                        loggedIn: false,
                        data: {},
                    },
                };

                console.log(authData);
                localStorage.setItem("userAuth", JSON.stringify(authData));
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
