import React from "react";
import play from "../../../../assets/icons/play.svg";
import heroImage from "../../../../assets/home/heroImage.png";
import bannerList from "../../../../assets/home/bannerList1.gif";

import { H1 } from "../../../../components/Typography";
import { Container } from "../../../../components/UI/Container";
import { LineFlower } from "../../../../components/UI/Decorators";
import { RedirectionButton, Button } from "../../../../components/UI/Button";

export default function HeroSection(props) {
    return (
        <div className="bg-gray-100">
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
                <section className="relative flex justify-ceter px-20">
                    <div className="p-5 w-[450px]  rounded-full border-2 border-gray-400">
                        <div className="w-full h-full rounded-full bg-gradient-to-b from-primary via-secondary to-tertiary" />
                        <img
                            src={heroImage}
                            className="absolute  bottom-0  -left-36 !w-[900px] h-[660px]"
                        />
                        <img
                            src={bannerList}
                            className="absolute -top-10 right-6 w-56 h-56"
                        />
                    </div>
                    {/* <figure> */}

                    {/* </figure> */}
                </section>
            </Container>
        </div>
    );
}
