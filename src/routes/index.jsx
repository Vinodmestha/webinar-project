import React from "react";

import { useRoutes } from "react-router-dom";

import Auth from "../auth";
import MainRoutes from "./MainRoutes";
import NavbarRoutes from "./NavbarRoutes";

export default function Routes(props) {
    const routes = useRoutes([
        {
            path: "/auth",
            element: [<Auth {...props} />],
        },
        {
            path: "/*",
            element: [<MainRoutes {...props} />, <NavbarRoutes />],
        },
    ]);
    return <main className="">{routes}</main>;
}
