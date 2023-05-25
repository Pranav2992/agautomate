import ENDPOINT from '../../apiservices/apiendpoints';
import NETWORK from '../../apiservices/apinetworkcall';
import { LOGIN_API, FORGOT_PASSWORD_API, USER_REGISTER_API, SEND_COORDINATE_API } from '../types';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const userLogin = (data) => async dispatch => {
    try {
        console.log('called userLogin === ', data);
        let result = await NETWORK(ENDPOINT.LOGIN, 'POST', data);
        console.log('userLogin result === ', result.status);
        if (result.status == 200) {
            dispatch({ type: LOGIN_API, apiResponse: true });
            AsyncStorage.setItem('accessToken', 'Token ' + result.data.token);
            AsyncStorage.setItem('userId', (result.data.user.id).toString());
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


export const sendCoordinates = (data) => async dispatch => {
    try {
        console.log('sendCoordinates data ==', data)
        let result = await NETWORK(ENDPOINT.SEND_COORDINATE, 'POST', data);
        console.log('sendCoordinates result ==', result.data);
        if (result.status == 200) {
            return true;
        } else {
            return false;
        }
    } catch (exception) {

    }
}