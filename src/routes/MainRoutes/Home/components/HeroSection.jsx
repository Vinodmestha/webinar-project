import React from "react";
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

export default function HeroSection(props) {
    return (
        <div className="bg-bgHero">
            <Container className="grid lg:grid-cols-[0.8fr_1fr] grid-cols-1 px-2 !pb-1">
                <section className="flex flex-col items-center justify-center px-6 py-20">
                    <H1 className="mb-8">
                        Best Platform For Stronger Connection
                    </H1>
                    <p className="text-lg mb-16 text-gray-400">
                        The World's largest platform to increase potential and
                        add new world knowledge digitally
                    </p>
                    <div className="w-full flex justify-start gap-6">
                        <RedirectionButton
                            label="Get Started"
                            redirectLink="/"
                        />
                        <Button label="How It works" icon={play} />
                    </div>
                </section>
                <section className="relative flex justify-center px-20">
                    <div className="p-5 w-[450px]  rounded-full border-2 border-[#7b2cbf]">
                        <div className="w-full h-full rounded-full bg-gradient-to-b from-secondary via-tertiary to-primary" />
                        <img
                            src={heroImage}
                            className="absolute  bottom-0  -left-36 !w-[900px] h-[660px]"
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
            <Container className="relative">
                <section className="absolute w-full h-28 top-1/2 grid grid-cols-3 gap-10">
                    {heroHighlights?.map((item) => (
                        <div
                            key={item?.id}
                            className="flex items-center gap-3 shadow-lg p-4 rounded-lg z-50  bg-white"
                        >
                            <img
                                src={item.icon}
                                className={`size-12 border rounded-full p-2 ${item?.bg} border-dashed ${item?.border}`}
                            />
                            <div className="*:!text-black">
                                <H4>{item?.label}</H4>
                                <p className="text-sm mt-1">{item?.desc}</p>
                            </div>
                        </div>
                    ))}
                </section>
            </Container>
        </div>
    );
}
