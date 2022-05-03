import { toast } from 'react-toastify';

export const validateForm = (input) => {

    if (input.id === 'userFullName' && input.value === '') {
        return 'Full Name can not be blank.'
    }

    if (input.id === 'userEmail') {
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

        if (!pattern.test(input.value)) {
            return 'Please enter a valid email address.';
        }
    }

    if (input.id === 'userPassword') {
        const uppercaseRegExp   = /(?=.*?[A-Z])/.test(input.value);
        const lowercaseRegExp   = /(?=.*?[a-z])/.test(input.value);
        const digitsRegExp      = /(?=.*?[0-9])/.test(input.value);;
        const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/.test(input.value);;
        const minLengthRegExp   = /.{4,}/.test(input.value);;

        if (!minLengthRegExp) {
            return 'Password: At least a minimum of 4 characters'
        } else if (!uppercaseRegExp) {
            return 'Password: Include at least one uppercase'
        } else if (!lowercaseRegExp) {
            return 'Password: Include at least one lowercase'
        } else if (!specialCharRegExp) {
            return 'Password: Include at least one specail character'
        }
    }

    return false;
}

export const toastMessages = (type, message) => {
    const toastSettings = {
        position: "top-right",
        autoClose: 5000
    }

    switch(type) {
        case 'error':
            return toast.error(message, toastSettings);
        case 'warning':
            return toast.warning(message, toastSettings);
        case 'success':
            return toast.success(message, toastSettings);
        default:
            return toast(message, toastSettings);
    }
}