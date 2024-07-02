import twitter from "../assets/icons/twitter.svg";
import facebook from "../assets/icons/facebook.svg";
import linkedin from "../assets/icons/linkedin.svg";
import instagram from "../assets/icons/instagram.svg";

import upcoming from "../assets/vectors/upcoming.svg";
import preRecorded from "../assets/vectors/preRecorded.svg";
import onDemand from "../assets/vectors/onDemand.svg";
import ceuApproved from "../assets/vectors/ceuApproved.svg";

import journalWhills from "../assets/icons/journal-whills.svg";
import businessTime from "../assets/icons/business-time.svg";
import userShield from "../assets/icons/user-shield.svg";

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

//hero
export const heroHighlights = [
    {
        id: 1,
        icon: journalWhills,
        label: "20+ Webinars",
        border: "border-[#ff5722]",
        bg: "bg-[#ff57221c]",
        desc: "Duis aute irure dolor in voluptate velit esse cillum labore .",
    },
    {
        id: 2,
        icon: businessTime,
        label: "Lifetime Access",
        border: "border-[#906ad4]",
        bg: "bg-[#906ad41f]",
        desc: "Duis aute irure dolor in voluptate velit esse cillum labore .",
    },
    {
        id: 3,
        icon: userShield,
        label: "1k+ Enrolled",
        border: "border-[#7cbf2f]",
        bg: "bg-[#7cbf2f1f]",
        desc: "Duis aute irure dolor in voluptate velit esse cillum labore .",
    },
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
