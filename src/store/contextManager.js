import { useContext } from "react";
import { UserContext } from "./UserContext";

// Singleton state manager
class ContextManager {
    constructor() {
        this.context = null;
    }

    setContext(context) {
        this.context = context;
    }

    getContextValues() {
        if (!this.context) {
            throw new Error("Context is not set");
        }
        return this.context;
    }

    updateContextValues(newValues) {
        if (!this.context) {
            throw new Error("Context is not set");
        }
        if (newValues.value !== undefined)
            this.context.setValue(newValues.value);
        if (newValues.authModal !== undefined)
            this.context.setAuthPage(newValues.authModal);
    }
}

const contextManager = new ContextManager();

export const useContextManager = () => {
    const context = useContext(UserContext);
    contextManager.setContext(context);
    return contextManager;
};

export default contextManager;
