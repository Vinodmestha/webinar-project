import axios from "axios";

const endpt = "http://localhost:8080";

export const getAPI = async (path, config) => {
    // let cancelToken = axios.CancelToken.source();
    // cancelToken.cancel();
    config = {
        headers: null,
        ...config,
    };

    let base_path = import.meta.env.VITE_API_BASE_URL ?? endpt + path;
    let headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
    };

    if (config.headers) {
        headers = { ...headers, ...config.headers };
    }

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

export const postAPI = async (path, data, config) => {
    config = {
        headers: null,
        ...config,
    };

    let base_path = import.meta.env.VITE_API_BASE_URL ?? endpt + path;

    let headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        country: country,
    };

    if (config.headers) {
        headers = { ...headers, ...config.headers };
    }

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
