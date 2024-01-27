import React from "react";

import { whyUs } from "../dummy";
import { Container } from "../../../../components/Container";
import { H2, H5, SubHeading } from "../../../../components/Typography";

export default function WhyUs() {
    return (
        <Container>
            <H2>Why to choose us ?</H2>
            <SubHeading className="mb-20">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s
            </SubHeading>
            <div className="grid lg:grid-cols-3 grid-cols-1 ">
                {whyUs?.map((item) => (
                    <div
                        key={item?.id}
                        className="p-3 flex flex-col items-center text-center border-2 transition-all bg-[rgba(229_231_235_0.5)] duration-200 hover:shadow-lg hover:scale-105 bg-[#F2F1FD]"
                    >
                        <img
                            src={item?.image}
                            alt={item?.label}
                            className="w-12 h-12 mb-4"
                        />
                        <h3 className="text-xl font-axiSemiBold">
                            {item?.label}
                        </h3>
                        <H5>{item?.desc}</H5>
                    </div>
                ))}
            </div>
        </Container>
    );
}
