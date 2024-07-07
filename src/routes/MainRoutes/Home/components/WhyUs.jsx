import React, { useEffect, useState } from "react";
import reviewer from "../../../../assets/icons/reviewer.png";

import { whyUsIcons, whyUsColors } from "../../../../db/dummy";
import { Container, NoDataFound } from "../../../../components";
import { H2, H5, SubHeading } from "../../../../components/Typography";

import { getAPI } from "../../../../utils/api";
import { otherURL } from "../../../../utils/endpoints";

export default function WhyUs() {
    const [state, setState] = useState({ whyUsData: [], loading: false });
    useEffect(() => {
        setState((prev) => {
            return { ...prev, loading: true };
        });
        getAPI(otherURL?.WHY_US)
            .then((res) => {
                setState((prev) => {
                    return { ...prev, whyUsData: res?.data?.data?.why_us };
                });
            })
            .finally(() => {
                setState((prev) => {
                    return { ...prev, loading: false };
                });
            });
    }, []);

    const { whyUsData, loading } = state;

    return (
        <Container>
            <H2>Why to choose us ?</H2>
            <SubHeading className="mb-16">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s
            </SubHeading>

            {loading ? (
                <div className="grid lg:grid-cols-3 grid-cols-1 gap-4"></div>
            ) : whyUsData?.length ? (
                <div className="grid lg:grid-cols-3 grid-cols-1 gap-x-12 gap-y-8">
                    {whyUsData?.map((item, i) => (
                        <div
                            key={item?._id}
                            className={`p-3 flex flex-col items-center text-center rounded-lg transition-all duration-500 hover:scale-105 shadow-md bg-gray-100 ${
                                "" // whyUsColors[i % whyUsColors?.length]
                            }`}
                        >
                            <img
                                src={whyUsIcons[i % whyUsIcons?.length]}
                                alt={item?.label}
                                className="size-10 mb-4"
                            />
                            <h3 className="text-xl font-axiSemiBold mb-2 text-black">
                                {item?.label}
                            </h3>
                            <h5
                                className="text-[15px] font-axiMedium !text-gray-400"
                                dangerouslySetInnerHTML={{ __html: item?.desc }}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <NoDataFound label="No data available" />
            )}
        </Container>
    );
}
