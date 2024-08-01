import { useMyContext } from "./UserContext";

// Function to get context values
export const getContextValues = () => {
    const context = useMyContext();
    return context;
};

// Function to update context values
export const updateContextValues = (newValues) => {
    const context = useMyContext();
    if (newValues.value !== undefined) context.setValue(newValues.value);
    if (newValues.authModal !== undefined)
        context.setAuthPage(newValues.authModal);
};
