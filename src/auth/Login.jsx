import React, { useContext, Fragment, useState } from "react";
import { UserContext } from "../store/UserContext";

import { Input, Button, DotedLoader } from "../components";

import { postAPI } from "../utils/api";
import { authURL } from "../utils/endpoints";

export default function Login(props) {
    const { handleLogin, setAuthPage } = useContext(UserContext);
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
                let authData = {
                    ...responseData,
                };
                handleLogin(authData);
                setAuthPage(false);
            })
            .then(() => {
                window.location.reload();
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
        <div className="flex flex-col gap-5">
            {[
                {
                    label: "Email",
                    name: "email",
                    type: "email",
                    required: true,
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
                        type={item?.type}
                        label={item?.label}
                        value={inputData[item?.name]}
                        placeholder={`Enter your ${item?.name}`}
                        onChange={(v) => setData(item?.name, v)}
                        required={item?.required}
                        errorText={errorData[item?.name]}
                    />
                </Fragment>
            ))}

            {/* <p
                className="underline cursor-pointer w-fit"
                onClick={() => props?.setAuthPage("forgotPassword")}
            >
                Forgot Password?
            </p> */}

            <Button
                label={loginLoading ? <DotedLoader fill="#fff" /> : "Login"}
                onClick={submitHandler}
                className="mt-5 border-none rounded-lg !bg-primaryBtn text-white"
            />
        </div>
    );
}
