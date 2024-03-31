import React, { useEffect, useState } from "react";
import webinarDummy from "../../../assets/home/webinarDummy.jpg";

import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import useWebinars from "../../../utils/helpers/useWebinars";

import { Button } from "../../../components/UI/Button";
import { Container } from "../../../components/UI/Container";
import { H2, H3, H4, H5 } from "../../../components/Typography";
import NoDataFound from "../../../components/UI/NoDataFound";

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

            <div className="flex flex-col gap-5">
                {webinarsLoading ? (
                    new Array(5)
                        ?.fill("")
                        ?.map((v, i) => (
                            <div
                                className="animate-pulse bg-gray-800 h-40 rounded-lg"
                                key={i}
                            />
                        ))
                ) : webinarsData?.length ? (
                    webinarsData?.map((item) => (
                        <div
                            key={item?._id}
                            className="flex rounded-3xl bg-secondary"
                        >
                            <img
                                src={webinarImage(item?.image)}
                                alt={item?.title}
                                className="h-36 rounded-l-xl object-cover"
                            />

                            <div className="w-full flex justify-between items-center p-5">
                                <div>
                                    <H3>{item?.title}</H3>
                                    <p
                                        className="text-gray-400"
                                        dangerouslySetInnerHTML={{
                                            __html: item?.description?.slice(
                                                0,
                                                30
                                            ),
                                        }}
                                    />
                                </div>

                                <div className="">
                                    <H4 className="text-tertiary">Date</H4>
                                    <H5 className="text-gray-700">
                                        {new Date(
                                            item?.date
                                        ).toLocaleDateString("en-GB")}
                                    </H5>
                                </div>

                                <div className="">
                                    <H4 className="text-tertiary">Speaker</H4>
                                    <H5 className="text-gray-700">
                                        {item?.date}
                                    </H5>
                                </div>

                                <div className="">
                                    <H4 className="text-tertiary">Price</H4>
                                    <H5 className="">{item?.price}</H5>
                                </div>
                                <Button
                                    label="View Details"
                                    className="border-none text-white !bg-primary transition-all duration-300 hover:scale-105"
                                    // onClick={() =>
                                    //     navigate(`/webinars/${item?.id}`)
                                    // }
                                    onClick={() =>
                                        navigate(
                                            `/webinars/details?_id=${item?._id}&name=${item?.title}`,
                                            // `/webinars?type=${state?.currentMode}`,
                                            {
                                                state: {
                                                    typeName: currentType,
                                                    webinarId: item?._id,
                                                },
                                            }
                                        )
                                    }
                                />
                                {/* <div className=" rounded-r-3xl p-2 "></div> */}
                            </div>
                        </div>
                    ))
                ) : (
                    <NoDataFound label="No Webinars found" />
                )}
            </div>
        </Container>
    );
}
