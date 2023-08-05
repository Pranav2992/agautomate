import ENDPOINT from '../../apiservices/apiendpoints';
import NETWORK from '../../apiservices/apinetworkcall';
import { LOGIN_API, FORGOT_PASSWORD_API, USER_REGISTER_API, GET_ALL_FARM_API, GET_GRAPH_DATA_API, SEND_COORDINATE_API, USER_LOGGED, SHOW_MODAL, SHOW_PROGRESS, ADD_FARM_API } from '../types';
import AsyncStorage from "@react-native-async-storage/async-storage";
import store from '../index'

export const userLogin = (data) => async dispatch => {
    try {
        // console.log('called userLogin === ', data);
        let result = await NETWORK(ENDPOINT.LOGIN, 'POST', data);
        console.log('userLogin result === ', result);
        if (result.status === 200) {
            dispatch({ type: LOGIN_API, apiResponse: true });
            dispatch({ type: USER_LOGGED, userLogged: true });
            await dispatch({ type: SHOW_PROGRESS, isProgressShow: false });
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
        if (result.status === 200) {
            await dispatch({ type: SHOW_PROGRESS, isProgressShow: false });
            return result;
        } else {
            await dispatch({ type: SHOW_PROGRESS, isProgressShow: false });
            return result;
        }
    } catch (exception) {
        console.log('exception === ', exception);
        await dispatch({ type: SHOW_PROGRESS, isProgressShow: false });
        return exception;
    }
};

export const forgotPassword = (data) => async dispatch => {
    try {
        console.log('called userLogin === ', data);
        let result = await NETWORK(ENDPOINT.FORGOT_PASSWORD, 'POST', data);
        console.log('userLogin result === ', result);
        if (result.status == 200) {
            await dispatch({ type: SHOW_PROGRESS, isProgressShow: false });
            return true;
        } else {
            await dispatch({ type: SHOW_PROGRESS, isProgressShow: false });
            return false;
        }
    } catch (exception) {
        console.log('exception === ', exception);
        await dispatch({ type: SHOW_PROGRESS, isProgressShow: false });
        return false;
    }
};


export const sendCoordinates = (data) => async dispatch => {
    try {
        let result = await NETWORK(ENDPOINT.SEND_COORDINATE, 'POST', data);
        console.log('sendCoordinates result ==', result.status);
        if (result.status === 200) {

            await dispatch({ type: SEND_COORDINATE_API, apiResponse: result.data });
            await dispatch({ type: SHOW_PROGRESS, isProgressShow: false });
            await dispatch({ type: SHOW_MODAL, isShowModal: true })
            return result;
        } else {
            await dispatch({ type: SHOW_PROGRESS, isProgressShow: false });
            return result;
        }
    } catch (exception) {
        await dispatch({ type: SHOW_PROGRESS, isProgressShow: false });
        return exception;
    }
}

export const accountActivation = (data) => async dispatch => {
    try {
        let result = await NETWORK(ENDPOINT.ACTIVATE_ACCOUNT, 'POST', data);
        console.log('accountActivation result ==', result.data);
        if (result.status == 200) {
            await dispatch({ type: SHOW_PROGRESS, isProgressShow: false });
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

export const getGraphData = (userID, month, year, parameterID, farmID, data) => async dispatch => {
    try {
        let result = await NETWORK(`${ENDPOINT.GET_ANALYTICS_REPORTS_BYFARMERID}/${userID}/${month}/${year}/${parameterID}/${farmID}`, 'GET', data);
        console.log('getGraphData result ==', result.data);
        if (result.status == 200) {
            await dispatch({ type: GET_GRAPH_DATA_API, apiResponse: result.data });
            await dispatch({ type: SHOW_PROGRESS, isProgressShow: false });
            return { apiCallSuccess: true, apiResponse: result.data };
        } else {
            await dispatch({ type: SHOW_PROGRESS, isProgressShow: false });
            return false;
        }
    } catch (exception) {
        await dispatch({ type: SHOW_PROGRESS, isProgressShow: false });
        return false;
    }
}

export const addFarm = (data) => async dispatch => {
    try {

        let result = await NETWORK(ENDPOINT.ADD_FARM, 'POST', data);
        console.log('addOrUpdateFarm result ==', result.data);
        if (result.status == 200) {
            await dispatch({ type: ADD_FARM_API, apiResponse: result.data });
            await dispatch({ type: SHOW_PROGRESS, isProgressShow: false });
            dispatch(farmList({ "authToken": data.authToken }));
            return result;
        } else {
            await dispatch({ type: SHOW_PROGRESS, isProgressShow: false });
            return false;
        }
    } catch (exception) {
        await dispatch({ type: SHOW_PROGRESS, isProgressShow: false });
        return false;
    }
}

export const updateFarm = (data) => async dispatch => {
    try {
        let result = await NETWORK(ENDPOINT.UPDATE_FARM + `/${data.id}`, 'POST', data);
        console.log('updateFarm result ==', result.data);
        if (result.status == 200) {
            await dispatch({ type: ADD_FARM_API, apiResponse: result.data });
            await dispatch({ type: SHOW_PROGRESS, isProgressShow: false });
            dispatch(farmList({ "authToken": data.authToken }));
            return result;
        } else {
            await dispatch({ type: SHOW_PROGRESS, isProgressShow: false });
            return false;
        }
    } catch (exception) {
        await dispatch({ type: SHOW_PROGRESS, isProgressShow: false });
        return false;
    }
}

export const farmList = (data) => async dispatch => {
    try {
        let result = await NETWORK(ENDPOINT.GET_ALL_FARM, 'GET', data);
        // console.log('get farms result ==', result.data);
        if (result.status == 200) {
            await dispatch({ type: GET_ALL_FARM_API, apiResponse: result.data });
            await dispatch({ type: SHOW_PROGRESS, isProgressShow: false });
            return { apiCallSuccess: true, apiResponse: result.data };
        } else {
            await dispatch({ type: SHOW_PROGRESS, isProgressShow: false });
            return false;
        }
    } catch (exception) {
        await dispatch({ type: SHOW_PROGRESS, isProgressShow: false });
        return false;
    }
}