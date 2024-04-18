import React, { useEffect } from "react";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function Paypal(props) {
    const paypalOptions = {
        "client-id":
            "AfYIpFusbeV_OX-UFTxEJpGiEW23-ME3RnPLDg1uw8DKQr_P0Rsan6HcTDUm10Q32cABi7ZKSUq_Y_j8",
        currency: "USD",
    };

    const handleError = (err) => {
        // Handle payment error
    };

    const handleCancel = (data) => {
        // Handle payment cancellation
    };

    useEffect(() => {
        // let script = document.createElement("script");
        // script.defer = true;
        // script.src = `https://www.paypal.com/sdk/js?client-id=${paypalOptions?.["client-id"]}`;
    }, []);

    const createOrder = (data) => {
        // Order is created on the server and the order id is returned
        return fetch("/my-server/create-paypal-order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            // use the "body" param to optionally pass additional order information
            // like product skus and quantities
            body: JSON.stringify({
                cart: [
                    {
                        sku: "YOUR_PRODUCT_STOCK_KEEPING_UNIT",
                        quantity: "YOUR_PRODUCT_QUANTITY",
                    },
                ],
            }),
        })
            .then((response) => response.json())
            .then((order) => order.id);
    };
    const handleApprove = (data) => {
        // Order is captured on the server and the response is returned to the browser
        return fetch("/my-server/capture-paypal-order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                orderID: data.orderID,
            }),
        }).then((response) => response.json());
    };

    return (
        <PayPalScriptProvider options={paypalOptions}>
            <PayPalButtons
                className="  z-[1000]"
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

// import React from "react";
// import ReactDOM from "react-dom";
// const PayPalButton = paypal.Buttons.driver("react", {
//     React,
//     ReactDOM,
// });

// export default function Paypal(props) {
//     const createOrder = (data) => {
//         // Order is created on the server and the order id is returned
//         return fetch("/my-server/create-paypal-order", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             // use the "body" param to optionally pass additional order information
//             // like product skus and quantities
//             body: JSON.stringify({
//                 cart: [
//                     {
//                         sku: "YOUR_PRODUCT_STOCK_KEEPING_UNIT",
//                         quantity: "YOUR_PRODUCT_QUANTITY",
//                     },
//                 ],
//             }),
//         })
//             .then((response) => response.json())
//             .then((order) => order.id);
//     };
//     const onApprove = (data) => {
//         // Order is captured on the server and the response is returned to the browser
//         return fetch("/my-server/capture-paypal-order", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 orderID: data.orderID,
//             }),
//         }).then((response) => response.json());
//     };
//     return (
//         <PayPalButton
//             createOrder={(data) => createOrder(data, actions)}
//             onApprove={(data) => onApprove(data, actions)}
//         />
//     );
// }
