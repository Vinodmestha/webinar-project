import React from "react";

import { useRoutes } from "react-router-dom";

import MainRoutes from "./MainRoutes";

export default function Routes(props) {
    console.log(import.meta.env.VITE_API_BASE_URL);
    const routes = useRoutes([
        {
            path: "/*",
            element: [<MainRoutes {...props} />],
        },
    ]);
    return <main className="">{routes}</main>;
}
