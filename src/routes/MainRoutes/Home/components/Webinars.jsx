import React, { forwardRef, Fragment, useEffect, useState } from "react";

import { MoveRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useWebinars from "../../../../utils/helpers/useWebinars";

import { H2, SubHeading } from "../../../../components/Typography";
import {
    Button,
    NoDataFound,
    Container,
    WebinarCard,
} from "../../../../components";

import { getAPI } from "../../../../utils/api";
import { webinarsURL } from "../../../../utils/endpoints";

const Webinars = forwardRef((props, ref) => {
    let navigate = useNavigate();
    const [state, setState] = useState({
        currentMode: "",
        data: [],
        filters: {},
        typesData: [],
    });

    const { currentMode, typesData, filters } = state;

    const { webinarsData, webinarsLoading } = useWebinars(filters);

    useEffect(() => {
        getAPI(webinarsURL?.TYPES).then((res) => {
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

    const redirectToAll = () => {
        return navigate(
            `/webinars?typeId=${filters?.webinar_type}&type=${currentMode}`
        );
    };

    return (
        <Container className="py-10 lg:py-24">
            <H2>Our Featured Webinars</H2>
            <SubHeading className="mb-5 lg:mb-20">
                We offers an extensive catalogue of live and on-demand courses
                led by top-rated instructors.
                <p className="hidden lg:block">
                    We pride ourselves on providing seamless continuing
                    education that fits your lifestyle and supports your career,
                    while improving your clients’ portfolio.
                </p>
            </SubHeading>

            <div
                className="flex items-center justify-center mb-10 overflow-x-scroll lg:overflow-auto"
                id="home-webinars-box"
                ref={ref}
            >
                {typesData?.map((item) => (
                    <Button
                        label={item?.label}
                        key={item?._id}
                        className={`mx-2 lg:mx-7 border-none ${
                            item?.slug === state?.currentMode
                                ? "!bg-tertiary !text-white"
                                : "!bg-gray-100 !text-black"
                        } transition-all duration-100 hover:bg-yellow-200`}
                        onClick={() => changeTypeHandler(item?.slug, item?._id)}
                    />
                ))}
            </div>

            {webinarsLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {new Array(6)?.fill("")?.map((v, i) => (
                        <div
                            className="animate-pulse bg-gray-300 h-60 rounded-lg"
                            key={i}
                        />
                    ))}
                </div>
            ) : webinarsData?.length ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {webinarsData.slice(0, 6)?.map((item, i) => (
                            <Fragment key={i}>
                                <WebinarCard data={item} />
                            </Fragment>
                        ))}
                    </div>
                    <div className="flex justify-center my-8">
                        <Button
                            className="!border- !bg- rounded-lg shadow-md hover:"
                            label="Explore More Webinars"
                            icon={<MoveRight />}
                            onClick={redirectToAll}
                        />
                    </div>
                </>
            ) : (
                <NoDataFound label="No Webinars found" />
            )}
        </Container>
    );
});
export default Webinars;
