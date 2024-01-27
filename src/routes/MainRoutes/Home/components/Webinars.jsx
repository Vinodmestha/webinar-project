import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { webinarsData } from "../dummy";
import { Container } from "../../../../components/UI/Container";
import { H2, H5, SubHeading } from "../../../../components/Typography";

export default function Webinars() {
    const [state, setState] = useState({ currentMode: "", data: [] });

    let navigate = useNavigate();

    useEffect(() => {
        webinarDataHandler(webinarsData[0]?.categorySlug);
    }, []);

    const webinarDataHandler = (type) => {
        console.log(type);
        let data = webinarsData?.filter((item) => {
            return item?.categorySlug === type;
        });
        setState((prev) => {
            return { ...prev, currentMode: type, data: data[0]?.data };
        });
    };

    return (
        <Container>
            <H2 className="">Our Latest Webinars</H2>
            <SubHeading className="mb-20">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s
            </SubHeading>

            <div className="flex items-center justify-center mb-10">
                {webinarsData?.map((item) => (
                    <h4
                        key={item?.id}
                        className={`font-axiMedium mx-7 px-4 py-2 rounded-full cursor-pointer ${
                            item?.categorySlug === state?.currentMode
                                ? "!bg-tertiary text-white"
                                : "bg-gray-100"
                        } transition-all duration-100 hover:bg-pink-100`}
                        onClick={() => webinarDataHandler(item?.categorySlug)}
                    >
                        {item?.categoryType}
                    </h4>
                ))}
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
                {state?.data?.map((item) => (
                    <div
                        key={item?.id}
                        className="relative w-full h-full rounded-xl overflow-hidden group bg-black z-[10]"
                    >
                        <img
                            src={item?.image}
                            alt={item?.label}
                            className="!w-full !h-full object-cover opacity-70 group-hover:opacity-20 z-[5]"
                        />
                        <div className="absolute bottom-3 left-8 right-10 group-hover:animate-fadeUp flex flex-col justify-center items-center text-center text-white">
                            <h4 className="font-axiSemiBold text-[26px]">
                                {item?.label}
                            </h4>
                            <div className="hidden group-hover:block">
                                <H5 className="text-[16px] text-grey2 mb-10 text-white">
                                    {item?.desc?.slice(0, 100)}...
                                </H5>
                                <p
                                    className="font-semibold text-blue1 cursor-pointer hover:text-[rgb(92,152,242/0.6)]"
                                    onClick={() =>
                                        navigate(
                                            `/webinars?type=${state?.currentMode}`,
                                            {
                                                state: {
                                                    name: state?.currentMode,
                                                },
                                            }
                                        )
                                    }
                                >
                                    View Details
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Container>
    );
}
