import React, { useEffect, useState } from "react";
import webinarDummy from "../../../assets/home/webinarDummy.jpg";
import { minus, plus } from "../../../assets";

import { Trash2 } from "lucide-react";
import { Button } from "@material-tailwind/react";
import { useLocation, useNavigate } from "react-router-dom";

import { H3, H4 } from "../../../components/Typography";
import CartSummary from "./CartSummary";
import {
    NoDataFound,
    IconButton,
    Container,
    DotedLoader,
} from "../../../components";

import { getAPI, postAPI } from "../../../utils/api";
import { cartURL, expressCartURL, orderURL } from "../../../utils/endpoints";
import Paypal from "../../../Payments/Paypal";

export default function Cart(props) {
    const navigate = useNavigate(),
        location = useLocation();
    const [state, setState] = useState({
        cartData: {},
        paymentPage: false,
        itemLoaders: { removeLoaders: {} },
    });

    let navigateData = location?.state;
    let expressCart = navigateData?.cartType === "express";
    console.log(expressCart);
    useEffect(() => {
        if (expressCart) {
            setState((prev) => {
                return { ...prev, cartData: navigateData?.cartData ?? {} };
            });
        } else {
            getAPI(cartURL?.CART_SUMMARY).then((res) => {
                setState((prev) => {
                    return {
                        ...prev,
                        cartData: res?.data?.data?.cart_details ?? {},
                    };
                });
            });
        }
    }, []);

    const { cartData, itemLoaders } = state;

    const updateItems = (id, index, type = "", quantity) => {
        setState((prev) => {
            return {
                ...prev,
                itemLoaders: {
                    ...prev?.itemLoaders,
                    [index]: type,
                    // {...prev?.itemLoaders[id],loader:!prev?.itemLoaders[id],type:type},
                },
            };
        });

        updateHandler(id, index, quantity);
    };

    const updateHandler = (id, i, quantity) => {
        let url = expressCart
            ? expressCartURL?.UPDATE_CART
            : cartURL?.UPDATE_CART;
        postAPI(url, {
            cart_id: cartData?.cart_id,
            _id: id,
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
                            [i]: "",
                        },
                    };
                });
            });
    };

    const removeItemHandler = (index, id) => {
        setState((prev) => {
            return {
                ...prev,
                itemLoaders: {
                    ...prev?.itemLoaders,
                    removeLoaders: {
                        ...prev?.itemLoaders?.removeLoaders,
                        [index]: true,
                    },
                },
            };
        });
        postAPI(cartURL?.REMOVE_ITEM, { _id: id })
            .then((res) => {
                setState((prev) => {
                    return {
                        ...prev,
                        cartData: res?.data?.data?.cart_details ?? {},
                    };
                });
            })
            .finally(() => {
                setState((prev) => {
                    return {
                        ...prev,
                        itemLoaders: {
                            ...prev?.itemLoaders,
                            removeLoaders: {
                                ...prev?.itemLoaders?.removeLoaders,
                                [index]: false,
                            },
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
            {Object?.keys(cartData)?.length ? (
                <div className="grid grid-cols-[1fr_0.65fr] gap-4">
                    <section className="w-full px-4 rounded flex flex-col gap-5">
                        {cartData?.items?.map((item, i) => (
                            <>
                                <div
                                    key={item?._id}
                                    className="flex items-center justify-between gap-5 rounded p-2 bg-gray-50 border border-gray-200"
                                >
                                    <figure className="">
                                        <img
                                            src={webinarDummy}
                                            alt={item?.slug}
                                            className="size-32 rounded"
                                        />
                                    </figure>
                                    <div className="w-full">
                                        <div className="w-full flex items-start justify-between">
                                            <H3 className="capitalize">
                                                {item?.title}
                                            </H3>
                                            {expressCart ? null : (
                                                <>
                                                    {itemLoaders.removeLoaders[
                                                        i
                                                    ] ? (
                                                        <DotedLoader />
                                                    ) : (
                                                        <Trash2
                                                            onClick={() =>
                                                                removeItemHandler(
                                                                    i,
                                                                    item?._id
                                                                )
                                                            }
                                                            color="red"
                                                            size={25}
                                                            className="cursor-pointer hover:aimate-bounce"
                                                        />
                                                    )}
                                                </>
                                            )}
                                        </div>
                                        <div className="flex items-center justify-between gap-4">
                                            <div>
                                                {/* <p
                                                    className="text-[15px] text-gray-500"
                                                    dangerouslySetInnerHTML={{
                                                        __html: `${item?.description?.slice(
                                                            0,
                                                            150
                                                        )}...`,
                                                    }}
                                                /> */}
                                                <div className="flex gap-2 text-gray-500 mb-2">
                                                    <p>Add ons :</p>
                                                    <div className="flex gap-2 text-gray-600 font-semibold">
                                                        {item?.selected_add_ons?.map(
                                                            (add_on) => (
                                                                <span className="flex gap-1 underline">
                                                                    {
                                                                        add_on?.label
                                                                    }
                                                                    <p>
                                                                        ($
                                                                        {
                                                                            add_on?.price
                                                                        }
                                                                        )
                                                                    </p>
                                                                    ,
                                                                </span>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex gap-2 text-gray-500 mb-3">
                                                    <p>Price :</p>
                                                    <H4 className="!text-tertiary">
                                                        ${item?.price}
                                                    </H4>
                                                </div>
                                            </div>
                                            <div className="flex flex-col">
                                                <div className="flex items-center justify-between gap-4">
                                                    <IconButton
                                                        icon={minus}
                                                        value="-"
                                                        loading={
                                                            itemLoaders[i] ===
                                                            "dec"
                                                        }
                                                        onClick={() =>
                                                            updateItems(
                                                                item?._id,
                                                                i,
                                                                "dec",
                                                                item?.quantity -
                                                                    1
                                                            )
                                                        }
                                                    />
                                                    <button
                                                        disabled
                                                        className="text-2xl font-semibold text-tertiary"
                                                    >
                                                        {item?.quantity}
                                                    </button>
                                                    <IconButton
                                                        icon={plus}
                                                        value="+"
                                                        loading={
                                                            itemLoaders[i] ===
                                                            "inc"
                                                        }
                                                        onClick={() =>
                                                            updateItems(
                                                                item?._id,
                                                                i,
                                                                "inc",
                                                                item?.quantity +
                                                                    1
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <hr
                                    className={`${
                                        cartData?.items?.length === i + 1
                                            ? "hidden"
                                            : ""
                                    } border-gray-700`}
                                /> */}
                            </>
                        ))}
                    </section>
                    <section>
                        <CartSummary cartData={cartData} />
                        <Paypal placeOrder={placeOrder} cartData={cartData} />
                    </section>
                </div>
            ) : (
                <div className="flex flex-col items-center ">
                    <NoDataFound
                        label="Cart is empty"
                        imageSize="size-[400px]"
                    />
                    <Button
                        onClick={() =>
                            navigate(
                                "/webinars?typeId=6608a0981c5ef3fe4836e2ff&type=upcoming"
                            )
                        }
                    >
                        Continue Shopping
                    </Button>
                </div>
            )}
        </Container>
    );
}
