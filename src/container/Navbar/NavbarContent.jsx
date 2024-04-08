import React, { useEffect, useRef, useState } from "react";
import { logo, cartIcon } from "../../assets";
import userIcon from "../../assets/icons/user.svg";

import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { navMenu } from "../../db/dummy";
import { H4 } from "../../components/Typography";
import { Button } from "../../components/UI/Button";
import { MenuCard } from "../../components/UI/MenuCard";
import { Container } from "../../components/UI/Container";
import NoDataFound from "../../components/UI/NoDataFound";
import DotedLoader from "../../components/UI/loaders/DotedLoader";

import useTypes from "../../utils/helpers/useTypes";
import useLogout from "../../utils/helpers/useLogout";
import useCartCount from "../../utils/helpers/useCartCount";

export default function NavbarContent(props) {
    const [state, setState] = useState({
        authComp: "",
        menuChild: false,
        profileMenu: false,
    });
    const navigate = useNavigate(),
        location = useLocation(),
        webinarRef = useRef();
    let pathname = location?.pathname?.replace("/", "");
    let authData = JSON.parse(localStorage.getItem("userAuth"));

    const { typesData, typesLoading } = useTypes();
    const { logoutHandler, logoutLoading } = useLogout();

    const { cartCount, cartCountHandler } = useCartCount();
    let count = localStorage.getItem("cart-count");

    useEffect(() => {
        cartCountHandler();
    }, [count]);
    const menuChildHandler = (v, child) => {
        setState((prev) => {
            return {
                ...prev,
                menuChild: child ? v : false,
            };
        });
    };

    const setAuthPage = (type) => {
        navigate(`/auth?action=${type}`);
        setState((prev) => {
            return {
                ...prev,
                profileMenu: false,
            };
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

    let menuListStyles =
        "cursor-pointer hover:bg-yellow-800 rounded-lg p-2 my-1";

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
                    <figure
                        className="relative cursor-pointer"
                        onClick={() => navigate("/cart")}
                    >
                        <img src={cartIcon} alt="cart" className="w-20 h-11 " />
                        <p className="absolute -top-1 right-6 bg-tertiary text-white font-axiSemiBold rounded-full w-fit px-2">
                            {cartCount}
                        </p>
                    </figure>
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
                        <MenuCard className="top-20 w-fit max-w-60 right-0">
                            {authData?.info?.loggedIn &&
                            authData?.info?.data?.token ? (
                                <>
                                    <div
                                        className={`flex items-center gap-2 border-b border-gray-600 p-2 capitalize`}
                                    >
                                        Hi<H4>{authData?.info?.data?.name}</H4>
                                    </div>
                                    <ul>
                                        {navMenu?.map((item, i) => (
                                            <li
                                                key={item?.id}
                                                className={`${menuListStyles}`}
                                                onClick={() =>
                                                    navigate(item?.slug)
                                                }
                                            >
                                                <div>{item?.label}</div>
                                            </li>
                                        ))}
                                        <li
                                            onClick={() => logoutHandler()}
                                            className={`${
                                                logoutLoading
                                                    ? "!bg-red-500"
                                                    : ""
                                            } ${menuListStyles}`}
                                        >
                                            {logoutLoading ? (
                                                <div className="flex justify-center ">
                                                    <DotedLoader fill="#fff" />
                                                </div>
                                            ) : (
                                                "Logout"
                                            )}
                                        </li>
                                    </ul>
                                </>
                            ) : (
                                <div className="grid grid-cols-2 gap-5">
                                    <Button
                                        label="Signup"
                                        className="border-none rounded-lg !bg-pink-600 hover:!shadow-2xl"
                                        onClick={() => setAuthPage("signup")}
                                    />
                                    <Button
                                        label="Login"
                                        className="border-none rounded-lg !bg-blue-600 hover:!shadow-2xl"
                                        onClick={() => setAuthPage("login")}
                                    />
                                </div>
                            )}
                        </MenuCard>
                    ) : null}
                </div>
            </Container>
        </>
    );
}
