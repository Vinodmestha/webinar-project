import React, { useState, useEffect } from "react";
import speaker from "../../../assets/icons/speaker.png";

import { useLocation, useSearchParams } from "react-router-dom";

import { Container, BackNavigate } from "../../../components";
import { H2, H4, SubHeading } from "../../../components/Typography";

import { getAPI, postAPI } from "../../../utils/api";
import { speakersURL } from "../../../utils/endpoints";

export default function SpeakersDetails(props) {
    const [state, setState] = useState({
        detailsData: {},
        detailsLoading: false,
    });
    let location = useLocation();
    const [params, setParams] = useSearchParams();

    let currentSpeaker = params?.get("name");

    useEffect(() => {
        window.scrollTo(0, 0);
        setState((prev) => {
            return { ...prev, detailsLoading: true };
        });
        getAPI(speakersURL?.LIST)
            .then((res) => {
                return res?.data?.data?.speakers.find((item) => {
                    return item?.slug === currentSpeaker;
                });
            })
            .then((res) => {
                postAPI(speakersURL?.DETAILS, {
                    speaker_id: res?._id,
                }).then((res) => {
                    let responseData = res?.data?.data?.details;
                    setState((prev) => {
                        return {
                            ...prev,
                            detailsData: responseData,
                        };
                    });
                });
            })
            .catch((err) => {})
            .finally(() => {
                setState((prev) => {
                    return { ...prev, detailsLoading: false };
                });
            });
    }, [location, currentSpeaker]);

    const { detailsData, detailsLoading } = state;

    return (
        <Container>
            <BackNavigate backLabel="Speaker" />
            {detailsLoading ? (
                <div className="flex flex-col gap-5 items-center *:rounded-lg *:animate-pulse *:bg-gray-300">
                    <div className="size-60 !rounded-full" />
                    <div className="w-60 h-10" />
                    <div className="w-full h-80" />
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center">
                    <img
                        src={detailsData?.image}
                        alt={detailsData?.slug}
                        className="h-80"
                    />
                    <div className="text-center">
                        <H2>{detailsData?.name}</H2>
                        <H4>{detailsData?.designation}</H4>
                    </div>
                    <div className=" ">
                        <p
                            className="my-10"
                            dangerouslySetInnerHTML={{
                                __html: detailsData?.about,
                            }}
                        />
                    </div>
                </div>
            )}
        </Container>
    );
}
