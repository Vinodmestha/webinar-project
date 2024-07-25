import React from "react";

import { H4, H5 } from "../../../components/Typography";
import { Button } from "../../../components/UI/Button";
import PaymentGateways from "./PaymentGateways";
import Coupons from "./Coupons";

export default function CartSummary(props) {
    const { cartData } = props;
    return (
        <section className="flex flex-col gap-3">
            <div className="border border-gray-200 rounded bg-gray-50 p-2">
                <H4>Cart Summary</H4>
                <hr className="border-gray-400" />
                <div className="my-4">
                    {/* <Coupons /> */}
                    {cartData?.summary?.map((item, i) => (
                        <span
                            key={i}
                            className="flex justify-between mt-2 *:!text-black *:text-base"
                        >
                            <H5>{item?.label}</H5>
                            <H5>{item?.value}</H5>
                        </span>
                    ))}
                    <hr className="border-gray-300" />
                    <span className="flex justify-between mt-2 *:!text-green-500 *:font-semibold *:text-base">
                        <H4>{"Grand Total"}</H4>
                        <H4>${cartData?.grand_total}</H4>
                    </span>
                </div>
            </div>
            <PaymentGateways
                paymentGateways={cartData?.payment_gateways}
                currentGateway={cartData?.gateway}
            />
            {cartData?.gateway?.slug === "paypal" ? null : (
                <Button
                    label="Place Order"
                    className="!rounded-2xl border-none !bg-tertiary"
                />
            )}
        </section>
    );
}
