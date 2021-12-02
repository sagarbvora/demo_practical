import React, {useState, useEffect} from 'react';
import { getUserById } from "../../utils/_data";
import {getFromStorage} from "../../utils/common";
import Header from "../header";
import './userData.css';
import {Row, Col} from "antd";
const UserView = (props) =>{
    const [userDetails, setUserDetails] = useState({});
    useEffect(() =>{
    console.log("props",props)
        const id = props && props.match && props.match.params && props.match.params.id;
        if (id) getUserDetails(id)
    }, []);
    const getUserDetails = async(id) =>{
        const res = await getUserById(id)
        if (res.success){
            setUserDetails(res.data || {});
        } else{
            console.log("error---->>>>>")
        }
    };
    return(
        <div className=''>
        {getFromStorage('token') && <Header/>}
            <Row>
                <Col md={8} />
                <Col md={8} >
                    <div className="user_view mt-2">
                        <div className="card">
                            <div className="card-body">
                                <div className="card-title">
                                    <h3>User Details</h3>
                                    <hr />
                                </div>
                                <div className="row">
                                    <div className="col-sm-4"><p><b>Name :</b></p></div>
                                    <div className="col-sm-8"><p>{userDetails.name || ""}</p></div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-4"><p><b>Branch :</b></p></div>
                                    <div className="col-sm-8"><p>{userDetails.branch || ""}</p></div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-4"><p><b>Roll No. :</b></p></div>
                                    <div className="col-sm-8"><p>{userDetails.rollNo || ""}</p></div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-4"><p><b>Email :</b></p></div>
                                    <div className="col-sm-8"><p>{userDetails.email || ""}</p></div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-4"><p><b>DOB :</b></p></div>
                                    <div className="col-sm-8"><p>{userDetails.dateOfBirth || ""}</p></div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-4"><p><b>Gender :</b></p></div>
                                    <div className="col-sm-8"><p>{userDetails.gender || ""}</p></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col md={8} />
            </Row>

        </div>
    )
}
export default UserView