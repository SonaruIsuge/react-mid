import {
    SET_NAVBAR_ACTIVEITEM,
} from "../utils/constants"

export const setActiveNavItem = (dispatch, activeNavItem) => {
    dispatch({
        type: SET_NAVBAR_ACTIVEITEM,
        payload: activeNavItem,
    });
}