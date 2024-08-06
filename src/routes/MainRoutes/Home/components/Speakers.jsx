import React, { useEffect, useState } from "react";
import speaker from "../../../../assets/icons/speaker.png";

import { useNavigate } from "react-router-dom";
import { H2, H5 } from "../../../../components/Typography";
import { Container } from "../../../../components/UI/Container";

import { getAPI } from "../../../../utils/api";
import { speakersURL } from "../../../../utils/endpoints";

export default function Speakers() {
    let navigate = useNavigate();
    const [state, setState] = useState({
        speakersData: [],
        speakerLoading: false,
    });

    useEffect(() => {
        setState((prev) => {
            return { ...prev, speakerLoading: true };
        });
        getAPI(speakersURL.LIST)
            .then((res) => {
                setState((prev) => {
                    return { ...prev, speakersData: res?.data?.data?.speakers };
                });
            })
            .finally(() => {
                setState((prev) => {
                    return { ...prev, speakerLoading: false };
                });
            });
    }, []);

    const { speakersData, speakerLoading } = state;

    return (
        <Container className="">
            <H2 className="!mb-16">Our Speakers</H2>

            <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3">
                {speakersData?.map((item) => (
                    <div key={item?._id} className="mb-16">
                        <div className="flex flex-col items-center gap-3 text-center">
                            <figure
                                className={`flex items-end justify-center w-56 h-52 !pt-10 [nth-child(3n-1):pb-2] cursor-pointer `}
                                //     ${
                                //     item?.id % 2
                                //         ? "!bg-secondary rounded-type1"
                                //         : "!bg-tertiary rounded-type2"
                                // }
                            >
                                <img
                                    src={item?.image}
                                    alt={item?.slug}
                                    className="w-80 !rounded-2xl hover:scale-105 transition-all duration-300"
                                    onClick={() =>
                                        navigate(
                                            `/speakers/details?name=${item?.slug}`,
                                            {
                                                state: { speaker: item?.slug },
                                            }
                                        )
                                    }
                                />
                            </figure>
                            <div>
                                <H5 className="text-xl font-axiSemiBold !text-black1">
                                    {item?.name}
                                </H5>
                                <p className="text-sm text-gray-500">
                                    {item?.designation ?? ""}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Container>
    );
}
