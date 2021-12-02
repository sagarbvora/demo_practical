import {actionTypes} from "../../type/Userdashboard";
import {act} from "@testing-library/react";

const initalState = {
    isLoading: false,
    isError: false,
    users: {}
};

const {USER_DASHBOARD} = actionTypes;
const userDashboardReducer = (state = initalState, action) => {
    const {FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAILURE} = USER_DASHBOARD;
    console.log("payload",action.payload)
    switch (action.type) {
        case FETCH_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case FETCH_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true
            };
        case FETCH_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                users: action.payload
            };
        default:
            return state;
    }
};

export default userDashboardReducer;

/** SELECTORS FUNCTION*/

export const getUserDashboardData = (state) => state?.users