import React, { Fragment, useState } from "react";

import { Input } from "../components/Input";
import { Button } from "../components/UI/Button";
import DotedLoader from "../components/UI/loaders/DotedLoader";

import { postAPI } from "../utils/api";
import { authURL } from "../utils/endpoints";

export default function SignUp(props) {
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
                props?.setAuthPage("login");
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
            <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
                {[
                    { label: "Name", name: "name", required: true },
                    { label: "Password", name: "password", required: true },
                    { label: "Email", name: "email", required: true },
                    { label: "Mobile", name: "mobile", required: true },
                ]?.map((item) => (
                    <Fragment key={item?.name}>
                        <Input
                            onChange={(v) => setData(item?.name, v)}
                            label={item?.label}
                            placeholder={`Enter your ${item?.name}`}
                            value={inputData[item?.name]}
                            required={item?.required}
                            className="bg-primary"
                            errorText={errorData[item?.name]}
                        />
                    </Fragment>
                ))}
            </div>
            <Button
                label={signUpLoading ? <DotedLoader fill="#fff" /> : "Sign Up"}
                onClick={submitHandler}
                className="w-1/2 mx-auto mt-5 border-none rounded-lg text-white !bg-primaryBtn"
            />
        </div>
    );
}
