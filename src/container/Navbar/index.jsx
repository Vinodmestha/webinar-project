import React, { useEffect } from "react";
import NavbarContent from "./NavbarContent";
import { useLocation } from "react-router-dom";

const Navbar = (props) => {
    let location = useLocation();

    return (
        <header
            className={`${
                window.location?.pathname === "/" ? "bg-bgHero" : ""
            } `}
        >
            <NavbarContent {...props} />
        </header>
    );
};

export default Navbar;
