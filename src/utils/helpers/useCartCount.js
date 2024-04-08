import React, { useEffect, useState } from "react";

import { getAPI } from "../api";
import { cartURL, webinarsURL } from "../endpoints";

export default function useCartCount() {
    const [state, setState] = useState({
        cartCount: null,
        countLoading: true,
    });

    const cartCountHandler = () => {
        setState((prev) => {
            return { ...prev, countLoading: true };
        });
        getAPI(cartURL?.CART_COUNT)
            .then((res) => {
                setState((prev) => {
                    return {
                        ...prev,
                        cartCount: res?.data?.data?.count,
                    };
                });

                localStorage.setItem(
                    "cart-count",
                    JSON.stringify(res?.data?.data?.count)
                );
            })
            .finally(() => {
                setState((prev) => {
                    return { ...prev, countLoading: false };
                });
            });
    };

    const { cartCount, countLoading } = state;
    return { cartCount, countLoading, cartCountHandler };
}
