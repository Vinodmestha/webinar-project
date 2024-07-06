import React, { useEffect, useState } from "react";
import webinarDummy from "../../../assets/home/webinarDummy.jpg";

import { Calendar } from "lucide-react";
import { useLocation, useSearchParams } from "react-router-dom";
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";

import { H1, H4 } from "../../../components/Typography";
import {
    Container,
    DotedLoader,
    Button,
    RedirectionButton,
} from "../../../components/";

import { postAPI } from "../../../utils/api";
import useCartCount from "../../../utils/helpers/useCartCount";
import { cartURL, expressCartURL, webinarsURL } from "../../../utils/endpoints";

export default function WebinarDetails() {
    const [state, setState] = useState({
        detailsData: {},
        selectedInfo: "",
        detailsLoading: false,
        addLoading: false,
        activeTab: "html",
    });
    const location = useLocation();
    const [params, setParams] = useSearchParams();

    let typeName = location?.state?.typeName,
        webinarId = location?.state?.webinarId;
    let currentWebinarId = params?.get("_id"),
        currentWebinarName = params?.get("name");

    useEffect(() => {
        // window.scrollTo(0, 0);
        setState((prev) => {
            return { ...prev, detailsLoading: true };
        });
        postAPI(webinarsURL?.DETAILS, {
            webinar_id: webinarId ?? currentWebinarId,
        })
            .then((res) => {
                let responseData = res?.data?.data?.details;
                setState((prev) => {
                    return {
                        ...prev,
                        detailsData: responseData,
                        activeTab: responseData?.webinar_info[0]?.value,
                    };
                });
            })
            .finally(() => {
                setState((prev) => {
                    return { ...prev, detailsLoading: false };
                });
            });
    }, [location]);

    const { detailsData, detailsLoading, selectedInfo, activeTab, addLoading } =
        state;

    const { cartCountHandler } = useCartCount();
    console.log(detailsData);

    const addToCartHandler = () => {
        setState((prev) => {
            return { ...prev, addLoading: true };
        });
        postAPI(cartURL?.ADD_TO_CART, { id: detailsData?._id })
            .then((res) => {
                cartCountHandler();
            })
            .finally(() => {
                setState((prev) => {
                    return { ...prev, addLoading: false };
                });
            });
    };

    return (
        <>
            <Container className={"!py-10"}>
                {detailsLoading ? (
                    "loading"
                ) : (
                    <div className="grid grid-cols-[1fr_0.5fr] gap-5 items-end text-[#3c4852]">
                        <div className="flex flex-col *:text-left *:w-full">
                            <div>
                                <p className="text-sm px-2 py-[5px] rounded-xl w-fit text-[#4caf50] bg-[#4caf501c]">
                                    Category
                                </p>
                            </div>
                            <H1 className="!text-4xl my-4 capitalize">
                                {detailsData?.title}
                            </H1>
                            <div className="mb-4 text-sm font-semibold *:!text-[#4e6579]">
                                <span className="flex items-center gap-2">
                                    <Calendar color="#f33066" />
                                    <p>
                                        {new Date(
                                            detailsData?.date
                                        )?.toLocaleDateString()}
                                    </p>
                                </span>
                                <span></span>
                            </div>
                            <p
                                className="text-[15px] text-gray-500"
                                dangerouslySetInnerHTML={{
                                    __html: detailsData?.description,
                                }}
                            />
                            <div></div>
                        </div>
                        <figure>
                            <img
                                src={webinarDummy}
                                alt=""
                                className="rounded-md w-full"
                            />
                        </figure>
                    </div>
                )}
            </Container>
            <div className="bg-bgHero">
                <Container className="!py-0">
                    <div className="grid grid-cols-2 gap-3">
                        {detailsData?.webinar_info?.length ? (
                            <Tabs value={activeTab}>
                                <div className=" ">
                                    <TabsHeader
                                        indicatorProps={{
                                            className:
                                                "h-full bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                                        }}
                                    >
                                        {detailsData?.webinar_info.map(
                                            (item) => (
                                                <Tab
                                                    key={item?.value}
                                                    value={item?.value}
                                                    onClick={() =>
                                                        setState((prev) => {
                                                            return {
                                                                ...prev,
                                                                activeTab:
                                                                    item?.value,
                                                            };
                                                        })
                                                    }
                                                    className={`max-w-[400px] ${
                                                        activeTab ===
                                                        item?.value
                                                            ? "text-tertiary"
                                                            : "text-gray-900"
                                                    }`}
                                                >
                                                    {item?.label}
                                                </Tab>
                                            )
                                        )}
                                    </TabsHeader>
                                </div>
                                <TabsBody className="my-5">
                                    <p
                                        className="text-[#212121]"
                                        dangerouslySetInnerHTML={{
                                            __html: detailsData?.webinar_info?.find(
                                                (item) => {
                                                    return (
                                                        item?.value == activeTab
                                                    );
                                                }
                                            )?.desc,
                                        }}
                                    />
                                </TabsBody>
                            </Tabs>
                        ) : null}
                    </div>
                </Container>
            </div>
        </>
    );
}

// <div className="border border-gray-800 rounded-xl px-8 py-8 my-10 h-full">
//                     {detailsLoading ? (
//                         "loading"
//                     ) : (
//                         <section className="grid grid-cols-[0.5fr,1fr] gap-10">
//                             <figure className="flex items-center rounded-xl overflow-hidden">
//                                 <img src={webinarDummy} className="md:h-80" />
//                             </figure>
//                             <section className="border-gray-900 rounded-xl h-full">
//                                 <H2 className=" text-tertiary capitalize">
//                                     {detailsData?.title}
//                                 </H2>
//                                 <p
//                                     className="text-[17px] text-gray-500"
//                                     dangerouslySetInnerHTML={{
//                                         __html: detailsData?.description,
//                                     }}
//                                 />
//                                 <div className="flex justify-center gap-5 w-full my-5 *:w-40">
//                                     <Button
//                                         label="Buy Now"
//                                         // onClick={addToCartHandler}
//                                         className="bg-transparent border-2 border-white transition-all duration-200 hover:scale-105"
//                                     />
//                                     <Button
//                                         label={
//                                             addLoading ? (
//                                                 <DotedLoader />
//                                             ) : (
//                                                 "Add to Cart"
//                                             )
//                                         }
//                                         onClick={addToCartHandler}
//                                         className="border-none !bg-tertiary transition-all duration-200 hover:scale-105"
//                                     />
//                                 </div>
//                             </section>
//                         </section>
//                     )}
//                 </div>

//                 {/* <div className="border border-gray-800 rounded-xl p-5 my-10">
//                     <H4 className={`text-tertiary`}>
//                         Speakers for this webinar
//                     </H4>
//                     {detailsData?.speakers?.map((item) => (
//                         <img src={""} alt={item?.value} />
//                     ))}
//                 </div> */}

//                 {detailsData?.webinar_info?.length ? (
//                     <div className="border border-gray-800 rounded-xl overflow-hidden">
//                         <ul className="flex border-b-1 border-gray-300 bg-gray-900">
//                             {detailsData?.webinar_info?.map((item) => (
//                                 <li
//                                     key={item?._id}
//                                     className={`px-8 py-3 cursor-pointer h-full ${
//                                         selectedInfo === item?.value
//                                             ? "border-b-4 border-b-tertiary"
//                                             : ""
//                                     }`}
//                                     onClick={() =>
//                                         setState((prev) => {
//                                             return {
//                                                 ...prev,
//                                                 selectedInfo: item?.value,
//                                             };
//                                         })
//                                     }
//                                 >
//                                     <H4 className="text-white">
//                                         {item?.label}
//                                     </H4>
//                                 </li>
//                             ))}
//                         </ul>
//                         <p
//                             className="p-5"
//                             dangerouslySetInnerHTML={{
//                                 __html: detailsData?.webinar_info?.find(
//                                     (item) => {
//                                         return item?.value == selectedInfo;
//                                     }
//                                 )?.desc,
//                             }}
//                         />
//                     </div>
//                 ) : null}
