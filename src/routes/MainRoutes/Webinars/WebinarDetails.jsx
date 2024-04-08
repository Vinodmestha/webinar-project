import React, { useEffect, useState } from "react";
import webinarDummy from "../../../assets/home/webinarDummy.jpg";

import { useLocation, useSearchParams } from "react-router-dom";

import { H2, H3, H4 } from "../../../components/Typography";
import { Container } from "../../../components/UI/Container";
import DotedLoader from "../../../components/UI/loaders/DotedLoader";
import { Button, RedirectionButton } from "../../../components/UI/Button";

import { postAPI } from "../../../utils/api";
import useCartCount from "../../../utils/helpers/useCartCount";
import { cartURL, expressCartURL, webinarsURL } from "../../../utils/endpoints";

export default function WebinarDetails() {
    const [state, setState] = useState({
        detailsData: {},
        selectedInfo: "",
        detailsLoading: false,
        addLoading: false,
    });
    const location = useLocation();
    const [params, setParams] = useSearchParams();

    let typeName = location?.state?.typeName,
        webinarId = location?.state?.webinarId;
    let currentWebinarId = params?.get("_id"),
        currentWebinarName = params?.get("name");

    useEffect(() => {
        // window.scrollTo(0, 0);
        setState((prev) => {
            return { ...prev, detailsLoading: true };
        });
        postAPI(webinarsURL?.DETAILS, {
            webinar_id: webinarId ?? currentWebinarId,
        })
            .then((res) => {
                let responseData = res?.data?.data?.details;
                setState((prev) => {
                    return {
                        ...prev,
                        detailsData: responseData,
                        selectedInfo: responseData?.webinar_info[0]?.value,
                    };
                });
            })
            .finally(() => {
                setState((prev) => {
                    return { ...prev, detailsLoading: false };
                });
            });
    }, [location]);

    const { detailsData, detailsLoading, selectedInfo, addLoading } = state;

    const { cartCountHandler } = useCartCount();

    const addToCartHandler = () => {
        setState((prev) => {
            return { ...prev, addLoading: true };
        });
        postAPI(cartURL?.ADD_TO_CART, { id: detailsData?._id })
            .then((res) => {
                cartCountHandler();
            })
            .finally(() => {
                setState((prev) => {
                    return { ...prev, addLoading: false };
                });
            });
    };

    return (
        <>
            <Container>
                <div className="border border-gray-800 rounded-xl px-8 py-8 my-10 h-full">
                    {detailsLoading ? (
                        "loading"
                    ) : (
                        <section className="grid grid-cols-[0.5fr,1fr] gap-10">
                            <figure className="flex items-center rounded-xl overflow-hidden">
                                <img src={webinarDummy} className="md:h-80" />
                            </figure>
                            <section className="border-gray-900 rounded-xl h-full">
                                <H2 className=" text-tertiary capitalize">
                                    {detailsData?.title}
                                </H2>
                                <p
                                    className="text-[17px] text-gray-500"
                                    dangerouslySetInnerHTML={{
                                        __html: detailsData?.description,
                                    }}
                                />
                                <div className="flex justify-center gap-5 w-full my-5 *:w-40">
                                    <Button
                                        label="Buy Now"
                                        // onClick={addToCartHandler}
                                        className="bg-transparent border-2 border-white transition-all duration-200 hover:scale-105"
                                    />
                                    <Button
                                        label={
                                            addLoading ? (
                                                <DotedLoader />
                                            ) : (
                                                "Add to Cart"
                                            )
                                        }
                                        onClick={addToCartHandler}
                                        className="border-none !bg-tertiary transition-all duration-200 hover:scale-105"
                                    />
                                </div>
                            </section>
                        </section>
                    )}
                </div>

                {/* <div className="border border-gray-800 rounded-xl p-5 my-10">
                    <H4 className={`text-tertiary`}>
                        Speakers for this webinar
                    </H4>
                    {detailsData?.speakers?.map((item) => (
                        <img src={""} alt={item?.value} />
                    ))}
                </div> */}

                {detailsData?.webinar_info?.length ? (
                    <div className="border border-gray-800 rounded-xl overflow-hidden">
                        <ul className="flex border-b-1 border-gray-300 bg-gray-900">
                            {detailsData?.webinar_info?.map((item) => (
                                <li
                                    key={item?._id}
                                    className={`px-8 py-3 cursor-pointer h-full ${
                                        selectedInfo === item?.value
                                            ? "border-b-4 border-b-tertiary"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        setState((prev) => {
                                            return {
                                                ...prev,
                                                selectedInfo: item?.value,
                                            };
                                        })
                                    }
                                >
                                    <H4 className="text-white">
                                        {item?.label}
                                    </H4>
                                </li>
                            ))}
                        </ul>
                        <p
                            className="p-5"
                            dangerouslySetInnerHTML={{
                                __html: detailsData?.webinar_info?.find(
                                    (item) => {
                                        return item?.value == selectedInfo;
                                    }
                                )?.desc,
                            }}
                        />
                    </div>
                ) : null}
            </Container>
        </>
    );
}
