import React, { useEffect, useState } from "react";

import { postAPI } from "../api";
import { webinarsURL } from "../endpoints";

export default function useWebinars(filterQuery, ...props) {
    const [state, setState] = useState({
        webinarsData: [],
        webinarsLoading: true,
        loadMore: false,
    });

    useEffect(() => {
        setState((prev) => {
            return { ...prev, webinarsLoading: true };
        });
        postAPI(webinarsURL?.LIST, { ...filterQuery })
            .then((res) => {
                let responseData = res?.data?.data;
                setState((prev) => {
                    return { ...prev, webinarsData: responseData?.webinars };
                });
            })
            .finally(() => {
                setState((prev) => {
                    return { ...prev, webinarsLoading: false };
                });
            });
    }, [filterQuery]);

    const { webinarsData, webinarsLoading } = state;
    return { webinarsData, webinarsLoading };
}
