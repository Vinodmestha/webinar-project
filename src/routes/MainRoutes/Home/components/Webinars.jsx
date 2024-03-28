import React, { useEffect, useState } from "react";
import webinarDummy from "../../../../assets/home/webinarDummy.jpg";

import { useNavigate } from "react-router-dom";

// import { webinarsData } from "../../dummy";
import { Button } from "../../../../components/UI/Button";
import { Container } from "../../../../components/UI/Container";
import { H2, H5, SubHeading } from "../../../../components/Typography";

import { getAPI } from "../../../../utils/api";
import { webinarsURL } from "../../../../utils/endpoints";
import useWebinars from "../../../../utils/helpers/useWebinars";
import NoDataFound from "../../../../components/UI/NoDataFound";

export default function Webinars() {
    let navigate = useNavigate();
    const [state, setState] = useState({
        currentMode: "",
        data: [],
        filters: {},
        typesData: [],
    });

    const { typesData, filters } = state;

    const { webinarsData, loading } = useWebinars(filters);

    useEffect(() => {
        getAPI(webinarsURL?.TYPES).then((res) => {
            console.log(res);
            let responseData = res?.data?.data?.types;
            changeTypeHandler(responseData[0]?.slug, responseData[0]?._id);
            setState((prev) => {
                return {
                    ...prev,
                    typesData: responseData,
                    currentMode: responseData[0]?.slug,
                };
            });
        });
    }, []);

    const changeTypeHandler = (slug, id) => {
        setState((prev) => {
            return {
                ...prev,
                currentMode: slug,
                filters: { ...prev.filters, webinar_type: [id] },
            };
        });
    };

    return (
        <Container>
            <H2>Our Latest Webinars</H2>
            <SubHeading className="mb-20">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s
            </SubHeading>

            <div className="flex items-center justify-center mb-10">
                {typesData?.map((item) => (
                    <Button
                        label={item?.label}
                        key={item?._id}
                        className={`mx-7 border-none ${
                            item?.slug === state?.currentMode
                                ? "!bg-yellow-800 !text-white"
                                : "!bg-gray-100 !text-black"
                        } transition-all duration-100 hover:bg-yellow-200`}
                        onClick={() => changeTypeHandler(item?.slug, item?._id)}
                    />
                ))}
            </div>

            {webinarsData?.length ? (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
                    {webinarsData?.map((item) => (
                        <div
                            key={item?._id}
                            className="relative w-full h-full rounded-xl overflow-hidden group bg-black z-[10]"
                        >
                            <img
                                src={item?.image ?? webinarDummy}
                                alt={item?.title}
                                className="!w-full !h-full object-cover opacity-70 group-hover:opacity-20 z-[5]"
                            />
                            <div className="absolute bottom-3 left-8 right-10 group-hover:animate-fadeUp flex flex-col justify-center items-center text-center text-white">
                                <h4 className="font-axiSemiBold text-[26px]">
                                    {item?.title}
                                </h4>
                                <div className="hidden group-hover:block">
                                    <H5 className="text-[16px] text-grey2 mb-10 text-white">
                                        {item?.description?.slice(0, 100)}...
                                    </H5>
                                    <p
                                        className="font-semibold text-blue1 cursor-pointer hover:text-[rgb(92,152,242/0.6)]"
                                        onClick={() =>
                                            navigate(
                                                `/webinars/details?_Id=${item?._id}&name=${item?.title}`,
                                                // `/webinars?type=${state?.currentMode}`,
                                                {
                                                    state: {
                                                        typeName:
                                                            state?.currentMode,
                                                        webinarId: item?._id,
                                                    },
                                                }
                                            )
                                        }
                                    >
                                        View Details
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <NoDataFound />
            )}
        </Container>
    );
}
