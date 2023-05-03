import {
    LOGIN_API,
    USER_REGISTER_API,
    FORGOT_PASSWORD_API
} from "../types";

import ENDPOINT from '../../apiservices/apiendpoints';
import NETWORK from '../../apiservices/apinetworkcall';

export const userLogin = () => async dispatch => {

};

export const userRegisteration = (data) => async dispatch => {
    try {
        console.log('called userRegisteration === ', data);
        let result = await NETWORK(ENDPOINT.USER_REGISTER, 'POST', data);
        console.log('userRegisteration result === ', result);
        if (result.status == 200) {
            return true;
        } else {
            return false;
        }
    } catch (exception) {
        console.log('exception === ', exception);
    }
};