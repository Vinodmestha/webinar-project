import React, { useContext, useEffect, useRef, useState } from "react";
import { logo, cartIcon, webinarDummy, avatar, logout } from "../../assets";
import userIcon from "../../assets/icons/user.svg";

import {
    Popover,
    PopoverHandler,
    PopoverContent,
} from "@material-tailwind/react";

import { useLocation, useNavigate } from "react-router-dom";

import { navMenu } from "../../db/dummy";
import { H1, H4 } from "../../components/Typography";
import {
    Button,
    MenuCard,
    Container,
    NoDataFound,
    DotedLoader,
} from "../../components/UI";

import Auth from "../../auth";
import { UserContext } from "../../store/UserContext";
import useTypes from "../../utils/helpers/useTypes";
import useLogout from "../../utils/helpers/useLogout";
import useCartCount from "../../utils/helpers/useCartCount";
import useClickOutside from "../../utils/helpers/useClickOutside";

export default function NavbarContent(props) {
    const { userInfo, isLoggedIn, authModal, authPage, setAuthPage } =
        useContext(UserContext);

    const [state, setState] = useState({
        menuChild: false,
        childData: {},
        profileMenu: false,
    });
    const navigate = useNavigate(),
        location = useLocation(),
        webinarRef = useRef();
    let pathname = location?.pathname?.replace("/", "");

    // console.log(userInfo, isLoggedIn);

    const menuChildHandler = (v) => {
        setState((prev) => {
            return {
                ...prev,
                menuChild: v,
            };
        });
    };
    const profileMenuHandler = (v) => {
        setState((prev) => {
            return {
                ...prev,
                profileMenu: v,
            };
        });
    };

    useClickOutside(webinarRef, menuChildHandler);

    const { typesData, typesLoading } = useTypes();
    const { logoutHandler, logoutLoading } = useLogout();

    const { cartCount, cartCountHandler } = useCartCount();
    let count = localStorage.getItem("cart-count");
    useEffect(() => {
        cartCountHandler();
    }, [count]);

    const navLinks = [
        { id: 1, label: "About Us", slug: "about" },
        {
            id: 2,
            label: "Webinars",
            slug: "webinars",
            ref: webinarRef,
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
        "flex items-center gap-3 text-[15px] cursor-pointer hover:bg-gray-300 rounded-lg p-2 my-1";

    const { menuChild, childData } = state;

    return (
        <header className="">
            <Container className="relative border-b shadow-lg rounded-b-3xl border-gray-200 h-full !p-2.5 !my-0 flex items-center justify-between">
                {/* <figure>
                    <img
                        src={logo}
                        alt="webinar"
                        className="w-40 h-16 cursor-pointer"
                        onClick={() => navigate("/")}
                    />
                </figure> */}
                <H1 className="!text-3xl">US CPE</H1>

                <ul className="flex items-center h-full justify-center gap-16 text-lg font-semibold">
                    {navLinks?.map((item) => (
                        <li
                            key={item?.id}
                            onClick={() =>
                                item?.child
                                    ? (() => {
                                          setState((prev) => {
                                              return {
                                                  ...prev,
                                                  childData: item?.child,
                                              };
                                          });
                                          menuChildHandler(!!item?.child);
                                      })()
                                    : navigate(item?.slug)
                            }
                            ref={item?.ref}
                            className={`cursor-pointer ${
                                pathname === item?.slug
                                    ? "text-tertiary"
                                    : "text-gray-500"
                            } hover:text-tertiary`}
                        >
                            {item?.label}
                        </li>
                    ))}
                    {menuChild && childData ? (
                        <MenuCard className="top-24 !p-3">
                            <div ref={childData?.ref}>
                                {childData?.loading ? (
                                    <div className="grid lg:grid-cols-2 grid-col-2 gap-5">
                                        {new Array(4)?.fill("")?.map((v, i) => (
                                            <div
                                                className="animate-pulse bg-gray-800 h-60 rounded-lg"
                                                key={i}
                                            />
                                        ))}
                                    </div>
                                ) : childData?.data?.length ? (
                                    <ul className="grid lg:grid-cols-2 grid-col-2 gap-5 justify-center text-center text-base font-medium">
                                        {childData?.data?.map((item) => (
                                            <li
                                                key={item?._id}
                                                className="flex items-center gap-3 p-2 rounded-lg transition-all duration-200 cursor-pointer text-tertiary bg-gray-200 hover:bg-gray-300"
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
                                                    src={webinarDummy}
                                                    alt={item?.slug}
                                                    className="size-14 mb-2 rounded-lg"
                                                />
                                                <p className="font-semibold">
                                                    {item?.label}
                                                </p>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <NoDataFound />
                                )}
                            </div>
                        </MenuCard>
                    ) : null}
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

                    <Popover
                        placement="bottom"
                        animate={{
                            mount: { scale: 1, x: -110, y: 20 },
                            unmount: { scale: 0, x: 0, y: 0 },
                        }}
                        open={state.profileMenu}
                        handler={profileMenuHandler}
                    >
                        <PopoverHandler>
                            <img
                                src={userIcon}
                                alt="user"
                                className="w-12 h-12 border-2 border-gray-300 rounded-full cursor-pointer"
                                onClick={() => profileMenuHandler(true)}
                            />
                        </PopoverHandler>
                        <PopoverContent className="w-72">
                            {isLoggedIn || userInfo?.data?.token ? (
                                <div className="text-black">
                                    <div
                                        className={`flex items-center gap-2 p-2 capitalize`}
                                    >
                                        <img
                                            src={avatar}
                                            alt="profile"
                                            className="size-14"
                                        />
                                        <div>
                                            <H4>{userInfo?.data?.name}</H4>
                                            <p className="text-gray-600">
                                                {userInfo?.data?.email}
                                            </p>
                                        </div>
                                    </div>
                                    <hr />
                                    <ul>
                                        {navMenu?.map((item, i) => (
                                            <li
                                                key={item?.id}
                                                className={`${menuListStyles}`}
                                                onClick={() => {
                                                    navigate(item?.slug);
                                                    profileMenuHandler(false);
                                                }}
                                            >
                                                <img
                                                    src={item?.icon}
                                                    className="size-6"
                                                />
                                                <p>{item?.label}</p>
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
                                                    <DotedLoader fill="#000" />
                                                </div>
                                            ) : (
                                                <>
                                                    <img
                                                        src={logout}
                                                        className="size-6"
                                                    />
                                                    <p>Logout</p>
                                                </>
                                            )}
                                        </li>
                                    </ul>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-5 *:text-white">
                                    <Button
                                        label="Signup"
                                        className="border-none rounded-lg !bg-pink-600 hover:!shadow-2xl"
                                        onClick={() => {
                                            setAuthPage(true, "signup");
                                            profileMenuHandler(false);
                                        }}
                                    />
                                    <Button
                                        label="Login"
                                        className="border-none rounded-lg !bg-blue-600 hover:!shadow-2xl"
                                        onClick={() => {
                                            setAuthPage(true, "login");
                                            profileMenuHandler(false);
                                        }}
                                    />
                                </div>
                            )}
                        </PopoverContent>
                    </Popover>
                </div>
            </Container>
            <Auth />
        </header>
    );
}
