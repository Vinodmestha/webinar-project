import React from "react";

import { useRoutes } from "react-router-dom";

import Auth from "../auth";
import MainRoutes from "./MainRoutes";
import NavbarRoutes from "./NavbarRoutes";
import FooterRoutes from "./FooterRoutes";

export default function Routes(props) {
    const routes = useRoutes([
        {
            path: "/auth",
            element: [<Auth {...props} />],
        },
        {
            path: "/*",
            element: [
                <MainRoutes {...props} />,
                <NavbarRoutes {...props} />,
                <FooterRoutes {...props} />,
            ],
        },
    ]);
    return <main className="">{routes}</main>;
}
