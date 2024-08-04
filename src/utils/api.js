import axios from "axios";
import { apiErrorHandler } from "./validators";

let userInfo = JSON.parse(localStorage.getItem("userInfo"));

const requestHandler = (url, config) => {
    let base_path =
        import.meta.env.VITE_API_BASE_URL +
        import.meta.env.VITE_API_PREFIX +
        url;

    let headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + userInfo?.data?.token,
        ...config?.headers,
    };
    return { base_path, headers };
};

export const getAPI = async (url, config) => {
    const { base_path, headers } = requestHandler(url, config);

    let result = await new Promise((resolve, reject) => {
        axios
            .get(base_path, { headers: headers })
            .then((response) => {
                if (response.status >= 400 && response.status < 600) {
                    reject(Error("get api error"));
                    throw new Error("Bad response from server");
                }
                resolve(response);
            })
            .catch((error) => {
                apiErrorHandler(error);
                reject(error);
            });
    });
    return result;
};

export const postAPI = async (url, data, config) => {
    const { base_path, headers } = requestHandler(url, config);

    let result = await new Promise((resolve, reject) => {
        axios
            .post(base_path, data, { headers: headers })
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
                apiErrorHandler(error);
            });
    });
    return result;
};
