import React from "react";
import SuccessGIF from "../../assets/extras/success.gif";

export default function ResultPages(props) {
    console.log(props);
    return (
        <div>
            <img src={SuccessGIF} alt="success" />
            ResultPages
        </div>
    );
}
