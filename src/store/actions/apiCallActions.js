import ENDPOINT from '../../apiservices/apiendpoints';
import NETWORK from '../../apiservices/apinetworkcall';
import { LOGIN_API, FORGOT_PASSWORD_API, USER_REGISTER_API, GET_GRAPH_DATA_API, SEND_COORDINATE_API, USER_LOGGED, SHOW_MODAL, SHOW_PROGRESS } from '../types';
import AsyncStorage from "@react-native-async-storage/async-storage";
import store from '../index'

export const userLogin = (data) => async dispatch => {
    try {
        // console.log('called userLogin === ', data);
        let result = await NETWORK(ENDPOINT.LOGIN, 'POST', data);
        console.log('userLogin result === ', result.status);
        if (result.status == 200) {
            dispatch({ type: LOGIN_API, apiResponse: true });
            dispatch({ type: USER_LOGGED, userLogged: true });
            AsyncStorage.setItem('isLogged', 'true');
            AsyncStorage.setItem('accessToken', 'Token ' + result.data.token);
            AsyncStorage.setItem('userId', (result.data.user.id).toString());
            return result;
        }
        else {
            AsyncStorage.setItem('isLogged', 'false');
            console.log("null callll.....")
            return result;
        }
    } catch (exception) {
        AsyncStorage.setItem('isLogged', 'false');
        console.log('exception === ', exception);
        return exception;
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
        return false;
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
        return false;
    }
};


export const sendCoordinates = (data) => async dispatch => {
    try {
        let result = await NETWORK(ENDPOINT.SEND_COORDINATE, 'POST', data);
        console.log('sendCoordinates result ==', result.status);
        if (result.status == 200) {

            await dispatch({ type: SEND_COORDINATE_API, apiResponse: result.data });
            await dispatch({ type: SHOW_PROGRESS, isProgressShow: false });
            await dispatch({ type: SHOW_MODAL, isShowModal: true })
            return true;
        } else {
            await dispatch({ type: SHOW_PROGRESS, isProgressShow: false });
            return false;
        }
    } catch (exception) {
        await dispatch({ type: SHOW_PROGRESS, isProgressShow: false });
        return false;
    }
}

export const accountActivation = (data) => async dispatch => {
    try {
        let result = await NETWORK(ENDPOINT.ACTIVATE_ACCOUNT, 'POST', data);
        console.log('accountActivation result ==', result.data);
        if (result.status == 200) {

            return true;
        } else {
            return false;
        }
    } catch (exception) {
        return false;
    }
}

export const getGraphData = (userID, month, year, parameterID, data) => async dispatch => {
    try {
        let result = await NETWORK(`${ENDPOINT.GET_ANALYTICS_REPORTS_BYFARMERID}/${userID}/${month}/${year}/${parameterID}`, 'GET', data);
        console.log('getGraphData result ==', result.data);
        if (result.status == 200) {
            await dispatch({ type: GET_GRAPH_DATA_API, apiResponse: result.data });
            return { apiCallSuccess: true, apiResponse: result.data };
        } else {
            return false;
        }
    } catch (exception) {
        return false;
    }
}