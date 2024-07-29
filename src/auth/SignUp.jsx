import React, { Fragment, useContext, useState } from "react";
import { UserContext } from "../store/UserContext";

import { Input, Button, DotedLoader, Message } from "../components";

import { postAPI } from "../utils/api";
import { authURL } from "../utils/endpoints";

export default function SignUp(props) {
    const { handleLogin } = useContext(UserContext);
    const [state, setState] = useState({
        inputData: {
            email: "",
            password: "",
            name: "",
            mobile: "",
        },
        errorData: { email: "", password: "", name: "", mobile: "" },
        signUpLoading: false,
    });
    const { inputData, errorData, signUpLoading } = state;

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
            return { ...prev, signUpLoading: true };
        });
        postAPI(authURL?.SIGNUP, { ...inputData })
            .then((res) => {})
            .then(() => {
                // props?.setAuthPage("login");

                postAPI(authURL?.LOGIN, {
                    email: inputData?.email,
                    password: inputData?.password,
                })
                    .then((res) => {
                        const responseData = res?.data?.data;
                        let authData = {
                            ...responseData,
                        };
                        handleLogin(authData);
                        // localStorage.setItem("userAuth", JSON.stringify(authData));
                    })
                    .then(() => {
                        props?.navigate("/");
                    });
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setState((prev) => {
                    return { ...prev, signUpLoading: false };
                });
            });
    };

    return (
        <div className="flex flex-col gap-5  ">
            <div className="grid  grid-cols-1 gap-8">
                {[
                    {
                        label: "Name",
                        name: "name",
                        type: "text",
                        required: true,
                    },
                    {
                        label: "Email",
                        name: "email",
                        type: "email",
                        required: true,
                    },
                    {
                        label: "Mobile",
                        name: "mobile",
                        type: "mobile",
                        required: true,
                        countryCode: true,
                    },
                    {
                        label: "Password",
                        name: "password",
                        type: "password",
                        required: true,
                    },
                ]?.map((item) => (
                    <Fragment key={item?.name}>
                        <Input
                            onChange={(v) => setData(item?.name, v)}
                            error={errorData[item?.name]}
                            type={item?.type}
                            label={item?.label}
                            placeholder={`Enter your ${item?.name}`}
                            value={inputData[item?.name]}
                            required={item?.required}
                            className="bg-primary"
                            errorText={errorData[item?.name]}
                            countryCode={item?.countryCode}
                        />
                    </Fragment>
                ))}
            </div>
            <Button
                label={signUpLoading ? <DotedLoader fill="#fff" /> : "Sign Up"}
                onClick={submitHandler}
                className="w-full mx-auto mt-5 border-none rounded-lg text-white !bg-primaryBtn"
            />
        </div>
    );
}
