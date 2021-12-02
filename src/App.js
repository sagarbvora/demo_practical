import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import React from 'react';
import Login from "./component/login/Login";
import UserDashBord from "./component/userDashboard/userDashBoard";
import UserView from "./component/userData/index";
import PrivateRoute from "./component/privateRoute/PrivateRoute";
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path="/" component={Login}/>
                    <Route path="/login" component={Login}/>
                    <PrivateRoute path="/dashboard" component={UserDashBord}/>
                    <PrivateRoute path="/userDetails/:id" component={UserView}/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
