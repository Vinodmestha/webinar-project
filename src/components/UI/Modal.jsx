import React from "react";
import close from "../../assets/icons/close.svg";
import { H3, H4 } from "../Typography";

export default function Modal({
    type,
    title,
    open,
    className,
    children,
    onClose,
    size,
}) {
    let customedSize;
    if (size === "md") {
        customedSize = "lg:!w-1/2 !w-11/12 ";
    } else if (size === "lg") {
        customedSize = "lg:!w-9/12 !w-11/12 ";
    } else {
        customedSize = "lg:!w-1/4 !w-11/12 ";
    }

    return (
        <section
            className={`z-[200] fixed inset-0 flex justify-center items-center transition-colors ${
                open ? "visible bg-[#212326e6]" : "invisible"
            }  `}
        >
            <section
                className={`bg-primary rounded-xl shadow overflow-hidden p-3 transition-all ${
                    open ? "scale-100 opacity-100" : "scale-125 opacity-100 "
                } ${customedSize}  ${className}`}
            >
                <main className="relative flex items-center justify-between">
                    <H3>{title}</H3>

                    <img
                        src={close}
                        alt="x"
                        className="z-10 cursor-pointer w-[30px] h-[20px] flex justify-center items-center"
                        onClick={onClose}
                    />
                </main>
                {children}
            </section>
        </section>
    );
}
