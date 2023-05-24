import ENDPOINT from '../../apiservices/apiendpoints';
import NETWORK from '../../apiservices/apinetworkcall';

export const userLogin = (data) => async dispatch => {
    try {
        console.log('called userLogin === ', data);
        let result = await NETWORK(ENDPOINT.LOGIN, 'POST', data);
        console.log('userLogin result === ', result);
        if (result.status == 200) {
            return true;
        } else {
            console.log("null callll.....")
            return false;
        }
    } catch (exception) {
        console.log('exception === ', exception);
        return false;
    }
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

export const forgotPassword = (data) => async dispatch => {
    try {
        console.log('called userLogin === ', data);
        let result = await NETWORK(ENDPOINT.FORGOT_PASSWORD, 'POST', data);
        console.log('userLogin result === ', result);
        if (result.status == 200) {
            return true;
        } else {
            return false;
        }
    } catch (exception) {
        console.log('exception === ', exception);
    }
};