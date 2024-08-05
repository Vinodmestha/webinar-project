import React from "react";
import SuccessGIF from "../../assets/extras/success.gif";

import { Button } from "@material-tailwind/react";
import { useNavigate, useLocation } from "react-router-dom";

import { Container } from "../UI";
import { CustomP, H3, H4, SubHeading } from "../Typography";

export default function ResultPages(props) {
    const navigate = useNavigate(),
        location = useLocation();
    // console.log(location?.state);

    const result = location?.state?.resultData;
    const summary = {
        "Base Amount": result?.payment_details?.summary?.net_amount?.value,
        "Payment Gateway fees":
            result?.payment_details?.summary?.paypal_fee?.value,
        "Grand Total": result?.payment_details?.summary?.gross_amount?.value,
    };
    return (
        <Container className="flex flex-col items-center">
            <img src={SuccessGIF} alt="success" className="size-36" />
            <H3 className="!text-3xl flex gap-2 !my-5">
                <p className="text-green-500">Your Order is Successful.</p>Thank
                you for Ordering
            </H3>
            <section className="flex flex-col items-center w-1/2">
                <SubHeading>Order Details</SubHeading>
                <div className="flex flex-col gap-2 w-full p-3 rounded-xl border border-gray-200 shadow-md my-5">
                    <div className="flex justify-between">
                        <CustomP className="text-gray-600">Order ID</CustomP>
                        <H4>{result?.order_id}</H4>
                    </div>
                    <hr />
                    {/* {Object.keys(result?.payment_details?.summary)?.map( */}
                    {Object.keys(summary)?.map((item) => (
                        <div className="flex justify-between">
                            <CustomP className="text-gray-600">{item}</CustomP>
                            <H4>${summary[item]}</H4>
                        </div>
                    ))}
                </div>
                <Button
                    size="lg"
                    className="bg-primaryBtn"
                    onClick={() => navigate("/")}
                >
                    Continue Shopping
                </Button>
            </section>
        </Container>
    );
}
