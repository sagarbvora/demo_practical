import {actionTypes} from '../../type/Userdashboard'
import {getAllUsers, deleteUser} from "../../../utils/_data";

const {USER_DASHBOARD} = actionTypes;

export const userDashboardData = () => async (dispatch) => {
    const {FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAILURE} = USER_DASHBOARD;
    console.log("Hello");
    try {
        dispatch({
            type: FETCH_REQUEST,
        });
        const res = await getAllUsers();
        // console.log("res---->>>", res);
        if (res.success) {
            console.log("jspomn---->>>", JSON.parse(JSON.stringify(res.data)));
            // console.log("success---->>>", res.data);
            dispatch({
                type: FETCH_SUCCESS,
                payload: res && res.data && JSON.parse(JSON.stringify(res.data))
            });
        }
        return res;
    } catch (e) {
        dispatch({
            type: FETCH_FAILURE,
            payload: e
        })
        return null;
    }
};
