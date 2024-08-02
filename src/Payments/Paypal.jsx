import React, { useEffect } from "react";
import { postAPI } from "../utils/api";
import { orderURL } from "../utils/endpoints";

// async (data, actions) => {
//     props?.placeOrder(props?.cartData?.cart_id);
//     return actions.order.create({
//         purchase_units: [
//             {
//                 amount: {
//                     value: props?.cartData?.grand_total, // Specify the payment amount
//                 },
//             },
//         ],
//     });
// },
const createOrder = async (cart_id) => {
    try {
        return postAPI(orderURL?.CREATE_ORDER, {
            cart_id: cart_id,
        }).then((res) => {
            const orderData = res.data;

            if (orderData.id) {
                return orderData.id;
            } else {
                const errorDetail = orderData?.details?.[0];
                const errorMessage = errorDetail
                    ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                    : JSON.stringify(orderData);

                throw new Error(errorMessage);
            }
        });
    } catch (error) {
        setMessage(`Could not initiate PayPal Checkout...${error}`);
    }
};
// async (data, actions) => {
//     return actions.order
//         .capture()
//         .then(function (details) {
//             // Display a success message or redirect to a success page
//             console.log(
//                 "Payment completed successfully:",
//                 details
//             );
//             navigate(`/webinars/checkout/result`);
//         });
// },
const onApprove = async (data, actions) => {
    console.log("onApprove>>>", data);
    try {
        postAPI(orderURL?.APPROVE_PAYMENT, { order_id: data?.orderID }).then(
            (res) => {
                console.log("approved", res);
                console.log("actions", actions);
            }
        );

        // const orderData = await response.json();

        // const errorDetail = orderData?.details?.[0];
        // console.log(errorDetail);
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
        //     navigate(`/webinars/checkout/result`);
        // }
    } catch (error) {
        console.error(error);
        setMessage(`Sorry, your transaction could not be processed...${error}`);
    }
};

const Paypal = (props) => {
    console.log(props);

    useEffect(() => {
        const initializePayPalButton = () => {
            window.paypal
                .Buttons({
                    style: {
                        layout: "horizontal", // 'horizontal' (default) or 'vertical'
                        color: "gold", // 'gold', 'blue', 'silver', 'black'
                        shape: "rect", // 'rect', 'pill'
                        label: "pay", // 'paypal', 'checkout', 'pay', 'buynow', 'installment'
                    },
                    createOrder: () => createOrder(props?.cartData?.cart_id),

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
            document.body.removeChild(script);
        };
    }, []);

    return <div id="orderNowButton" className="mt-5" />;
};

export default Paypal;
