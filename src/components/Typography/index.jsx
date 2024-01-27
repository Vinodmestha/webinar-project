export const H1 = ({ children, className }) => {
    return (
        <h1
            className={`text-7xl [letter-spacing:0.4px] leading-[5.3rem] font-axiSemiBold ${className}`}
        >
            {children}
        </h1>
    );
};

export const H2 = ({ children, className }) => {
    return (
        <h2
            className={`flex flex-col items-center text-[40px] !mb-5 font-axiSemiBold ${className}`}
        >
            {children}
            <p className="w-36 h-[4px] bg-tertiary rounded-full -mt-1" />
        </h2>
    );
};

export const H5 = ({ children, className }) => {
    return (
        <h5
            className={`text-[15px] font-axiMedium my-4 text-gray-600 ${className}`}
        >
            {children}
        </h5>
    );
};

export const SubHeading = ({ children, className }) => {
    return (
        <h5
            className={`max-w-screen-lg mx-auto text-[17px] font-medium text-center text-gray-500 ${className}`}
        >
            {children}
        </h5>
    );
};
