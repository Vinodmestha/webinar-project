import React, { useEffect, useState } from "react";
import webinarDummy from "../../../assets/home/webinarDummy.jpg";
import { minus, plus } from "../../../assets";

import { Container } from "../../../components/UI/Container";
import CartSummary from "./CartSummary";
import { getAPI, postAPI } from "../../../utils/api";
import { cartURL, orderURL } from "../../../utils/endpoints";
import { H3, H4 } from "../../../components/Typography";
import Paypal from "../../../Payments/Paypal";
import NoDataFound from "../../../components/UI/NoDataFound";
import DotedLoader from "../../../components/UI/loaders/DotedLoader";

const IconButton = (props) => {
    return props?.loading ? (
        <div className=" border-2 border-tertiary px-[1px] py-2 rounded-full">
            <DotedLoader fill="#C49102" />
        </div>
    ) : (
        <button onClick={props?.onClick}>
            <img src={props?.icon} alt={props?.value} className="size-10" />
        </button>
    );
};
export default function Cart(props) {
    const [state, setState] = useState({
        cartData: {},
        paymentPage: false,
        itemLoaders: {},
    });

    useEffect(() => {
        getAPI(cartURL?.CART_SUMMARY).then((res) => {
            setState((prev) => {
                return { ...prev, cartData: res?.data?.data?.cart_details };
            });
        });
    }, []);

    const { cartData, itemLoaders } = state;

    const updateItems = (id, type = "", quantity) => {
        setState((prev) => {
            return {
                ...prev,
                itemLoaders: {
                    ...prev?.itemLoaders,
                    [id]: type,
                    // {...prev?.itemLoaders[id],loader:!prev?.itemLoaders[id],type:type},
                },
            };
        });

        updateHandler(id, quantity);
    };

    const updateHandler = (id, quantity) => {
        postAPI(cartURL?.UPDATE_CART, {
            cart_id: cartData?.cart_id,
            item_id: id,
            quantity: quantity,
        })
            .then((res) => {
                setState((prev) => {
                    return {
                        ...prev,
                        cartData: res?.data?.data?.cart_details,
                    };
                });
            })
            .finally(() => {
                setState((prev) => {
                    return {
                        ...prev,
                        itemLoaders: {
                            ...prev?.itemLoaders,
                            [id]: "",
                        },
                    };
                });
            });
    };

    const placeOrder = (id) => {
        console.log(id);

        postAPI(orderURL?.CREATE_ORDER, { cart_id: id }).then((res) => {
            console.log(res);
        });
    };

    return (
        <Container className="py-0 sm:!py-10">
            {Object.keys(cartData)?.length ? (
                <div className="grid grid-cols-[1fr_0.65fr] gap-4">
                    <section className="w-full p-4 border border-gray-800 rounded flex flex-col gap-5">
                        {cartData?.items?.map((item, i) => (
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
                                            <IconButton
                                                icon={minus}
                                                value="-"
                                                loading={
                                                    itemLoaders[item?._id] ===
                                                    "dec"
                                                }
                                                onClick={() =>
                                                    updateItems(
                                                        item?._id,
                                                        "dec",
                                                        item?.quantity - 1
                                                    )
                                                }
                                            />
                                            <button
                                                disabled
                                                className="text-2xl font-semibold"
                                            >
                                                {item?.quantity}
                                            </button>
                                            <IconButton
                                                icon={plus}
                                                value="+"
                                                loading={
                                                    itemLoaders[item?._id] ===
                                                    "inc"
                                                }
                                                onClick={() =>
                                                    updateItems(
                                                        item?._id,
                                                        "inc",
                                                        item?.quantity + 1
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                                <hr
                                    className={`${
                                        cartData?.items?.length === i + 1
                                            ? "hidden"
                                            : ""
                                    } border-gray-700`}
                                />
                            </>
                        ))}
                    </section>
                    <section>
                        <CartSummary cartData={cartData} />
                        <Paypal placeOrder={placeOrder} cartData={cartData} />
                    </section>
                </div>
            ) : (
                <NoDataFound label="Cart is empty" imageSize="size-[400px]" />
            )}
        </Container>
    );
}
