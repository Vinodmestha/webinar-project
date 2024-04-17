import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function Paypal(props) {
    const paypalOptions = {
        "client-id":
            "AfYIpFusbeV_OX-UFTxEJpGiEW23-ME3RnPLDg1uw8DKQr_P0Rsan6HcTDUm10Q32cABi7ZKSUq_Y_j8",
        currency: "USD",
    };

    const handleApprove = (data, actions) => {
        // Handle payment approval
    };

    const handleError = (err) => {
        // Handle payment error
    };

    const handleCancel = (data) => {
        // Handle payment cancellation
    };

    return (
        <PayPalScriptProvider options={paypalOptions}>
            <PayPalButtons
                className="bg-yellow-200 z-[1000]"
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: "10.00",
                                },
                            },
                        ],
                    });
                }}
                onApprove={handleApprove}
                onError={handleError}
                onCancel={handleCancel}
            />
        </PayPalScriptProvider>
    );
}
