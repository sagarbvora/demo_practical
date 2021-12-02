import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom'
import {Button, Card, Checkbox, Col, DatePicker, Form, Input, message, Modal, Radio, Row, Select} from 'antd';
import {UserOutlined, LockOutlined, MailOutlined} from '@ant-design/icons';
import moment from "moment";
import { initial, numOfBranch } from './Constant'
import {register, updateUser} from "../../../utils/_data";

const {Option} = Select;

const UserModal =(props)=>{
    const {
        title,
        isModalVisible,
        handleOk,
        handleCancel,
        userRecord,
        isEdit,
        findAllUsers,
        allUsers
    } = props;

    const [userDetail, setUserDetail] = React.useState(isEdit ? userRecord : initial);
    const [errors, setValidation] = React.useState({});
    const history = useHistory();

    const handleChange = (event, date, dateString) => {
        const {name, value, checked} = event.target;
        if (name === 'dateOfBirth'){
            setUserDetail({
                ...userDetail,
                [name]: date
            });
        } else{
            setUserDetail({
                ...userDetail,
                [name]: name === "isRegistered" ? checked : value
            });
        }
    };

    const validate = (name, value) => {
        const emailRegx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ig;
        switch (name) {
            case 'name':
                if (!value) return "First Name is required";
                return null;
            case 'rollNo':
                if (!value) return "Last Name is required";
                return null;
            case 'email':
                if (!emailRegx.test(value)) return "Email is required";
                return null;
            case 'dateOfBirth':
                if (!value) return "Date of birth is required";
                return null;
            case 'gender':
                if (!value) return "Gender is required";
                return null;
            case 'branch':
                if (!value) return "branch is required";
                return null;
            case 'password':
                if (!value) {
                    return "Password is required"
                } else if (!value >= 6) {
                    return "Password is must be 6 character or more"
                } else {
                    return null
                }
            default:
                return null;
        }
    };

    const handleSubmit = async () => {
        let errorsObj = {};
        Object.keys(userDetail).forEach((key) => {
            const error = validate(key, userDetail[key]);
            if (error && error.length) {
                errorsObj[key] = error;
            }
        });
        if (Object.keys(errorsObj).length > 0) {
            return setValidation(errorsObj);
        } else {
            let res = {};
            if(isEdit) {
            const payload = {
                branch: userDetail.branch,
                dateOfBirth: userDetail.dateOfBirth,
                email: userDetail.email,
                gender: userDetail.gender,
                name: userDetail.name,
                rollNo: userDetail.rollNo,
            };
                res = await updateUser(userRecord.id, payload);
            } else{
                res = await register(userDetail);
            }
            if (res.success) {
                message.success(isEdit ? "Edit Record Successfully" : "Register Successfully");
                if (isEdit) await findAllUsers();
                if (!isEdit) history.push("/login");
                setUserDetail({});
                setValidation({});
                handleCancel(false);
            } else {
                console.log("something went wrong");
            }
        }
    };

    const body = (
        <div>
            <Row>
                {/*<Col span={8}/>*/}
                <Col span={24}>
                    <Card className="card_formate mt-3">
                        <Form>
                            <Form.Item>
                                <Input name="name" placeholder="Please Input Your Name!"
                                       value={userDetail.name}
                                       addonBefore={<UserOutlined/>} onChange={handleChange}/>
                                <span className="text-danger">{errors.name || ""}</span>
                            </Form.Item>
                            <Form.Item>
                                <Input name="rollNo" placeholder="Please Input Your Roll Number!"
                                       value={userDetail.rollNo}
                                       addonBefore={<UserOutlined/>} onChange={handleChange}/>
                                <span className="text-danger">{errors.rollNo || ""}</span>
                            </Form.Item>
                            <Form.Item>
                                <Select
                                    className="select-type"
                                    allowClear
                                    placeholder="Please select your branch"
                                    style={{width: '100%'}}
                                    value={userDetail.branch === "" ? null : userDetail.branch}
                                    onChange={value => handleChange({target: {name: "branch", value}})}
                                >
                                    {
                                        numOfBranch && numOfBranch.map((item, index) =>
                                            <Option key={index}
                                                    value={item.value}>{item.label}</Option>
                                        )
                                    }
                                </Select>
                                <span className="text-danger">{errors.branch || ""}</span>
                            </Form.Item>
                            <Form.Item>
                               <DatePicker
                                   name="dateOfBirth"
                                   placeholder="Please select your DOB"
                                   style={{ width: "100%" }}
                                   defaultValue={userDetail && userDetail.dateOfBirth && moment(userDetail.dateOfBirth,"DD/MM/YYYY")}
                                   format={"DD/MM/YYYY"}
                                   onChange={(value, date, dateString) =>handleChange({target: {name: "dateOfBirth", value}}, date, dateString)}
                               />
                                <span className="text-danger">{errors.dateOfBirth || ""}</span>
                            </Form.Item>
                            { !isEdit &&
                                <>
                                    <Form.Item>
                                        <Input name="email" type="email" placeholder="Please Input Your email!"
                                               value={userDetail.email}
                                               addonBefore={<MailOutlined/>} onChange={handleChange}/>
                                        <span className="text-danger">{errors.email}</span>
                                    </Form.Item>
                                    <Form.Item>
                                        <Input.Password name="password" addonBefore={<LockOutlined/>}
                                                        id="password" value={userDetail.password || ""}
                                                        onChange={handleChange}/>
                                        <span className="text-danger">{errors.password || ""}</span>
                                    </Form.Item>
                                </>
                            }
                            <Form.Item>
                                <Radio.Group name="gender" onChange={e => handleChange({
                                    target: {
                                        name: "gender",
                                        value: e.target.value
                                    }
                                })}
                                             value={userDetail.gender || ""}>
                                    <Radio value="Male">Male</Radio>
                                    <Radio value="Female">Female</Radio>
                                    <Radio value="Other">Other</Radio>
                                </Radio.Group>
                                <p className="text-danger">{errors.gender || ""}</p>
                            </Form.Item>
                            {!isEdit && <Form.Item>
                                <Checkbox name="isRegistered" checked={userDetail.isRegistered} onChange={handleChange}/> Already Register
                            </Form.Item>}
                            <Form.Item>
                                <div className="d-flex justify-content-center">
                                    <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                                        {isEdit ? 'Edit' : 'Sign Up'}
                                    </Button>
                                </div>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
                {/*<Col span={8}/>*/}
            </Row>
        </div>
    )
    return (
        <Modal
            title={isEdit ? 'Edit User' : 'Registration'}
            visible={isModalVisible}
            footer={null}
            onCancel={()=>handleCancel(false)}
            maskClosable={false}
        >
            {body}
        </Modal>
    )
}

export default UserModal;