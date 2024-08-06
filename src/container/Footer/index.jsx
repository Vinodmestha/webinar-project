import React from "react";
import { logo } from "../../assets";

import { Link } from "react-router-dom";

import { RedirectionButton } from "../../components/UI/Button";
import { Container } from "../../components/UI/Container";
import {
    socialIcons,
    footerPolicies,
    footerServices,
    footerAbout,
    footerHelp,
} from "../../db/dummy";
import { H4, H5 } from "../../components/Typography";

const Footer = (props) => {
    console.log(props);
    return (
        <div className="bg-[#1d2636]">
            <Container className="flex flex-col lg:grid lg:grid-cols-2 justify-between  gap-4 lg:py-20 lg:px-5">
                <div className="flex lg:flex-col gap-6 items-start lg:px-5">
                    <figure>
                        <img
                            src={logo}
                            alt="webinar"
                            className="w-24 cursor-pointer"
                            // onClick={() => navigate("/")}
                        />
                    </figure>
                    <h2 className="text-[22px] lg:text-4xl font-semibold lg:leading-[3rem] text-white">
                        Empowering learning <br />
                        through live webinars
                    </h2>
                    {/* <RedirectionButton
                        label=" Download Webinar Now"
                        redirectLink="/"
                    /> */}
                </div>
                <hr className="lg:hidden opacity-35" />
                <div className="flex flex-row justify-around lg:gap-28">
                    <div className="flex flex-col gap-2.5">
                        <H4>Webinars</H4>
                        {footerServices?.map((item) => (
                            <Link
                                key={item?.id}
                                to={`webinars?type=${item?.slug}`}
                                className="font-medium text-gray-400"
                            >
                                {item?.label}
                            </Link>
                        ))}
                    </div>
                    <div className="hidden lg:flex flex-col gap-2.5">
                        <H4>Information</H4>
                        {footerAbout?.map((item) => (
                            <Link
                                key={item?.id}
                                to={item?.slug}
                                className="font-medium text-gray-400"
                            >
                                {item?.label}
                            </Link>
                        ))}
                    </div>
                    <div className="flex flex-col lg:hidden gap-2.5">
                        <H4>Disclaimers</H4>
                        {footerPolicies?.map((item) => (
                            <Link
                                key={item?.id}
                                to={item?.slug}
                                className="font-medium text-gray-400"
                            >
                                {item?.label}
                            </Link>
                        ))}
                    </div>
                    {/* <div className="flex flex-col gap-2.5">
                        <H4>Help</H4>
                        {footerHelp?.map((item) => (
                            <Link
                                key={item?.id}
                                to={item?.slug}
                                className="font-medium text-gray-400"
                            >
                                {item?.label}
                            </Link>
                        ))}
                    </div> */}
                </div>
            </Container>
            <section className="lg:p-5 !text-white bg-black">
                <Container className="flex flex-col lg:flex-row items-center justify-between py-4 lg:py-0">
                    <div className="flex flex-col lg:flex-row gap-5 lg:gap-20 mb-5 lg:mb-0">
                        <div className="flex justify-center gap-5">
                            {socialIcons?.map((item) => (
                                <img
                                    key={item?.id}
                                    src={item?.icon}
                                    className="w-7 h-7"
                                    onClick={() => {}}
                                />
                            ))}
                        </div>
                        <div className="hidden lg:flex items-center lg:gap-10">
                            {footerPolicies?.map((item) => (
                                <Link key={item?.id} to={item?.slug}>
                                    {item?.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <p>&copy; US - CPE All rights reserved </p>
                </Container>
            </section>
        </div>
    );
};
export default Footer;
