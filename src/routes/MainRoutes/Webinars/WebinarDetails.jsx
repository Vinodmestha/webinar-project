import React, { useContext, useEffect, useState } from "react";
import { minus, plus } from "../../../assets";
import webinarDummy from "../../../assets/home/webinarDummy.jpg";

import { Calendar, Clock } from "lucide-react";
import { format, parseISO } from "date-fns";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    ButtonGroup,
    Button,
    Checkbox,
} from "@material-tailwind/react";

import { H1, H3, H4, H5 } from "../../../components/Typography";
import { Container, IconButton } from "../../../components/";

import { postAPI } from "../../../utils/api";
// import useCartCount from "../../../utils/helpers/useCartCount";
import { cartURL, expressCartURL, webinarsURL } from "../../../utils/endpoints";
import { UserContext } from "../../../store/UserContext";

export default function WebinarDetails(props) {
    const { isLoggedIn, handlePendingRedirect, redirectPending, setAuthPage } =
        useContext(UserContext);

    const navigate = useNavigate();
    const [state, setState] = useState({
        detailsData: {},
        selectedAddons: [],
        selectedInfo: "",
        detailsLoading: false,
        addLoading: false,
        buyLoading: false,
        activeTab: "html",
        quantity: 1,
    });
    const location = useLocation();
    const [params, setParams] = useSearchParams();

    let typeName = location?.state?.typeName,
        webinarId = location?.state?.webinarId;
    let currentWebinarId = params?.get("_id"),
        currentWebinarName = params?.get("name");

    const {
        detailsData,
        detailsLoading,
        activeTab,
        addLoading,
        buyLoading,
        selectedAddons,
        quantity,
    } = state;

    useEffect(() => {
        window.scrollTo(0, 0);
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

    console.log(detailsData, isLoggedIn, redirectPending);

    useEffect(() => {
        if (redirectPending && isLoggedIn && detailsData) {
            console.log("again adding");
            buyNowHandler();
        }
    }, [redirectPending, isLoggedIn, detailsData]);

    // const { cartCountHandler } = useCartCount();

    const addOnsHandler = (id) => {
        let selected = [...selectedAddons];

        if (selected?.includes(id)) {
            selected = selected?.filter((item) => {
                return item !== id;
            });
        } else {
            selected.push(id);
        }

        return setState((prev) => {
            return { ...prev, selectedAddons: selected };
        });
    };

    const quantityHandler = (quantity) => {
        setState((prev) => {
            return {
                ...prev,
                quantity: quantity,
            };
        });
    };

    const buyNowHandler = () => {
        setState((prev) => {
            return { ...prev, buyLoading: true };
        });
        console.log("buying again");
        postAPI(expressCartURL?.ADD_TO_CART, {
            _id: detailsData?._id,
            add_ons: selectedAddons,
            quantity: quantity,
        })
            .then((res) => {
                let responseData = res?.data?.data?.cart_details;
                handlePendingRedirect(false);
                navigate("/webinars/checkout", {
                    state: {
                        cartType: "express",
                        cartData: responseData,
                        // webinarId: webinarId ?? currentWebinarId,
                        // typeName: typeName,
                        // webinarName: currentWebinarName,
                    },
                });
            })
            .catch((err) => {
                if (err?.response?.status === 401) {
                    setAuthPage(true, "login");
                    handlePendingRedirect(true);
                }
            })
            .finally(() => {
                setState((prev) => {
                    return { ...prev, buyLoading: false };
                });
            });
    };

    const addToCartHandler = () => {
        setState((prev) => {
            return { ...prev, addLoading: true };
        });
        postAPI(cartURL?.ADD_TO_CART, {
            _id: detailsData?._id,
            add_ons: selectedAddons,
            quantity: quantity,
        })
            .then((res) => {
                // cartCountHandler();
            })
            .catch((err) => {
                if (err?.response?.status === 401) {
                    setAuthPage(true, "login");
                }
            })
            .finally(() => {
                setState((prev) => {
                    return { ...prev, addLoading: false };
                });
            });
    };

    const convertDate = (date) => {
        if (date) {
            const parsedDate = parseISO(date);
            const formattedDate = format(parsedDate, "EEE MMM dd yyyy");
            return formattedDate;
        }
    };

    return detailsLoading ? (
        <Container className="!py-10">
            <div className="grid grid-cols-[1fr_0.5fr] gap-5 h-72 overflow-hidden *:animate-pulse">
                <div className="*:rounded-lg *:bg-gray-300">
                    <p className="h-8 w-1/5 mb-5" />
                    <h2 className="h-14 mb-5" />
                    <div className="h-40" />
                </div>
                <div className="rounded-lg bg-gray-300" />
            </div>
            <div className="rounded-lg h-72 my-10 animate-pulse bg-gray-300"></div>
        </Container>
    ) : (
        <>
            <Container className="!py-10">
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
                                    {/* {date} */}
                                    {convertDate(detailsData?.date)}
                                    {/* {new Date(
                                            detailsData?.date
                                        )?.toLocaleDateString()} */}
                                </p>
                            </span>
                            {/* <span>
                                    <Clock color="#f33066" />
                                    <p>{detailsData?.time}</p>
                                </span> */}
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
            </Container>
            <div className="bg-bgHero py-10">
                <Container className="!py-0">
                    <div className="grid grid-cols-[1fr_0.6fr] gap-8">
                        {detailsData?.webinar_info?.length ? (
                            <div className="rounded-md shadow-sm bg-white">
                                <Tabs value={activeTab}>
                                    <TabsHeader
                                        className="h-full overflow-x-scroll whitespace-nowrap [scrollbar-width:none] bg-[#ebebeb]"
                                        indicatorProps={{
                                            className:
                                                " h-full bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                                        }}
                                    >
                                        {detailsData?.webinar_info?.map(
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
                                                    className={`flex-[0_0_150px] font-semibold  h-[60px] whitespace-nowrap  px-2.5 py-0 max-w-[400px] ${
                                                        activeTab ===
                                                        item?.value
                                                            ? "text-tertiary bg-gray-300"
                                                            : "text-gray-900"
                                                    }`}
                                                >
                                                    {item?.label}
                                                </Tab>
                                            )
                                        )}
                                    </TabsHeader>

                                    <TabsBody
                                        className="p-5 text-[#212121]"
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
                                </Tabs>
                            </div>
                        ) : null}
                        <div className="flex flex-col justify-between rounded-md overflow-hidden shadow-sm bg-white">
                            <div>
                                <div className="flex items-center justify-between p-2 bg-blue-50">
                                    <H4>Quantity: </H4>
                                    <div className="flex items-center justify-between gap-4">
                                        <IconButton
                                            icon={minus}
                                            disabled={quantity === 1}
                                            onClick={() =>
                                                quantityHandler(quantity - 1)
                                            }
                                        />
                                        <input
                                            disabled
                                            value={quantity}
                                            className="text-center w-16 h-10 border rounded-lg text-black text-[22px] font-semibold"
                                        />
                                        <IconButton
                                            icon={plus}
                                            onClick={() =>
                                                quantityHandler(quantity + 1)
                                            }
                                        />
                                    </div>
                                </div>
                                {detailsData?.add_ons?.length && false ? (
                                    <div className=" *:!text-black">
                                        <H5 className="font-semibold p-5 bg-blue-100">
                                            Available Options(add ons)
                                        </H5>
                                        <div className="p-5">
                                            {detailsData?.add_ons
                                                ?.filter((option) => {
                                                    return option?.price;
                                                })
                                                ?.map((item) => (
                                                    <>
                                                        <div className="flex gap-3 items-center justify-between">
                                                            <Checkbox
                                                                key={item?._id}
                                                                color="red"
                                                                className="inline-flex"
                                                                label={
                                                                    item?.label
                                                                }
                                                                checked={selectedAddons?.includes(
                                                                    item?._id
                                                                )}
                                                                onChange={() =>
                                                                    addOnsHandler(
                                                                        item?._id
                                                                    )
                                                                }
                                                                on
                                                            />
                                                            <b className="text-blue-500">{`$${item?.price}`}</b>
                                                        </div>
                                                        <hr />
                                                    </>
                                                ))}
                                        </div>
                                    </div>
                                ) : null}
                                {/* : "No add ons available." */}
                            </div>
                            <ButtonGroup className="grid grid-cols-2 *:rounded-none">
                                <Button
                                    loading={buyLoading}
                                    onClick={() => buyNowHandler()}
                                    className="bg-green-300"
                                >
                                    Buy Now
                                </Button>
                                <Button
                                    loading={addLoading}
                                    onClick={() => addToCartHandler()}
                                    className="bg-blue-400"
                                >
                                    Add to Cart
                                </Button>
                            </ButtonGroup>
                        </div>
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
