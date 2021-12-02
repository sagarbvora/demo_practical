import { combineReducers } from "redux"
import userLogin from '../reducer/login/login';
import userDashboard, * as userDashboardSelectors from '../reducer/UserDashboard';


export const rootReducer = combineReducers({
    form:{},
    userLogin,
    userDashboard,
});

/** SELECTORS FUNCTION*/

export const getUserDashboardData = (state) =>
    userDashboardSelectors.getUserDashboardData(state.root.userDashboard);