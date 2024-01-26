import React from "react";
import { useRoutes, Outlet } from "react-router-dom";

import Home from "./Home";

export default function MainRoutes(props) {
    const routes = useRoutes([{ path: "/", element: <Home /> }, Outlet]);
    return <div className="">{routes}</div>;
}
