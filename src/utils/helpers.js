import format from 'string-format';
import numeral from 'numeral';
import messages from '../messages';

export const handleError = (error) => {
    if (error.response) {
        return error.response.data
    } else {
        return { error: error.message }
    }
}

export const getMessage = (search, ...args) => {
    if (messages[search]) {
        const formated = format(messages[search], ...args);
        return formated;
    }

    return format(search, ...args);
}

export const sprintf = (number, format) => {
    return numeral(number).format(format);
}