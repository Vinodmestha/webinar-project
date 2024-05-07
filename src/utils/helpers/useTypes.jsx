import React, { useEffect, useState } from "react";

import { getAPI } from "../api";
import { webinarsURL } from "../endpoints";

export default function useTypes() {
    const [state, setState] = useState({
        typesData: [],
        typesLoading: true,
    });

    useEffect(() => {
        setState((prev) => {
            return { ...prev, typesLoading: true };
        });
        getAPI(webinarsURL?.TYPES)
            .then((res) => {
                let responseData = res?.data?.data?.types;
                setState((prev) => {
                    return {
                        ...prev,
                        typesData: responseData,
                    };
                });
            })
            .finally(() => {
                setState((prev) => {
                    return { ...prev, typesLoading: false };
                });
            });
    }, []);

    const { typesData, typesLoading } = state;
    return { typesData, typesLoading };
}
