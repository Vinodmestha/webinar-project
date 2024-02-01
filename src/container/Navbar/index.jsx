import React from "react";
import NavbarContent from "./NavbarContent";

const Navbar = (props) => {
    return (
        <header className="bg-primary">
            <NavbarContent {...props} />
        </header>
    );
};

export default Navbar;
