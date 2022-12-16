import { getter } from '@progress/kendo-react-common';

const emailRegex: RegExp = new RegExp(/\S+@\S+\.\S+/);
const phoneRegex: RegExp = new RegExp(/^[0-9 ()+-]+$/);

export const emailValidator = (value: string) => !value ?
    "Email field is required." :
    (emailRegex.test(value) ? "" : "Email is not in a valid format.");
export const userNameValidator = (value: string) => !value ?
    "User Name is required" :
    value.length < 5 ? "User name should be at least 5 characters long." : "";
export const phoneValidator = (value: string) => !value ?
    "Phone number is required." :
    phoneRegex.test(value) ? "" : "Not a valid phone number.";

export const requiredValidator = (value: string) => value ? "" : "Error: This field is required.";
export const passwordValidator = (value: string) => value && value.length > 8 ? '' : 'Password must be at least 8 symbols.';


const userNameGetter = getter('username');
const emailGetter = getter('email');

export const formValidator = (values: any) => {
    const userName = userNameGetter(values);
    const emailValue = emailGetter(values);

    if (userName && emailValue && emailRegex.test(emailValue)) {
        return {};
    }

    return {
        VALIDATION_SUMMARY: 'Please fill in the following fields.',
        ['username']: !userName ? 'User Name is required.' : '',
        ['email']: emailValue && emailRegex.test(emailValue) ? '' : 'Email is required and should be in a valid format.'
    };
};