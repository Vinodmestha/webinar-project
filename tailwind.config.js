/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#775AFC",
                secondary: "#A44CEE",
                tertiary: "#FF847F",
                primaryBtn: "#775AFC",
                black1: "#252525",
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
        },
    },
    plugins: [],
};
