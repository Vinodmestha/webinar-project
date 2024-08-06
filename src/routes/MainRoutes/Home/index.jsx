import React, { useRef } from "react";

import Webinars from "./components/Webinars";
import Speakers from "./components/Speakers";
// import WhyUs from "./components/WhyUs";
// import TrustedBy from "./components/TrustedBy";
import HeroSection from "./components/HeroSection";
// import Testimonials from "./components/Testimonials";
import ContactUs from "../../../components/Layout/ContactUs";

export default function Home(props) {
    const ref = useRef();
    return (
        <>
            <HeroSection ref={ref} />
            {/* <TrustedBy /> */}
            <Webinars ref={ref} />
            {/* <WhyUs /> */}
            <Speakers />
            {/* <Testimonials /> */}
            <ContactUs />
        </>
    );
}
