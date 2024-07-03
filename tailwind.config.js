/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#ff57221c",
                secondary: "#906ad41f",
                tertiary: "#0077b6",
                bgHero: "#f4f5f7",
                // textColor: "#3c096c",
                textColor: "#010101",
                primaryBtn: "#023e8a",
                h2Color: "#f1f1f1",
                bg1: "#011627",
                black1: "#252525",
                blue1: "#5C98F2",
                btnColor2: "#023e8a",
                blue2: "#F2F1FD",
                orange1: "#ff5722",
                orange2: "#ff57221c",
                purple1: "#906ad4",
                purple2: "#906ad41f",
                green1: "#7cbf2f",
                green2: "#7cbf2f1f",
                light1: "#fff0f3",
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
