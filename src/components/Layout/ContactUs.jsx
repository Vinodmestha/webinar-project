import React from "react";
import contactBg from "../../assets/images/contactBg.webp";

import { Input } from "../Input";
import { Button } from "../UI/Button";
import { H2, H5, Mail, SubHeading, Telephone } from "../Typography";
import { Container } from "../UI/Container";

export default function ContactUs() {
    return (
        <section className="relative z-[1] sm:py-10 xl:px-8 md:px-6 px-3">
            <div className="hidden sm:block">
                <img
                    src={contactBg}
                    alt="icon"
                    className="absolute -z-[1] bottom-0 left-0 right-0 w-full"
                />
            </div>
            <Container className="md:flex  py-0 sm:!py-10">
                <div className="mx-3 md:w-1/2 my-10 ">
                    <SubHeading className="!text-left">
                        Get In Touch with us !
                    </SubHeading>
                    <H2 className="mt-1 sm:!leading-[3.5rem] !items-start">
                        Let's Work Together
                    </H2>
                    <H5 className="mb-4">
                        Just tell us your requirements, and we will assist you!
                    </H5>
                    <div className="flex flex-col gap-1 !text-gray-600">
                        <Telephone className="!text-2xl">
                            +91 6354917511
                        </Telephone>
                        <Mail>ggcs@globalgarner.com</Mail>
                    </div>
                    <div className="mt-5">
                        <Button
                            label=" Call Us Now"
                            className="border-2 rounded-full border-primaryBtn !text-white !bg-primaryBtn bg-0"
                            // onClick={}
                        >
                            <a
                                href="tel:+91 6354917511"
                                data-rel="external"
                            ></a>
                        </Button>
                    </div>
                </div>
                <div className="px-3 py-10 mx-3 bg-white md:w-1/2 rounded-3xl sm:px-6 md:px-10 before:bg-homeGradient before:-top-4 before:left-0 before:absolute shadow-services ">
                    <div className="flex flex-wrap ">
                        <div className="w-full px-3 my-2 sm:w-1/2">
                            <Input placeholder="Fill Name " type="mail" />
                        </div>
                        <div className="w-full px-3 my-2 sm:w-1/2">
                            <Input placeholder="Email Address" type="mail" />
                        </div>
                        <div className="w-full px-3 my-2 sm:w-1/2">
                            <Input placeholder="Phone Number" type="mail" />
                        </div>
                        <div className="w-full px-3 my-2 sm:w-1/2">
                            <Input placeholder="Website" type="mail" />
                        </div>
                        <textarea
                            name=""
                            placeholder="Message"
                            id=""
                            cols="30"
                            rows="10"
                            className="w-full border-[1px] border-gray-200 relative rounded-xl  mx-4 h-40 px-5 my-3 outline-none  bg-gray-100"
                        />
                    </div>
                    <div className="w-full mx-4 mt-3">
                        <Button
                            className="!text-white  border-none !bg-primaryBtn"
                            label="Send Message"
                        ></Button>
                    </div>
                </div>
            </Container>
        </section>
    );
}
