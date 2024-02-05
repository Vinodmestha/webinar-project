import React, { useState } from "react";

import { Input } from "../components/Input";
import { Button } from "../components/UI/Button";

export default function Login(props) {
    return (
        <form className="flex flex-col gap-5 w-4/5" onSubmit={() => {}}>
            <Input
                // label="Username"
                placeholder="username"
                className="bg-primary"
            />
            <Input
                // label="Password"
                placeholder="password"
                className="bg-primary"
            />
            <Button
                label="Login"
                className="mt-5 border-none rounded-lg !bg-tertiary"
            />
        </form>
    );
}
