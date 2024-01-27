import React, { useEffect, useState } from "react";
import logo from "../../assets/icons/logo.png";
import userIcon from "../../assets/icons/user.svg";

import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { navLinks } from "../../db/dummy";
import { Container } from "../../components/Container";
import MenuCard from "../../components/UI/MenuCard";

export default function NavbarContent(props) {
    const [state, setState] = useState({
        menuChild: false,
        profileMenu: false,
    });
    const navigate = useNavigate(),
        location = useLocation();
    let pathname = location?.pathname?.replace("/", "");

    useEffect(() => {}, []);

    const menuChildHandler = (v, child) => {
        setState((prev) => {
            return {
                ...prev,
                menuChild: child ? v : false,
            };
        });
    };

    return (
        <Container className="border-b-2 border-gray-200 h-full !p-2.5 !my-0 flex items-center justify-between">
            <figure>
                <img
                    src={logo}
                    alt="webinar"
                    className="w-40 h-16 cursor-pointer"
                    onClick={() => navigate("/")}
                />
            </figure>

            <ul className="flex items-center h-full justify-center gap-16 text-lg font-semibold ">
                {navLinks?.map((item) => (
                    <li
                        key={item?.id}
                        className="relative"
                        onMouseEnter={() => menuChildHandler(true, item?.child)}
                        // onMouseLeave={() =>
                        //     menuChildHandler(false,item?.child )
                        // }
                    >
                        <NavLink
                            to={item?.slug}
                            className={`${
                                pathname === item?.slug
                                    ? "text-primary"
                                    : "text-gray-600"
                            } hover:text-primary`}
                        >
                            {item?.label}
                        </NavLink>

                        {state?.menuChild && item?.child ? (
                            <MenuCard className="!p-8">
                                <ul className="grid lg:grid-cols-2 grid-col-2 justify-center text-center text-base font-medium">
                                    {item?.child?.map((item) => (
                                        <li
                                            key={item?.id}
                                            className="p-5 shadow-md transition-all duration-200 cursor-pointer hover:bg-blue-300 hover:text-white"
                                            onClick={() => {
                                                navigate(
                                                    `/webinars/type?=${item?.slug}`,
                                                    {
                                                        state: {
                                                            name: item?.slug,
                                                        },
                                                    }
                                                );

                                                menuChildHandler(false);
                                            }}
                                        >
                                            <img
                                                src={item?.image}
                                                alt={item?.slug}
                                                className="w-28 h-28"
                                            />
                                            <p>{item?.label}</p>
                                        </li>
                                    ))}
                                </ul>
                            </MenuCard>
                        ) : null}
                    </li>
                ))}
            </ul>
            <figure className="flex items-center gap-10">
                <img
                    src={userIcon}
                    alt="webinar user"
                    className="w-12 h-12 border-2 border-gray-200 rounded-full cursor-pointer"
                />
            </figure>
        </Container>
    );
}
