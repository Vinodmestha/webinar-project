const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const emailValidator = (email) => {
    return EMAIL_REGEX.test(email);
};
