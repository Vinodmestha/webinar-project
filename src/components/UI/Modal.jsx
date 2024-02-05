import React from "react";
import close from "../../assets/icons/close.svg";
import { H3 } from "../Typography";

export default function Modal({
    title,
    open,
    className,
    children,
    onClose,
    size,
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

    return (
        <div
            className={`z-[200]  fixed inset-0 flex justify-center items-center transition-colors ${
                open ? "visible bg-[#212326cf] backdrop-blur-sm" : "invisible"
            }`}
        >
            <section
                className={`rounded-xl overflow-hidden p-5 transition-all shadow-2xl backdrop-blur-3xl ${
                    open ? "scale-100 opacity-100" : "scale-125 opacity-100"
                } ${customedSize}  ${className}`}
            >
                <div className="relative flex items-center justify-between">
                    <H3>{title}</H3>
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
