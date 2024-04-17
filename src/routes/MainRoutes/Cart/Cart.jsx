import React, { useEffect, useState } from "react";
import webinarDummy from "../../../assets/home/webinarDummy.jpg";

import { Container } from "../../../components/UI/Container";
import CartSummary from "./CartSummary";
import { getAPI } from "../../../utils/api";
import { cartURL } from "../../../utils/endpoints";
import { H3, H4 } from "../../../components/Typography";

export default function Cart(props) {
    const [state, setState] = useState({ cartData: {} });

    useEffect(() => {
        getAPI(cartURL?.CART_SUMMARY).then((res) => {
            setState((prev) => {
                return { ...prev, cartData: res?.data?.data?.cart_details };
            });
        });
    }, []);

    const { cartData } = state;
    // console.log(cartData);

    return (
        <Container className="py-0 sm:!py-10">
            <div className="grid grid-cols-[1fr_0.6fr] gap-4">
                <section className="w-full p-4 border border-gray-800 rounded flex flex-col gap-5">
                    {cartData?.items?.map((item) => (
                        <div key={item?._id} className="flex gap-3 rounded p-2">
                            <figure className="bg-gray-400">
                                <img
                                    src={webinarDummy}
                                    alt={item?.slug}
                                    className="size-40 rounded"
                                />
                            </figure>
                            <H3 className="capitalize">{item?.title}</H3>
                        </div>
                    ))}
                </section>
                <CartSummary cartData={cartData} />
            </div>
        </Container>
    );
}
