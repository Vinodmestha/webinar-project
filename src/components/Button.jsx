import redirect from "../assets/icons/redirect.svg";
export const Button = ({ children, className }) => {
    return (
        <button
            className={`group flex items-center gap-3 px-4 py-3 rounded-3xl font-semibold text-white bg-primaryBtn ${className}`}
        >
            <p>{children}</p>
            <img
                src={redirect}
                alt="webinar"
                className="w-6 h-6 group-hover:scale-125 transition-all duration-200"
            />
        </button>
    );
};
