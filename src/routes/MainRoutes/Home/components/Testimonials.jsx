import React from "react";
import quote from "../../../../assets/icons/quote.svg";

import { testimonials } from "../dummy";
import { H2 } from "../../../../components/Typography";
import { Container } from "../../../../components/Container";

export default function Testimonials() {
    return (
        <Container className="text-center">
            <H2>Give our users a great experience</H2>
            <div className="grid lg:grid-cols-3 grid-cols-2 gap-8">
                {testimonials?.map((item) => (
                    <div
                        key={item?.id}
                        className="px-3.5 py-3 text-left rounded-2xl shadow-inner bg-gray-100 hover:scale-105 transition-all duration-500"
                    >
                        <img
                            src={quote}
                            alt="testimonial"
                            className="w-14 h-14"
                        />
                        <h5 className="text-[15px] font-axiMedium my-4 text-gray-600">
                            "{item?.review?.slice(0, 150)}..."
                        </h5>
                        <div className="flex gap-3 items-center ">
                            <img
                                src={item?.image}
                                alt="reviewer"
                                className="w-12 h-12"
                            />
                            <div>
                                <h6 className="font-axiSemiBold">
                                    {item?.userName}
                                </h6>
                                <p>{item?.designation ?? ""}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Container>
    );
}
