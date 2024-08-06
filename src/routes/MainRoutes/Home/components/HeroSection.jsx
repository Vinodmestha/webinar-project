import React, { forwardRef } from "react";
import play from "../../../../assets/icons/play.svg";
import heroImage from "../../../../assets/home/heroImage.png";
import bannerList from "../../../../assets/home/bannerList1.gif";

import { H1, H4 } from "../../../../components/Typography";
import {
    Container,
    LineFlower,
    RedirectionButton,
    Button,
} from "../../../../components";

import { heroHighlights } from "../../../../db/dummy";

const HeroSection = forwardRef((props, ref) => {
    const scrollHandler = () => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    };
    return (
        <div className="bg-bgHero mb-10">
            <Container className="grid lg:grid-cols-[0.8fr_1fr] grid-cols-1 lg:px-2 py-8 lg:py-10 !pb-1">
                <section className="flex flex-col items-center justify-center px-6 py-20 text-center lg:text-start">
                    <H1 className="mb-2 lg:mb-8">
                        Best Platform For Stronger Connection
                    </H1>
                    <p className="text-lg mb-14 md:mb-16 text-gray-400">
                        The World's largest platform to increase potential and
                        add new world knowledge digitally
                    </p>
                    <div className="w-full flex justify-center lg:justify-start gap-6">
                        <RedirectionButton
                            className="w-full md:w-fit rounded-lg md:rounded-3xl"
                            label="Get Started"
                            redirectLink="/"
                            onClick={scrollHandler}
                        />
                        {/* <Button label="How It works" icon={play} /> */}
                    </div>
                </section>
                <section className="relative hidden lg:flex justify-center px-20">
                    <div className="p-5 w-[450px]  rounded-full border-2 border-tertiary">
                        <div className="w-full h-full rounded-full bg-gradient-to-b from-secondary via-tertiary to-primary" />
                        <img
                            src={heroImage}
                            className="absolute bottom-0 -left-36 !w-[900px] h-[660px]"
                        />
                        {/* <img
                            src={bannerList}
                            className="absolute -top-10 right-6 w-56 h-56"
                        /> */}
                    </div>
                    {/* <figure> */}

                    {/* </figure> */}
                </section>
            </Container>
            <Container className="hidden lg:block relative">
                <section className="lg:absolute px-4 lg:px-0 w-full h-28 top-1/2 grid  grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-10">
                    {heroHighlights?.map((item) => (
                        <div
                            key={item?.id}
                            className="flex flex-col lg:flex-row justify-center text-center lg:text-left items-center gap-3 shadow-lg p-2 lg:p-4 py-4 rounded-lg z-50 bg-white"
                        >
                            <img
                                src={item.icon}
                                className={`size-12 border rounded-full p-2 ${item?.bg} border-dashed ${item?.border}`}
                            />
                            <div className="*:!text-black">
                                <H4>{item?.label}</H4>
                                <p className="text-sm mt-1 hidden lg:block">
                                    {item?.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </section>
            </Container>
        </div>
    );
});
export default HeroSection;
