import React, { useState } from "react";

import { Input } from "../components/Input";
import { Button } from "../components/UI/Button";
import { postAPI } from "../utils/api";
import { authURL } from "../utils/endpoints";
import DotedLoader from "../components/UI/loaders/DotedLoader";
import { H1, H2, H3 } from "../components/Typography";

export default function Login(props) {
    const [state, setState] = useState({
        inputData: { email: "", password: "" },
        errorData: { email: "", password: "" },
        loginLoading: false,
    });
    const { inputData, errorData, loginLoading } = state;

    const setData = (k, v) => {
        setState((prev) => {
            return {
                ...prev,
                inputData: {
                    ...prev?.inputData,
                    [k]: v,
                },
                errorData: {
                    ...prev?.errorData,
                    [k]: v?.length ? "" : "Required",
                },
            };
        });
    };

    const submitHandler = () => {
        let formValid = true;
        for (let i in inputData) {
            if (!inputData[i]?.length) {
                formValid = false;
            }
            setState((prev) => {
                return {
                    ...prev,
                    errorData: {
                        ...prev?.errorData,
                        [i]: inputData[i]?.length ? "" : "Required",
                    },
                };
            });
        }

        for (let i in errorData) {
            if (errorData[i] || !inputData[i] || !formValid) {
                formValid = false;
                return;
            }
        }
        formValid = true;
        formValid && apiHandler();
    };

    const apiHandler = () => {
        setState((prev) => {
            return { ...prev, loginLoading: true };
        });
        postAPI(authURL?.LOGIN, { ...inputData })
            .then((res) => {
                const responseData = res?.data?.data;

                localStorage.setItem("userAuth", JSON.stringify(responseData));
            })
            .then(() => {
                props?.navigate("/");
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setState((prev) => {
                    return { ...prev, loginLoading: false };
                });
            });
    };

    return (
        <div className="flex flex-col gap-5 w-4/5">
            <div className="*:text-gray-400 text-center mb-10">
                <H2>Login</H2>
                <p>Please enter log in details</p>
            </div>
            {[
                { label: "Email", name: "email", required: true },
                { label: "Password", name: "password", required: true },
            ]?.map((item) => (
                <Input
                    onChange={(v) => setData(item?.name, v)}
                    label={item?.label}
                    placeholder={item?.name}
                    required={item?.required}
                    className="bg-primary"
                    errorText={errorData[item?.name]}
                />
            ))}

            <p
                className="underline cursor-pointer"
                // onClick={() => props?.setAuthModal("forgotPassword")}
            >
                Forgot Password?
            </p>

            <Button
                label={loginLoading ? <DotedLoader fill="#fff" /> : "Login"}
                onClick={submitHandler}
                className="mt-5 border-none rounded-lg !bg-tertiary"
            />
        </div>
    );
}
