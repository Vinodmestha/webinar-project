export const H1 = ({ children, className }) => {
    return (
        <h1
            className={`text-7xl [letter-spacing:0.4px] leading-[5.3rem] font-axiSemiBold text-textColor ${className}`}
        >
            {children}
        </h1>
    );
};

export const H2 = ({ children, className }) => {
    return (
        <h2
            className={`flex flex-col items-center text-[40px] mb-5 !font-axiSemiBold text-white ${className}`}
        >
            {children}
            <p className="w-36 h-[4px] bg-tertiary rounded-full -mt-1" />
        </h2>
    );
};

export const H3 = ({ children, className }) => {
    return (
        <h3 className={`text-2xl !mb-3 font-axiSemiBold ${className}`}>
            {children}
        </h3>
    );
};
export const H4 = ({ children, className }) => {
    return (
        <h4 className={`text-lg font-axiSemiBold text-tertiary ${className}`}>
            {children}
        </h4>
    );
};
export const H5 = ({ children, className }) => {
    return (
        <h5 className={`text-[15px] font-axiMedium text-white ${className}`}>
            {children}
        </h5>
    );
};

export const SubHeading = ({ children, className }) => {
    return (
        <h3
            className={`max-w-screen-lg mx-auto text-[18px] font-medium text-center text-gray-400 ${className}`}
        >
            {children}
        </h3>
    );
};

export const Mail = ({ children, className }) => {
    return (
        <a
            className={`text-xl font-semibold text-primar ${className}`}
            href="mailto:ggcs@globalgarner.com"
        >
            {children}
        </a>
    );
};
export const Telephone = ({ children, className }) => {
    return (
        <a
            className={`text-xl font-semibold text-primar ${className}`}
            href="tel:+916354917511"
        >
            {children}
        </a>
    );
};
