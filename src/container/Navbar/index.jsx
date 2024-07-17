import React from "react";
import NavbarContent from "./NavbarContent";

const Navbar = (props) => {
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
