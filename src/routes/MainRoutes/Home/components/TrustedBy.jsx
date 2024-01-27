import React from "react";
import brand from "../../../../assets/icons/brand.svg";

import { Container } from "../../../../components/Container";

export default function TrustedBy() {
    return (
        <Container className="text-center">
            <h4 className="text-2xl mb-10 text-gray-600">
                Trusted by nearly 5000+ users
            </h4>
            <div className="grid grid-cols-6 items-center gap-5">
                {new Array(6)?.fill("_")?.map((item, i) => (
                    <img
                        key={i}
                        src={brand}
                        alt="brands"
                        className="w-36 h-32 grayscale-[50%]"
                    />
                ))}
            </div>
        </Container>
    );
}
