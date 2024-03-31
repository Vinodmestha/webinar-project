import React from "react";

import WhyUs from "./components/WhyUs";
import Webinars from "./components/Webinars";
import Speakers from "./components/Speakers";
// import TrustedBy from "./components/TrustedBy";
import HeroSection from "./components/HeroSection";
// import Testimonials from "./components/Testimonials";
import ContactUs from "../../../components/Layout/ContactUs";

export default function Home(props) {
    return (
        <>
            <HeroSection />
            {/* <TrustedBy /> */}
            <Webinars />
            <WhyUs />
            <Speakers />
            {/* <Testimonials /> */}
            <ContactUs />
        </>
    );
}
