import React from "react";
import { noDataFound } from "../../assets";

import { H3, H4 } from "../Typography";
import { Container } from "./Container";

export default function NoDataFound({ label }) {
    return (
        <Container className="flex flex-col w-full items-center !py-10 justify-center">
            <img src={noDataFound} alt="No Data" className="size-80" />
            <H3 className="text-tertiary">{label ?? "No data Found"}</H3>
        </Container>
    );
}
