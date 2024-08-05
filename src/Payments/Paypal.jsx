import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { Message } from "../components";

import { postAPI } from "../utils/api";
import { orderURL } from "../utils/endpoints";

const Paypal = (props) => {
    const navigate = useNavigate();

    const onApprove = async (data, actions) => {
        try {
            postAPI(orderURL?.APPROVE_PAYMENT, {
                order_id: data?.orderID,
            }).then((res) => {
                navigate(`/webinars/checkout/result`, {
                    state: { resultData: res?.data?.data },
                });
            });

            // if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
            //     return actions.restart();
            // } else if (errorDetail) {
            //     throw new Error(
            //         `${errorDetail.description} (${orderData.debug_id})`
            //     );
            // } else {
            //     console.log("console1");
            //     const transaction =
            //         orderData.purchase_units[0].payments.captures[0];
            //     console.log("console2");
            //     setMessage(
            //         `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`
            //     );
            //     console.log(
            //         "Capture result",
            //         orderData,
            //         JSON.stringify(orderData, null, 2)
            //     );
            // }
        } catch (error) {
            Message.error(`Sorry, your transaction could not be processed...`);
            // setMessage(
            //     `Sorry, your transaction could not be processed...${error}`
            // );
        }
    };

    useEffect(() => {
        const initializePayPalButton = () => {
            window?.paypal
                ?.Buttons({
                    style: {
                        layout: "horizontal", // 'horizontal' (default) or 'vertical'
                        color: "gold", // 'gold', 'blue', 'silver', 'black'
                        shape: "rect", // 'rect', 'pill'
                        label: "pay", // 'paypal', 'checkout', 'pay', 'buynow', 'installment'
                    },
                    createOrder: () =>
                        props?.createOrder(props?.cartData?.cart_id),
                    onApprove: onApprove,
                    onCancel: (data) => {
                        console.log("Payment cancelled:", data);
                    },
                    onError: (err) => {
                        console.error("Error:", err);
                    },
                })
                .render("#orderNowButton");
        };

        // Load PayPal SDK script
        const script = document.createElement("script");
        let clientId =
            "AfYIpFusbeV_OX-UFTxEJpGiEW23-ME3RnPLDg1uw8DKQr_P0Rsan6HcTDUm10Q32cABi7ZKSUq_Y_j8";

        script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`;
        script.async = true;
        script.onload = () => initializePayPalButton();
        document.body.appendChild(script);

        // Clean up
        return () => {
            // document.body.removeChild(script);
        };
    }, []);

    return <div id="orderNowButton" className="mt-5" />;
};

export default Paypal;
