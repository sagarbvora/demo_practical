import React, { useState } from 'react';
import {Form, Input, Button, Row, Col, Card, message} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import {useHistory} from 'react-router-dom';
import { setInToStorage } from '../../utils/common'
import {login} from "../../utils/_data";
import Loader from "../Common/Loader";
import UserModal from '../Common/UserModal';
import {userDetails} from '../../redux/action/login'
import {connect} from 'react-redux';
import './login.css';

const Login = ({userDetailsAction}) => {
    const [loginData, setLoginData] = useState({});
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const history = useHistory();

    const handleModal = (value) =>{
        setIsOpen(value);
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setLoginData({...loginData, [name]: value});
    };

    const onLogin = async () => {
        setLoading(true);
        if(loginData.email && loginData.password !== null){
            const res = await userDetailsAction(loginData);
            if (res && res.success){
                message.success("Login Successfully");
//                localStorage.setItem('users', JSON.stringify(res.data.users));
                delete res.data.users;
                setInToStorage(res.data);
                history.push("/dashboard");
            } else {
                message.error("something went wrong!");
            }
        }else{
            message.error("Please Enter Data");
        }
        setLoading(false);
    };
    if (loading) return <Loader/>;
    return (
        <>
            <Row style={{marginTop: 250}}>
                <Col span={8}/>
                <Col span={8}>
                    <Row>
                        <Col span={12}>
                            <Card bordered={false} className="login_card">
                                <h2>Login</h2>
                                <Form>
                                    <Form.Item>
                                        <Input name="email" placeholder="Please Input Your Username!" autoSave="false"
                                               value={loginData.email || ""} onChange={handleChange}
                                               addonBefore={<UserOutlined/>}/>
                                    </Form.Item>

                                    <Form.Item name="passWord">
                                        <Input.Password name="password" placeholder="Please Input Your Password!"
                                                        autoSave="false" value={loginData.password || ""}
                                                        onChange={handleChange} addonBefore={<LockOutlined/>}/>
                                    </Form.Item>
                                    <div className="d-flex justify-content-center">
                                        <Button type="primary" onClick={onLogin}>Login</Button>
                                    </div>
                                </Form>
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card bordered={false} className="register_card">
                                <h2 className="heading2">Sign Up</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.</p><br/>
                                <div className="d-flex justify-content-center">
                                    <Button type="primary"
                                            // onClick={onRegister}
                                            onClick={()=>handleModal(true)}
                                    >
                                        Register Now!
                                    </Button>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </Col>
                <Col span={8} />
            </Row>
            {isOpen &&
                <UserModal
                    title='Register'
                    isModalVisible = {isOpen}
                    handleOk={handleModal}
                    handleCancel={handleModal}
                />
            }
        </>
    );
}

const mapStateToProps = (state) => {

};

const mapDispatchToProps = {
    userDetailsAction: userDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);