//const API_URL = 'http://api.amrutvivah.com/api/'; old one ------ commented by pranav
// const API_URL = 'http://43.205.210.32:8000/api/'
const API_URL="http://34.100.236.39:8000/api/"
export default ENDPOINTS = {
    LOGIN: API_URL + 'login',
    USER_REGISTER: API_URL + 'register',
    FORGOT_PASSWORD: API_URL + 'User/ForgotPasswordLink',
    SEND_COORDINATE: API_URL + 'coordinate',
    ACTIVATE_ACCOUNT: API_URL + 'activate',
    GET_ANALYTICS_REPORTS_BYFARMERID: API_URL + 'get-analytics-reports-byFarmerId',
    ADD_FARM: API_URL + 'add-farm',
    UPDATE_FARM: API_URL + 'update-farm',
    GET_ALL_FARM: API_URL + 'getAllFarms',
    ADD_CROP_DETAILS:API_URL+'add-crop-details',
    GET_ALL_CROP:API_URL+'get-crops',
    GET_ALL_CROP_DETAILS:API_URL+'get-crops-details'

}