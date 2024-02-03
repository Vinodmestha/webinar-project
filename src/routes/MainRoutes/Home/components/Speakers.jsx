import React from "react";

import { useNavigate } from "react-router-dom";

import { speakers } from "../dummy";
import { H2, H5 } from "../../../../components/Typography";
import { Container } from "../../../../components/UI/Container";

export default function Speakers() {
    let navigate = useNavigate();
    return (
        <Container className="">
            <H2 className="!mb-16">Our Speakers</H2>

            <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3">
                {speakers?.map((item) => (
                    <div key={item?.id} className="mb-16">
                        <div className="flex flex-col items-center gap-3 text-center">
                            <figure
                                className={`flex items-end justify-center w-56 h-52 !pt-10 [nth-child(3n-1):pb-2] cursor-pointer ${
                                    item?.id % 2
                                        ? "!bg-secondary rounded-type1"
                                        : "!bg-tertiary rounded-type2"
                                }`}
                                onClick={() =>
                                    navigate(`/speakers?name=${item?.slug}`)
                                }
                            >
                                <img
                                    src={item?.image}
                                    alt={item?.name}
                                    className="w-80 !rounded-2xl"
                                />
                            </figure>
                            <div>
                                <H5 className="text-xl font-axiSemiBold !text-white">
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
