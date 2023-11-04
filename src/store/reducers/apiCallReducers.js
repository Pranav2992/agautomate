/* Created By Pranav  */

import {
  LOGIN_API,
  ADD_FARM_API,
  USER_REGISTER_API,
  FORGOT_PASSWORD_API,
  SEND_COORDINATE_API,
  GET_GRAPH_DATA_API,
  GET_ALL_FARM_API,
  ADD_CROP_DETAILS,
  GET_ALL_CROP,
  GET_ALL_CROP_DETAILS,
  GET_CROP_VARIETY
} from '../types';

const initialState = {
  loginResponse: false,
  userRegisterResponse: false,
  forgotPasswordResponse: false,
  sendCoordinatesResponse: null,
  addFarmResponse: null,
  getGraphDataResponse: [],
  farmList: [],
  cropList: [],
  cropDetailsList: [],
  addCropDetailsResponse: null,
  cropVarietyList: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_API:
      console.log(
        '================================LOGIN_API=========================================',
      );
      return {
        ...state,
        loginResponse: action.apiResponse,
      };
    case USER_REGISTER_API:
      return {
        ...state,
        userRegisterResponse: action.apiResponse,
      };
    case FORGOT_PASSWORD_API:
      return {
        ...state,
        forgotPasswordResponse: action.apiResponse,
      };
    case SEND_COORDINATE_API:
      console.log('comes in SEND_COORDINATE_API ');
      return {
        ...state,
        sendCoordinatesResponse: action.apiResponse,
      };
    case GET_GRAPH_DATA_API:
      return {
        ...state,
        getGraphDataResponse: action.apiResponse,
      };
    case ADD_FARM_API:
      return {
        ...state,
        addFarmResponse: action.apiResponse,
      };
    case GET_ALL_FARM_API:
      return {
        ...state,
        farmList: action.apiResponse,
      };
    case ADD_CROP_DETAILS:
      return {
        ...state,
        addCropDetailsResponse: action.apiResponse,
      };
    case GET_ALL_CROP:
      return {
        ...state,
        cropList: action.apiResponse,
      };
    case GET_ALL_CROP_DETAILS:
      return {
        ...state,
        cropDetailsList: action.apiResponse,
      };
    case GET_CROP_VARIETY: return {
      ...state,
      cropVarietyList: action.apiResponse,
    }
    default:
      return state;
  }
};
