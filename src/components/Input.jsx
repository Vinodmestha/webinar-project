import React, { useState } from "react";

export const Input = ({
    label,
    type,
    value,
    placeholder,
    onChange,
    className,
    ...props
}) => {
    const [state, setState] = useState({ focused: false });
    return (
        <div className="flex flex-col gap-2 items-start ">
            <label className="text-white font-semibold">
                {label}
                {props?.required ? (
                    <span className="ml-1 text-red-300">*</span>
                ) : null}
            </label>
            <input
                type={type}
                value={value}
                placeholder={placeholder}
                className={`w-full rounded-xl !px-5 !py-3 !outline-none border-none bg-black ${
                    state?.focused ? "border-2 !border-tertiary" : ""
                } ${className ?? ""}`}
                onChange={(v) => onChange(v?.target?.value)}
                onFocus={(v) =>
                    setState((prev) => {
                        return { ...prev, focused: true };
                    })
                }
            />

            <p
                className={`text-sm ${
                    props?.errorText ? "" : "invisible"
                } text-red-400`}
            >
                {props?.errorText}
            </p>
        </div>
    );
};
