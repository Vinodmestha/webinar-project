import React, { useEffect, useState } from "react";
import { useRoutes, Outlet } from "react-router-dom";

import { navLinks } from "../../db/dummy";
import { BackNavigate } from "../../components/UI";

import Profile from "./Profile";

export default function NavbarRoutes(props) {
    const [state, setState] = useState({ title: "" });
    let path = window.location.pathname?.slice(1);

    useEffect(() => {
        let page = navLinks?.filter((item) => {
            return item?.slug === path;
        });

        setState((prev) => {
            return { ...prev, title: page[0]?.label };
        }, []);
    }, [path]);

    const routes = useRoutes([
        { path: "/profile", element: <Profile /> },
        { path: "/orders", element: <Profile /> },

        Outlet,
    ]);
    return (
        <div className="">
            {/* {window.location?.pathname !== "/" ? (
                <BackNavigate backLabel={state?.title} />
            ) : null} */}
            {routes}
        </div>
    );
}
