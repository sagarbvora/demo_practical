import {actionTypes} from "../../type/login";

const initalState = {
    isLoading: false,
    isError: false,
    users: {}
};

const {USER_LOGIN} = actionTypes;
const loginReducer = (state = initalState, action) => {
    const {FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAILURE} = USER_LOGIN;
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

export default loginReducer;