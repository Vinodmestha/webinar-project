import React, { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";

import { webinarsData } from "../Home/dummy";
import { Button } from "../../../components/UI/Button";
import { Container } from "../../../components/UI/Container";
import { H2, H3, H4, H5 } from "../../../components/Typography";

export default function Webinars() {
    const [state, setState] = useState({ data: {} });
    let location = useLocation();

    useEffect(() => {
        let data = webinarsData?.filter((item) => {
            return item?.categorySlug === location?.state?.name;
        });

        setState((prev) => {
            return { ...prev, data: data[0] };
        });
    }, [location]);

    const { data } = state;

    return (
        <Container>
            <H2>{data?.categoryType} Webinars</H2>

            <div className="flex flex-col gap-5">
                {data?.data?.map((item) => (
                    <div key={item?.id} className="flex rounded-3xl bg-blue2">
                        <img
                            src={item?.image}
                            alt={item?.label}
                            className="h-48 rounded-3xl"
                        />

                        <div className="w-full flex justify-between items-center p-5">
                            <div className="">
                                <H3 className="">{item?.label}</H3>
                                <p className="text-gray-600">{item?.desc}</p>
                            </div>

                            <div className="">
                                <H4 className="text-tertiary">Date</H4>
                                <H5 className="text-gray-700">04 Feb 2024</H5>
                            </div>

                            <div className="">
                                <H4 className="text-tertiary">Speaker</H4>
                                <H5 className="text-gray-700">John Doe</H5>
                            </div>

                            <div className="">
                                <H4 className="text-tertiary">Price</H4>
                                <H5 className="">₹16,600</H5>
                            </div>
                            <Button
                                label="Order Now"
                                className="border-none text-white !bg-primary transition-all duration-300 hover:scale-105"
                                onClick={() => alert("Order Place")}
                            />
                            {/* <div className=" rounded-r-3xl p-2 "></div> */}
                        </div>
                    </div>
                ))}
            </div>
        </Container>
    );
}
