import React from "react";

import { whyUs } from "../dummy";
import { Container } from "../../../../components/UI/Container";
import { H2, H5, SubHeading } from "../../../../components/Typography";

export default function WhyUs() {
    return (
        <Container>
            <H2>Why to choose us ?</H2>
            <SubHeading className="mb-16">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s
            </SubHeading>
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
                {whyUs?.map((item) => (
                    <div
                        key={item?.id}
                        className="p-3 flex flex-col items-center text-center rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-105 bg-secondary"
                    >
                        <img
                            src={item?.image}
                            alt={item?.label}
                            className="w-12 h-12 mb-4"
                        />
                        <h3 className="text-2xl font-axiSemiBold mb-2 text-tertiary">
                            {item?.label}
                        </h3>
                        <H5 className="!text-gray-400">{item?.desc}</H5>
                    </div>
                ))}
            </div>
        </Container>
    );
}
