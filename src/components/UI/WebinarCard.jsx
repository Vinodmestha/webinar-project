import React from "react";
import webinarDummy from "../../assets/home/webinarDummy.jpg";

import { Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { H4, H5 } from "../Typography";

export default function WebinarCard({ data, ...props }) {
    let navigate = useNavigate();

    const redirectToDetails = (id, slug, type) => {
        navigate(`/webinars/details?_id=${id}&name=${slug}`, {
            state: {
                typeName: type,
                webinarId: id,
            },
        });
    };

    return (
        <div
            className="rounded-md hover:shadow-2xl transition-all duration-300 border cursor-pointer shadow-lg"
            onClick={() =>
                redirectToDetails(data?._id, data?.slug, data?.category[0])
            }
            key={data?._id}
        >
            <div className="p-3">
                <img
                    src={webinarDummy}
                    alt={data?.value}
                    className="!w-full !h-full object-cover rounded-md group-hover:opacity-20"
                />
            </div>
            <div className="px-3 py-1">
                <div className="flex justify-between items-center">
                    <p className="text-sm px-1.5 py-[2px] rounded-xl w-fit text-[#4caf50] bg-[#4caf501c]">
                        Category
                    </p>
                    <span className="flex gap-1 text-[#020303]">
                        <p className="font-semibold">100</p> Enrolled
                    </span>
                </div>
                <H5 className="!my-4 text-base font-semibold !text-black capitalize hover:text-primaryBtn">
                    {data?.title}
                </H5>
                <div className="my-2 text-sm font-semibold *:!text-[#4e6579]">
                    <span className="flex items-center gap-2">
                        <Calendar color="#f33066" />
                        <p>{new Date(data?.date)?.toLocaleDateString()}</p>
                    </span>
                    <span></span>
                </div>
            </div>
            <hr />
            <footer className="flex justify-between p-2">
                <div className="flex items-center gap-2">
                    <img
                        src={webinarDummy}
                        alt={"a"}
                        className="size-8 rounded-full"
                    />
                    <H5 className="font-semibold !text-gray-600">Speaker</H5>
                </div>
                <H4 className="flex items-center !text-black">
                    $
                    <p className="text-xl text-[#23a16f] !text-tertiary">
                        {data?.price}
                    </p>
                </H4>
            </footer>
        </div>
    );
}
