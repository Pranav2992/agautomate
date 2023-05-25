/* Created By Pranav  */

import { LOGIN_API, USER_REGISTER_API, FORGOT_PASSWORD_API } from "../types";

const initialState = {
    loginResponse: false,
    userRegisterResponse: false,
    forgotPasswordResponse: false,
}

export default (state = initialState, action) => {
    switch (action) {
        case LOGIN_API:
            return {
                ...state,
                loginResponse: action.apiResponse
            }
        case USER_REGISTER_API:
            return {
                ...state,
                userRegisterResponse: action.apiResponse
            }
        case FORGOT_PASSWORD_API:
            return {
                ...state,
                forgotPasswordResponse: action.apiResponse
            }
        default:
            return state;
    }
}