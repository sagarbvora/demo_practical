import {actionTypes} from '../../type/login'
import {login} from "../../../utils/_data";

const {USER_LOGIN} = actionTypes;

export const userDetails = (data) => async (dispatch) =>{
    const {FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAILURE} = USER_LOGIN;
    console.log("Hello")
    try {
        dispatch({
           type: FETCH_REQUEST,
        });
        const res = await login(data);
        console.log("res----1111>>>", res.success);
        if (res.success){
            console.log("success---->>>", res.data);
            dispatch({
                type: FETCH_SUCCESS,
                payload: res && res.data && res.data.result
            });
            return res;
        }
    } catch (e) {
        dispatch({
            type: FETCH_FAILURE,
            payload: e
        });
        return null;
    }
};
