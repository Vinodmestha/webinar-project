import React from "react";
import { useCountries } from "use-react-countries";
import {
    Input as InputComponent,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
} from "@material-tailwind/react";

export const Input = (props) => {
    const { countries } = useCountries();
    const [country, setCountry] = React.useState(0);
    const { name, flags, countryCallingCode } = countries[country];

    return (
        <div className="relative flex w-full  ">
            {props?.countryCode ? (
                <Menu placement="bottom-start">
                    <MenuHandler>
                        <Button
                            ripple={false}
                            variant="text"
                            color="blue-gray"
                            className="flex h-10 items-center gap-2 rounded-r-none border border-r-0 border-blue-gray-200 bg-blue-gray-500/10 pl-3"
                        >
                            <img
                                src={flags.svg}
                                alt={name}
                                className="h-4 w-4 rounded-full object-cover"
                            />
                            {countryCallingCode}
                        </Button>
                    </MenuHandler>
                    <MenuList className="max-h-[20rem] max-w-[18rem]">
                        {countries.map(
                            ({ name, flags, countryCallingCode }, index) => {
                                return (
                                    <MenuItem
                                        key={name}
                                        value={name}
                                        className="flex items-center gap-2"
                                        onClick={() => {
                                            setCountry(index),
                                                props?.handleCountry(
                                                    name,
                                                    countryCallingCode
                                                );
                                        }}
                                    >
                                        <img
                                            src={flags.svg}
                                            alt={name}
                                            className="h-5 w-5 rounded-full object-cover"
                                        />
                                        {name}
                                        <span className="ml-auto">
                                            {countryCallingCode}
                                        </span>
                                    </MenuItem>
                                );
                            }
                        )}
                    </MenuList>
                </Menu>
            ) : null}
            <InputComponent
                label={props?.label}
                placeholder={props?.placeholder}
                type={props?.type === "mobile" ? "tel" : props?.type}
                className={`${props?.countryCode ? "rounded-l-none" : ""}`}
                required={props?.required}
                maxLength={props?.countryCode ? 10 : props?.maxLength}
                error={props?.error}
            />
        </div>
    );
};
