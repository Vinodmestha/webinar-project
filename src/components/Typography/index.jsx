export const H1 = ({ children, className }) => {
    return (
        <h1
            className={`text-[54px] lg:text-7xl [letter-spacing:0.5px] leading-[3.8rem] lg:leading-[5.3rem] font-bold lg:font-axiSemiBold text-textColor ${className}`}
        >
            {children}
        </h1>
    );
};

export const H2 = ({ children, className, ...props }) => {
    return (
        <h2
            className={`flex flex-col items-center text-3xl lg:text-[33px] mb-5 !font-axiSemiBold text-textColor ${className}`}
        >
            {children}
            {props?.underline === false ? null : (
                <p className="w-36 h-[4px] bg-tertiary rounded-full mt-1" />
            )}
        </h2>
    );
};

export const H3 = ({ children, className }) => {
    return (
        <h3
            className={`text-2xl mb-3 font-axiSemiBold text-textColor ${className}`}
        >
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
        <h5 className={`text-[15px] font-axiMedium text-whit ${className}`}>
            {children}
        </h5>
    );
};
export const H6 = ({ children, className }) => {
    return (
        <h5 className={`text-[14px] font-axiSemiBold ${className}`}>
            {children}
        </h5>
    );
};
export const SubHeading = ({ children, className, ...props }) => {
    return (
        <h3
            className={`max-w-screen-lg mx-auto text-[18px] font-medium text-center text-gray-500 ${className}`}
            {...props}
        >
            {children}
        </h3>
    );
};
export const CustomP = ({ children, className, ...props }) => {
    return (
        <h3 className={`text-[17px] font-axiSemiBold ${className}`} {...props}>
            {children}
        </h3>
    );
};

export const Mail = ({ children, className }) => {
    return (
        <a
            className={`text-xl font-axiSemiBold w-fit ${className}`}
            href="mailto:ggcs@globalgarner.com"
        >
            {children}
        </a>
    );
};
export const Telephone = ({ children, className }) => {
    return (
        <a
            className={`text-xl font-axiSemiBold w-fit ${className}`}
            href="tel:+916354917511"
        >
            {children}
        </a>
    );
};
