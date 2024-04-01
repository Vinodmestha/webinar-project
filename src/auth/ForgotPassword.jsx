import React from "react";

import { Input } from "../components/Input";
import { Button } from "../components/UI/Button";

export default function ForgotPassword(props) {
    return (
        <div className="flex flex-col gap-5">
            <Input placeholder="Enter your email" className="bg-primary" />
            <Button
                label="Get OTP"
                className="mt-5 border-none rounded-lg !bg-tertiary"
            />
        </div>
    );
}
