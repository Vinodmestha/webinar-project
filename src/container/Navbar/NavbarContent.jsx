import React, { useEffect, useRef, useState } from "react";
import logo from "../../assets/icons/logo.png";
import userIcon from "../../assets/icons/user.svg";

import { NavLink, useLocation, useNavigate } from "react-router-dom";
import useTypes from "../../utils/helpers/useTypes";

import Auth from "../../auth";
// import { navLinks } from "../../db/dummy";
import { Button } from "../../components/UI/Button";
import { MenuCard } from "../../components/UI/MenuCard";
import { Container } from "../../components/UI/Container";
import NoDataFound from "../../components/UI/NoDataFound";

export default function NavbarContent(props) {
    const [state, setState] = useState({
        authComp: "",
        authModal: false,
        menuChild: false,
        profileMenu: false,
    });
    const navigate = useNavigate(),
        location = useLocation(),
        webinarRef = useRef();
    let pathname = location?.pathname?.replace("/", "");

    const { typesData, typesLoading } = useTypes();

    const menuChildHandler = (v, child) => {
        setState((prev) => {
            return {
                ...prev,
                menuChild: child ? v : false,
            };
        });
    };

    const setAuthModal = (type) => {
        setState((prev) => {
            return {
                ...prev,
                profileMenu: false,
                authModal: true,
                authComp: type,
            };
        });
    };

    const closeAuthModal = () => {
        setState((prev) => {
            return { ...prev, authComp: "", authModal: false };
        });
    };

    const navLinks = [
        { id: 1, label: "About Us", slug: "about" },
        {
            id: 2,
            label: "Webinars",
            slug: "webinars",
            child: { data: typesData, loading: typesLoading, ref: webinarRef },

            //  [
            //     { id: 1, label: "Upcoming", slug: "upcoming", image: upcoming },
            //     {
            //         id: 2,
            //         label: "Pre Recorded",
            //         slug: "pre-recorded",
            //         image: preRecorded,
            //     },
            //     { id: 3, label: "On Demand", slug: "on-demand", image: onDemand },
            //     {
            //         id: 4,
            //         label: "CEU Approved",
            //         slug: "ceu-approved",
            //         image: ceuApproved,
            //     },
            // ],
        },
        { id: 3, label: "Contact", slug: "contact-us" },
    ];

    return (
        <>
            <Container
                className="relative border-b border-gray-700 h-full !p-2.5 !my-0 flex items-center justify-between"
                onMouseLeave={() => menuChildHandler(false, null)}
            >
                <figure>
                    <img
                        src={logo}
                        alt="webinar"
                        className="w-40 h-16 cursor-pointer"
                        onClick={() => navigate("/")}
                    />
                </figure>

                <ul className="flex items-center h-full justify-center gap-16 text-lg font-semibold">
                    {navLinks?.map((item) => (
                        <li
                            key={item?.id}
                            className=""
                            onMouseEnter={() =>
                                menuChildHandler(true, item?.child?.data)
                            }
                            // onMouseLeave={() =>
                            //     menuChildHandler(false,item?.child )
                            // }
                        >
                            <NavLink
                                to={item?.slug}
                                className={`${
                                    pathname === item?.slug
                                        ? "text-tertiary"
                                        : "text-white"
                                } hover:text-tertiary`}
                            >
                                {item?.label}
                            </NavLink>

                            {state?.menuChild && item?.child ? (
                                <MenuCard
                                    className="top-20 left-0 right-0 !p-8"
                                    ref={item?.child?.ref}
                                >
                                    {item?.child?.loading ? (
                                        <div className="grid lg:grid-cols-4 grid-col-2 gap-5">
                                            {new Array(4)
                                                ?.fill("")
                                                ?.map((v, i) => (
                                                    <div
                                                        className="animate-pulse bg-gray-800 h-60 rounded-lg"
                                                        key={i}
                                                    />
                                                ))}
                                        </div>
                                    ) : item?.child?.data?.length ? (
                                        <ul className="grid lg:grid-cols-4 grid-col-2 gap-5 justify-center text-center text-base font-medium">
                                            {item?.child?.data?.map((item) => (
                                                <li
                                                    key={item?._id}
                                                    className="p-5 shadow-md transition-all duration-200 cursor-pointer text-white hover:bg-tertiary hover:text-white"
                                                    onClick={() => {
                                                        navigate(
                                                            `/webinars?typeId=${item?._id}&type=${item?.slug}`,
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
                                                        className="w-full h-36"
                                                    />
                                                    <p>{item?.label}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <NoDataFound />
                                    )}
                                </MenuCard>
                            ) : null}
                        </li>
                    ))}
                </ul>
                <div className="flex items-center gap-10">
                    <img
                        src={userIcon}
                        alt="webinar user"
                        className="w-12 h-12 border-2 border-gray-200 rounded-full cursor-pointer"
                        onClick={() =>
                            setState((prev) => {
                                return {
                                    ...prev,
                                    profileMenu: !prev?.profileMenu,
                                };
                            })
                        }
                    />
                    {state?.profileMenu ? (
                        <MenuCard className="top-20 !w-fit right-0 flex gap-5">
                            <Button
                                label="Signup"
                                className="border-none rounded-lg !bg-pink-600 hover:!shadow-2xl"
                                onClick={() => setAuthModal("signup")}
                            />
                            <Button
                                label="Login"
                                className="border-none rounded-lg !bg-blue-600 hover:!shadow-2xl"
                                onClick={() => setAuthModal("login")}
                            />
                        </MenuCard>
                    ) : null}
                </div>
            </Container>
            {state?.authModal ? (
                <Auth
                    authComp={state?.authComp}
                    authModal={state?.authModal}
                    closeAuthModal={closeAuthModal}
                />
            ) : null}
        </>
    );
}
