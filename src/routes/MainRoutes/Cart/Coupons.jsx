import React from "react";

import { Input } from "@material-tailwind/react";

import { Button } from "../../../components";

export default function Coupons() {
    return (
        <div className="flex gap-3 items-center mb-4">
            <Input className="" type="" placeholder="coupon code" />
            <Button
                className="!border-none rounded-lg !py-2 text-white  !bg-tertiary"
                label="Redeem"
            />
        </div>
    );
}
