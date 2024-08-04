import React from "react";
import { paypalIcon } from "../../../assets";

import { H4, H5 } from "../../../components/Typography";

export default function PaymentGateways({ paymentGateways, currentGateway }) {
    return (
        <div className="border border-gray-300 rounded bg-bgHero p-2">
            <H4>Payment methods</H4>
            <hr className="border-gray-600" />
            {paymentGateways?.map((item) => (
                <div className="flex items-center gap-2 mt-4" key={item?._id}>
                    <input
                        type="radio"
                        className="!rounded-lg size-5"
                        value={item?._id}
                        defaultChecked={currentGateway?._id}
                    />
                    <span className="flex items-center gap-2 *:!text-black font-semibold">
                        <img src={paypalIcon} className="w-8" />
                        <H5>{item?.label}</H5>
                    </span>
                </div>
            ))}
        </div>
    );
}
