import React from "react";

import { H3, H5 } from "../../../components/Typography";
import { Button } from "../../../components/UI/Button";
import PaymentGateways from "./PaymentGateways";

export default function CartSummary(props) {
    const { cartData } = props;
    return (
        <section className="flex flex-col gap-3">
            <div className="border border-gray-800 rounded bg-bgHero p-2">
                <H3 className="text-tertiary">Cart Summary</H3>
                <hr className="border-gray-600" />
                <div className="my-4">
                    {cartData?.summary?.map((item, i) => (
                        <span key={i} className="flex justify-between mt-3">
                            <H5>{item?.label}</H5>
                            <H5>{item?.value}</H5>
                        </span>
                    ))}
                </div>
            </div>
            <PaymentGateways
                paymentGateways={cartData?.payment_gateways}
                currentGateway={cartData?.gateway}
            />
            <Button
                label="Place Order"
                className="!rounded-2xl border-none !bg-tertiary"
            />
        </section>
    );
}
