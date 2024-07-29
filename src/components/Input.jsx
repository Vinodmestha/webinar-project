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
        <div className="flex flex-col gap-1 items-start">
            <label className="text-sm text-gray-800 font-semibold">
                {label}
                {props?.required ? (
                    <span className="ml-1 text-red-300">*</span>
                ) : null}
            </label>
            <input
                type={type}
                value={value}
                placeholder={placeholder}
                className={`w-full rounded-xl border !border-gray-800 !px-4 !py-2 !outline-none text-gray-600 bg-transparent ${
                    className ?? ""
                }`}
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
