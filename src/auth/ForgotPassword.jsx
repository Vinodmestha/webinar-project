import React from "react";

import { Input } from "../components/Input";
import { Button } from "../components/UI/Button";

export default function ForgotPassword(props) {
    return (
        <form className="flex flex-col gap-5 w-4/5" onSubmit={() => {}}>
            <Input
                // label="Username"
                placeholder="Email/phone"
                className="bg-primary"
            />
            <Button
                label="Get OTP"
                className="mt-5 border-none rounded-lg !bg-tertiary"
            />
        </form>
    );
}
