import React from 'react';
import {logOut} from "../../utils/_data";
import './header.css';
const Header = () =>{
    return(
        <div>
            <nav class="navbar navbar-light bg-light">
              <a class="navbar-brand" href="/dashboard">Home</a>
              <button onClick={() =>logOut()} class="navbar-brand logout">Log Out</button>
            </nav>
        </div>
    )
}
export default Header;
