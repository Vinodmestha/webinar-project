import React, { useEffect, useState } from "react";
import reviewer from "../../../../assets/icons/reviewer.png";

import { Container } from "../../../../components/UI/Container";
import { H2, H5, SubHeading } from "../../../../components/Typography";

import { getAPI } from "../../../../utils/api";
import { otherURL } from "../../../../utils/endpoints";
import NoDataFound from "../../../../components/UI/NoDataFound";

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
                <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
                    {whyUsData?.map((item) => (
                        <div
                            key={item?._id}
                            className="p-3 flex flex-col items-center text-center rounded-lg transition-all duration-200 hover:scale-105 bg-bgHero"
                        >
                            <img
                                src={reviewer}
                                alt={item?.label}
                                className="w-12 h-12 mb-4"
                            />
                            <h3 className="text-2xl font-axiSemiBold mb-2 text-tertiary">
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
