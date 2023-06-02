/* -------- Created by Pranav on 30-05-2023 ------- */
import { USER_LOGGED, SHOW_MODAL } from "../types";

const initialState = {
    userLogged: false,
    isShowModal: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGGED:
            return {
                ...state,
                userLogged: action.userLogged
            }
        case SHOW_MODAL:
            return {
                ...state,
                isShowModal: action.isShowModal
            }
        default:
            return state;
    }
}