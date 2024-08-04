import { EMAIL_REGEX } from "./constants";
// import contextManager from "../store/contextManager";
// import { getContextValues, updateContextValues } from "../store/contextHelper";

export const apiErrorHandler = (error) => {
    if (error?.response?.status === 401) {
        localStorage.removeItem("userInfo");
        localStorage.setItem("isLoggedIn", false);
        window.location.reload();
    }
    //     // const contextValues = contextManager.getContextValues();
    //     const Component = () => {
    //         const contextValues = getContextValues();
    //         console.log("Context Values:", contextValues);
    //         // Update context values
    //         updateContextValues({ value: "New Value", isAuthModalOpen: true });
    //         // Verify update
    //         const updatedContextValues = getContextValues();
    //         console.log("Updated Context Values:", updatedContextValues);

    //         return null;
    //     };

    //     // return <Component />;
};

export const emailValidator = (email) => {
    return EMAIL_REGEX.test(email);
};
