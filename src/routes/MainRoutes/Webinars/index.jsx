import React, { Fragment, useEffect, useState } from "react";
import webinarDummy from "../../../assets/home/webinarDummy.jpg";

import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import useWebinars from "../../../utils/helpers/useWebinars";

import { H2 } from "../../../components/Typography";
import { Container, NoDataFound, WebinarCard } from "../../../components";

export default function Webinars() {
    const [state, setState] = useState({ filters: {} });
    let location = useLocation(),
        navigate = useNavigate();
    let [searchParams, setSearchParams] = useSearchParams();
    let currentTypeId = searchParams?.get("typeId"),
        currentType = location?.state?.type ?? searchParams?.get("type");

    const { filters } = state;
    const { webinarsData, webinarsLoading } = useWebinars(filters);

    useEffect(() => {
        window.scrollTo(0, 0);
        setState((prev) => {
            return {
                ...prev,
                filters: { ...prev.filters, webinar_type: [currentTypeId] },
            };
        });
    }, [currentType, currentTypeId]);

    const webinarImage = (image) => {
        return webinarDummy;
    };

    return (
        <Container>
            <H2 className="!mb-16 capitalize">{currentType} Webinars</H2>

            {webinarsLoading ? (
                <div className="grid grid-cols-3 gap-8">
                    {new Array(5)?.fill("")?.map((v, i) => (
                        <div
                            className="animate-pulse bg-gray-300 h-80 rounded-lg"
                            key={i}
                        />
                    ))}
                </div>
            ) : webinarsData?.length ? (
                <div className="grid grid-cols-3 gap-8">
                    {webinarsData?.map((item, i) => (
                        <Fragment key={i}>
                            <WebinarCard data={item} />
                        </Fragment>
                    ))}
                </div>
            ) : (
                <NoDataFound label="No Webinars found" />
            )}
        </Container>
    );
}
