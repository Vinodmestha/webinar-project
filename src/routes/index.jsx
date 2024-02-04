import React from "react";

import { useRoutes } from "react-router-dom";

import Login from "../auth/Login";
import SignUp from "../auth/SignUp";
import MainRoutes from "./MainRoutes";

export default function Routes(props) {
    const routes = useRoutes([
        { path: "login", element: <Login {...props} /> },
        { path: "signup", element: <SignUp {...props} /> },
        {
            path: "/*",
            element: [<MainRoutes {...props} />],
        },
    ]);
    return <main className="">{routes}</main>;
}
