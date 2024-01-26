import React from "react";
import webinarDummy from "../../../../assets/home/webinarDummy.jpg";

import { H2, H5 } from "../../../../components/Typography";
import { Container } from "../../../../components/Container";

export default function Webinars() {
    return (
        <Container>
            <H2 className="!mb-10">Our Latest Webinars</H2>

            <div className="flex items-center justify-center mb-10">
                {["Category 1", "Category 2", "Category 3", "Category 4"]?.map(
                    (item) => (
                        <h4 className="font-axiMedium mx-7 px-4 py-2 rounded-full cursor-pointer bg-gray-100 hover:text-white transition-all duration-100 hover:bg-tertiary ">
                            {item}
                        </h4>
                    )
                )}
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
                {new Array(6)?.fill("_")?.map((item, i) => (
                    <div key={i} className="rounded-xl overflow-hidden">
                        <img
                            src={webinarDummy}
                            className="w-96 h-full rounded-xl "
                        />
                    </div>
                ))}
            </div>
        </Container>
    );
}
