import React from "react";
import { H3, H5 } from "../Typography";
import { Button } from "../UI/Button";

export default function CartSummary(props) {
    return (
        <>
            <div className="border border-gray-800 rounded bg-bgHero p-2">
                <H3 className="text-tertiary">Cart Summary</H3>
                <hr className="border-gray-600" />
                <div className="my-4">
                    {props?.summary?.map((item, i) => (
                        <span key={i} className="flex justify-between">
                            <H5>{item?.label}</H5>
                            <H5>{item?.value}</H5>
                        </span>
                    ))}
                </div>
            </div>
            <div className="">
                <Button label="Place Order" />
            </div>
        </>
    );
}
