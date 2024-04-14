import React, { useEffect, useState } from "react";

import { Container } from "../../../components/UI/Container";
import CartSummary from "../../../components/Layout/CartSummary";
import { getAPI } from "../../../utils/api";
import { cartURL } from "../../../utils/endpoints";

export default function Cart(props) {
    const [state, setState] = useState({ summaryData: {} });
    useEffect(() => {
        getAPI(cartURL?.CART_SUMMARY).then((res) => {
            console.log(res);
            setState((prev) => {
                return { ...prev, summaryData: res?.data?.data?.cart_details };
            });
        });
    }, []);

    const { summaryData } = state;

    return (
        <Container className="py-0 sm:!py-10">
            <div className="grid grid-cols-[1fr_0.5fr] gap-2 *:border *:border-gray-800 *:rounded">
                <section className="w-full p-2"></section>
                <CartSummary summary={summaryData?.summary} />
            </div>
        </Container>
    );
}
