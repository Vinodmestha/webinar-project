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
        <div className="flex flex-col gap-2 items-start">
            <label className="text-tertiary font-semibold">
                {label}
                {props?.required ? (
                    <span className="ml-1 text-red-300">*</span>
                ) : null}
            </label>
            <input
                type={type}
                value={value}
                placeholder={placeholder}
                className={`w-full rounded-xl !px-5 !py-3 !outline-none  text-gray-600 !bg-gray-100 ${
                    state?.focused ? "border !border-gray-300" : ""
                } ${className ?? ""}`}
                onChange={(v) => onChange(v?.target?.value)}
                onFocus={(v) =>
                    setState((prev) => {
                        return { ...prev, focused: true };
                    })
                }
                onBlur={(v) =>
                    setState((prev) => {
                        return { ...prev, focused: false };
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
