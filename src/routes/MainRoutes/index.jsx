import React, { useEffect, useState } from "react";
import { useRoutes, Outlet } from "react-router-dom";

import Home from "./Home";
import AboutUs from "./AboutUs";
import Webinars from "./Webinars";
import WebinarDetails from "./Webinars/WebinarDetails";
import SpeakersDetails from "./Speakers/SpeakersDetails";
import ContactUs from "../../components/Layout/ContactUs";
import Cart from "./Cart/Cart";

import { navLinks } from "../../db/dummy";
import BackNavigate from "../../components/UI/BackNavigate";
import Speakers from "./Home/components/Speakers";

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
        {
            path: "webinars",
            children: [
                { path: "", element: <Webinars /> },
                { path: "checkout", element: <Cart /> },
                { path: ":key", element: <WebinarDetails /> },
            ],
        },
        {
            path: "speakers",
            children: [
                { path: "", element: <Speakers /> },
                { path: "details", element: <SpeakersDetails /> },
            ],
        },
        { path: "/cart", element: <Cart /> },
        Outlet,
    ]);
    return (
        <div className="">
            {window.location?.pathname !== "/" ? (
                <BackNavigate backLabel={state?.title} />
            ) : null}
            {routes}
        </div>
    );
}
