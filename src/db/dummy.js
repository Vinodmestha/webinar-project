import twitter from "../assets/icons/twitter.svg";
import facebook from "../assets/icons/facebook.svg";
import linkedin from "../assets/icons/linkedin.svg";
import instagram from "../assets/icons/instagram.svg";

import upcoming from "../assets/vectors/upcoming.svg";
import preRecorded from "../assets/vectors/preRecorded.svg";
import onDemand from "../assets/vectors/onDemand.svg";
import ceuApproved from "../assets/vectors/ceuApproved.svg";

//header
export const navLinks = [
    { id: 1, label: "About Us", slug: "about" },
    // { id: 2, label: "Features", slug: "features" },
    {
        id: 3,
        label: "Webinars",
        slug: "webinars",
        child: [
            { id: 1, label: "Upcoming", slug: "upcoming", image: upcoming },
            {
                id: 2,
                label: "Pre Recorded",
                slug: "pre-recorded",
                image: preRecorded,
            },
            { id: 3, label: "On Demand", slug: "on-demand", image: onDemand },
            {
                id: 4,
                label: "CEU Approved",
                slug: "ceu-approved",
                image: ceuApproved,
            },
        ],
    },
    // { id: 4, label: "Plan & Pricing", slug: "pricing" },
    { id: 5, label: "Contact", slug: "contact-us" },
];

//footer
export const socialIcons = [
    { id: 1, icon: facebook, link: "" },
    { id: 2, icon: twitter, link: "" },
    { id: 3, icon: instagram, link: "" },
    { id: 4, icon: linkedin, link: "" },
];
export const footerPolicies = [
    { id: 1, label: "Privacy Policy", slug: "" },
    { id: 2, label: "Terms & Conditions", slug: "" },
    { id: 3, label: "Support", slug: "" },
];
export const footerServices = [
    { id: 1, label: "Email Marketing", slug: "" },
    { id: 2, label: "Campaigns", slug: "" },
    { id: 3, label: "Event", slug: "" },
    { id: 4, label: "Business", slug: "" },
];
export const footerAbout = [
    { id: 1, label: "Our Story", slug: "" },
    { id: 2, label: "Benefits", slug: "" },
    { id: 3, label: "Team", slug: "" },
    { id: 4, label: "Careers", slug: "" },
];
export const footerHelp = [
    { id: 1, label: "FAQs", slug: "" },
    { id: 2, label: "Contact Us", slug: "" },
];

export const navMenu = [
    { id: 1, label: "Profile", slug: "profile" },
    { id: 2, label: "Orders", slug: "orders" },
    { id: 3, label: "Webinars", slug: "webinars" },
];
