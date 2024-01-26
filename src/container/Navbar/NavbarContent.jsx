import React, { useEffect, useState } from "react";
import logo from "../../assets/icons/logo.png";
import userIcon from "../../assets/icons/user.svg";

import { NavLink, useLocation } from "react-router-dom";

import { navLinks } from "../../db/dummy";
import { Container } from "../../components/Container";

export default function NavbarContent(props) {
    const [state, setState] = useState({ profileMenu: false });
    const location = useLocation();
    let pathname = location?.pathname?.replace("/", "");

    useEffect(() => {}, []);

    return (
        <Container className="border-b-2 border-gray-200 !p-2.5 !my-0 flex items-center justify-between">
            <figure>
                <img src={logo} alt="webinar" className="w-40 h-16" />
            </figure>

            <ul className="flex items-center justify-center gap-16 text-lg font-semibold ">
                {navLinks?.map((item) => (
                    <li
                        key={item?.id}
                        className={`${
                            pathname === item?.slug
                                ? "text-primary"
                                : "text-gray-600"
                        } hover:text-primary`}
                    >
                        <NavLink to={item?.slug}>{item?.label}</NavLink>
                    </li>
                ))}
            </ul>
            <figure className="flex items-center gap-10">
                {/* <button className="">Register</button>
                <Button className="px-14">Login</Button> */}
                <img
                    src={userIcon}
                    alt="webinar user"
                    className="w-12 h-12 border-2 border-gray-200 rounded-full cursor-pointer"
                />
            </figure>
        </Container>
    );
}
