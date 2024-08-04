import React, { useEffect, useState } from "react";
import { useRoutes, Outlet } from "react-router-dom";

import { footerPolicies } from "../../db/dummy";
import { BackNavigate } from "../../components/UI";

import PrivacyPolicy from "./PrivacyPolicy";
import TermsConditions from "./TermsConditions";

export default function FooterRoutes(props) {
    const [state, setState] = useState({ title: "" });
    let path = window.location.pathname?.slice(1);

    useEffect(() => {
        let page = footerPolicies?.filter((item) => {
            return item?.slug === path;
        });

        setState((prev) => {
            return { ...prev, title: page[0]?.label };
        }, []);
    }, [path]);

    const routes = useRoutes([
        { path: "/privacy-policy", element: <PrivacyPolicy /> },
        { path: "/terms-and-conditions", element: <TermsConditions /> },

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
