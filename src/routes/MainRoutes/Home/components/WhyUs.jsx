import React from "react";

import { whyUs } from "../dummy";
import { H2, H5 } from "../../../../components/Typography";
import { Container } from "../../../../components/Container";

export default function WhyUs() {
    return (
        <Container>
            <H2>Why to choose us ?</H2>
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-10">
                {whyUs?.map((item) => (
                    <div
                        key={item?.id}
                        className="p-3 flex flex-col items-center text-center transition-all bg-[rgba(229_231_235_0.5)] duration-200 rounded-xl hover:shadow-lg hover:scale-105 bg-[#F2F1FD]"
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
