import axios from "axios";

const path = import.meta.env.VITE_API_URL;
console.log(path);
const prefix = "/api/rajWebinar";

let authData = JSON.parse(localStorage.getItem("userAuth"));

let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + authData?.info?.data?.token,
};

export const getAPI = async (url, config) => {
    // let cancelToken = axios.CancelToken.source();
    // cancelToken.cancel();

    let base_path = import.meta.env.VITE_API_BASE_URL ?? path + prefix + url;

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
                // Message.error(error?.response?.data?.message);
                reject(error);
            });
    });
    return result;
};

export const postAPI = async (url, data, config) => {
    let base_path = import.meta.env.VITE_API_BASE_URL ?? path + prefix + url;

    // if (config.headers) {
    //     headers = { ...headers, ...config.headers };
    // }

    let result = await new Promise((resolve, reject) => {
        axios
            .post(base_path, data, { headers: headers })
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
    return result;
};
