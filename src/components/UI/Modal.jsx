import React from "react";

import close from "../../assets/icons/close.svg";
import modalBack from "../../assets/icons/modalBack.svg";

import { H4 } from "../Typography";

export default function Modal({
    title,
    open,
    className,
    children,
    onClose,
    size,
    ...props
}) {
    let customedSize;
    if (size === "sm") {
        customedSize = "lg:!w-2/5 !w-11/12";
    } else if (size === "md") {
        customedSize = "lg:!w-1/2 !w-11/12 ";
    } else if (size === "lg") {
        customedSize = "lg:!w-9/12 !w-11/12 ";
    } else {
        customedSize = "lg:!w-1/4 !w-11/12 ";
    }

    console.log(props);
    return (
        <div
            className={`z-[200]  fixed inset-0 flex justify-center items-center transition-colors ${
                open ? "visible bg-[#212326cf] backdrop-blur-sm" : "invisible"
            }`}
        >
            <section
                className={`rounded-xl overflow-hidden p-5 transition-all shadow-2xl border border-gray-700 backdrop-blur-3xl ${
                    open ? "scale-100 opacity-100" : "scale-125 opacity-100"
                } ${customedSize}  ${className}`}
            >
                <div className="relative flex items-center justify-between">
                    {props?.backOption ? (
                        <div
                            className="flex items-center gap-2 w-fit font-axiSemiBold text-lg cursor-pointer transition-all duration-200 hover:scale-105"
                            onClick={props?.backAction}
                        >
                            <img src={modalBack} alt="<" className="w-5 h-5" />
                            Back
                        </div>
                    ) : (
                        <H4 className="!text-white">{title}</H4>
                    )}
                    <img
                        src={close}
                        alt="x"
                        className="z-10 cursor-pointer w-[30px] h-[20px] flex justify-center items-center"
                        onClick={onClose}
                    />
                </div>
                <main className="p-5">{children}</main>
            </section>
        </div>
    );
}
