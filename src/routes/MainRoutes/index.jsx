import React from "react";
import { useRoutes, Outlet } from "react-router-dom";

import Home from "./Home";
import ContactUs from "../../components/Layout/ContactUs";
import Webinars from "./Webinars";

export default function MainRoutes(props) {
    const routes = useRoutes([
        { path: "/", element: <Home /> },
        { path: "/contact-us", element: <ContactUs /> },
        { path: "webinars", element: <Webinars /> },
        Outlet,
    ]);
    return <div className="">{routes}</div>;
}
