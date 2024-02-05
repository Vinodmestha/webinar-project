import React, { useState } from "react";

import Modal from "../components/UI/Modal";

export default function Login(props) {
    const [state, setState] = useState({ authModal: true });
    return (
        <Modal
            title="Login"
            open={state?.authModal}
            onClose={setState((prev) => {
                return { ...prev, authModal: false };
            })}
        >
            Login
        </Modal>
    );
}
