import React from "react";
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
    return (
        <div className="bg-bgHero">
            <Container className="grid grid-cols-2 justify-between lg:py-20 lg:px-5">
                <div className="flex flex-col gap-6 items-start lg:px-5 ">
                    <h2 className="text-4xl font-semibold leading-[3rem] text-white">
                        Empowering learning <br />
                        through live webinars
                    </h2>
                    <RedirectionButton
                        label=" Download Webinar Now"
                        redirectLink="/"
                    />
                </div>
                <div className="flex justify-end lg:gap-28">
                    <div className="flex flex-col gap-2.5">
                        <H4>Services</H4>
                        {footerServices?.map((item) => (
                            <Link
                                key={item?.id}
                                to={item?.slug}
                                className="font-medium text-gray-400"
                            >
                                {item?.label}
                            </Link>
                        ))}
                    </div>
                    <div className="flex flex-col gap-2.5">
                        <H4>About</H4>
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
                    <div className="flex flex-col gap-2.5">
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
                    </div>
                </div>
            </Container>
            <section className="lg:p-5 !text-white bg-black">
                <Container className="flex items-center justify-between !py-0">
                    <div className="flex lg:gap-20">
                        <div className="flex gap-5">
                            {socialIcons?.map((item) => (
                                <img
                                    key={item?.id}
                                    src={item?.icon}
                                    className="w-7 h-7"
                                    onClick={() => {}}
                                />
                            ))}
                        </div>
                        <div className="flex items-center lg:gap-10">
                            {footerPolicies?.map((item) => (
                                <Link key={item?.id} to={item?.slug}>
                                    {item?.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <p>&copy; Webinar All rights reserved </p>
                </Container>
            </section>
        </div>
    );
};
export default Footer;
