import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { speakers } from "./dummy";
import { Container } from "../../components/UI/Container";
import { H2, H4, SubHeading } from "../../components/Typography";

export default function Speakers(props) {
    const [state, setState] = useState({ speakerData: {} });
    let location = useLocation();
    console.log(location?.state?.speaker);

    useEffect(() => {
        window?.scrollTo(0, 0);
        let data = speakers?.filter((item) => {
            return item?.slug === location?.state?.speaker;
        })[0];

        setState((prev) => {
            return { ...prev, speakerData: data };
        });
    }, [location]);

    const { speakerData } = state;
    console.log(speakerData);

    return (
        <Container className="grid grid-cols-1 lg:grid-cols-2">
            <div className="text-center">
                <H2>{speakerData?.name}</H2>
                <H4>{speakerData?.designation}</H4>
                <SubHeading className="my-10">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                </SubHeading>
            </div>
            <img
                src={speakerData?.image}
                alt={speakerData?.slug}
                className="h-96"
            />
        </Container>
    );
}
