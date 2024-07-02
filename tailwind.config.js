/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#b100e8",
                secondary: "#e0aaff",
                tertiary: "#9d4edd",
                bgHero: "#f4f5f7",
                textColor: "#7b2cbf",
                primaryBtn: "#9d4edd",
                h2Color: "#f1f1f1",
                bg1: "#011627",
                black1: "#252525",
                blue1: "#5C98F2",
                btnColor2: "#7b2cbf",
                blue2: "#F2F1FD",
            },
            borderRadius: {
                type1: "30% 70% 70% 30% / 30% 29% 71% 70%",
                type2: "84% 16% 52% 48% / 86% 68% 32% 14%",
            },
            fontFamily: {
                axiforma: "axiformaRegular",
                axiMedium: "axiformaMedium",
                axiSemiBold: "axiformaSemiBold",
            },
            animation: {
                fadeInDown: "fadeInDown 0.4s",
                fadeUp: "fadeUp 0.15s forwards",
            },
            keyframes: {
                fadeInDown: {
                    from: {
                        opacity: 0,
                        transform: "translate3d(0, -20%, 0)",
                    },
                    to: {
                        opacity: 1,
                        transform: "translate3d(0, 0, 0)",
                    },
                },
                fadeUp: {
                    "0%": { bottom: "0%" },
                    "25%": { bottom: "5%" },
                    "50%": { bottom: "10%" },
                    "75%": { bottom: "15%" },
                    "100%": { bottom: "20%" },
                },
            },
            backgroundImage: {
                authBg: "url('../src/vectors/authBg.jpg')",
            },
        },
    },
    plugins: [],
};
