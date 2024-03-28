import React, { useEffect, useState } from "react";

import { Container } from "../../../components/UI/Container";
import { useLocation } from "react-router-dom";
import { postAPI } from "../../../utils/api";
import { webinarsURL } from "../../../utils/endpoints";
import { H3 } from "../../../components/Typography";

export default function WebinarDetails() {
    const [state, setState] = useState({ detailsData: {} });
    const location = useLocation();

    let { typeName, webinarId } = location?.state;

    useEffect(() => {
        postAPI(webinarsURL?.DETAILS, { webinar_id: webinarId }).then((res) => {
            setState((prev) => {
                return { ...prev, detailsData: res?.data?.data?.details };
            });
        });
    }, [location]);

    const { detailsData } = state;
    console.log(detailsData);

    return (
        <Container className="border border-gray-800 rounded-xl p-5 my-10">
            <div className="grid grid-cols-3 gap-5 h-full">
                <section className="border border-gray-900 rounded-xl">
                    <H3>{detailsData?.title}</H3>
                    <p>{detailsData?.description}</p>
                </section>
                <section></section>
                <section></section>
            </div>
        </Container>
    );
}
