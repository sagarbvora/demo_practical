import {createStore, applyMiddleware, compose} from "redux";

import {rootReducer} from "./redux/reducer";
import thunk from 'redux-thunk';
import { combineReducers } from "redux"

function createRootReducer(asyncReducers) {
    return combineReducers({
        root: rootReducer,
        ...asyncReducers,
    });
}

const store =  createStore(createRootReducer(), compose(applyMiddleware(thunk),   window.__REDUX_DEVTOOLS_EXTENSION__ ?window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : (args) => args ));

export default store;