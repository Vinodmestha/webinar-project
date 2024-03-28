import React, { useEffect, useState } from "react";

import { postAPI } from "../api";
import { webinarsURL } from "../endpoints";

export default function useWebinars(filterQuery, ...props) {
    const [state, setState] = useState({
        webinarsData: [],
        loading: true,
        loadMore: false,
    });

    useEffect(() => {
        postAPI(webinarsURL?.LIST, { ...filterQuery }).then((res) => {
            let responseData = res?.data?.data;
            setState((prev) => {
                return { ...prev, webinarsData: responseData?.webinars };
            });
        });
    }, [filterQuery]);

    const { webinarsData, loading } = state;
    return { webinarsData, loading };
}
