import React from "react";

import { useRoutes } from "react-router-dom";

import MainRoutes from "./MainRoutes";
import Auth from "../auth";

export default function Routes(props) {
    const routes = useRoutes([
        {
            path: "/auth",
            element: [<Auth {...props} />],
        },
        {
            path: "/*",
            element: [<MainRoutes {...props} />],
        },
    ]);
    return <main className="">{routes}</main>;
}
