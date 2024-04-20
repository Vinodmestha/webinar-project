import React, { useEffect, useState } from "react";
import webinarDummy from "../../../assets/home/webinarDummy.jpg";
import { minus, plus } from "../../../assets";

import { Container } from "../../../components/UI/Container";
import CartSummary from "./CartSummary";
import { getAPI } from "../../../utils/api";
import { cartURL } from "../../../utils/endpoints";
import { H3, H4 } from "../../../components/Typography";
import Paypal from "../../../Payments/Paypal";

export default function Cart(props) {
    const [state, setState] = useState({ cartData: {}, paymentPage: false });

    useEffect(() => {
        getAPI(cartURL?.CART_SUMMARY).then((res) => {
            setState((prev) => {
                return { ...prev, cartData: res?.data?.data?.cart_details };
            });
        });
    }, []);

    const { cartData } = state;
    console.log(cartData);

    const placeOrder = (id) => {
        console.log(id);
    };
    return (
        <Container className="py-0 sm:!py-10">
            <div className="grid grid-cols-[1fr_0.65fr] gap-4">
                <section className="w-full p-4 border border-gray-800 rounded flex flex-col gap-5">
                    {cartData?.items?.map((item) => (
                        <>
                            <div
                                key={item?._id}
                                className="flex justify-between gap-5 rounded p-2"
                            >
                                <figure className="bg-gray-400">
                                    <img
                                        src={webinarDummy}
                                        alt={item?.slug}
                                        className="size-32 rounded"
                                    />
                                </figure>
                                <div className="w-full flex flex-col items-start">
                                    <H3 className="capitalize">
                                        {item?.title}
                                    </H3>
                                </div>
                                <div className="flex flex-col items-center justify-center gap-4">
                                    <H3>${item?.price}</H3>
                                    <div className="flex items-center justify-between gap-4">
                                        <button>
                                            <img
                                                src={minus}
                                                alt="-"
                                                className="size-10"
                                            />
                                        </button>
                                        <button
                                            disabled
                                            className="text-2xl font-semibold"
                                        >
                                            {item?.quantity}
                                        </button>
                                        <button>
                                            <img
                                                src={plus}
                                                alt="+"
                                                className="size-8"
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <hr className="border-gray-700" />
                        </>
                    ))}
                </section>
                <section>
                    <CartSummary cartData={cartData} />
                    <Paypal placeOrder={placeOrder} cartData={cartData} />
                </section>
            </div>
        </Container>
    );
}
