import React, { useEffect, useState } from "react";
import { useRoutes, Outlet } from "react-router-dom";

import Home from "./Home";
import AboutUs from "./AboutUs";
import Webinars from "./Webinars";
import ContactUs from "../../components/Layout/ContactUs";

import { navLinks } from "../../db/dummy";
import BackNavigate from "../../components/UI/BackNavigate";

export default function MainRoutes(props) {
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
        { path: "/", element: <Home /> },
        { path: "/about", element: <AboutUs /> },
        { path: "/contact-us", element: <ContactUs /> },
        { path: "webinars", element: <Webinars /> },
        Outlet,
    ]);
    return (
        <div className="">
            {state?.title ? <BackNavigate backLabel={state?.title} /> : null}
            {routes}
        </div>
    );
}
