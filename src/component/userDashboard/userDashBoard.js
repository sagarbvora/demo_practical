import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {Row, Col, Input, message, Popconfirm, Table} from 'antd';
import { deleteUser } from "../../utils/_data";
import {getFromStorage} from "../../utils/common";
import "./dashboard.css";
import Header from "../header";
import UserModal from "../Common/UserModal";
import {userDashboardData} from '../../redux/action/UserDashboard'
import {connect} from 'react-redux';
import {getUserDashboardData} from '../../redux/reducer'

const { Search } = Input;

const UserDashBord = ({userDashboardDataAction,userDashboardData}) => {

    const [allUsers, setAllUsers] = useState([]);
    const [duplicate, setDuplicate] = useState([]);
    const [userRecord, setUserRecord] = useState({});
    const [isEdit, setEdit] = useState(false);
    const history = useHistory();
    const [isOpen, setIsOpen] = useState(false);
    const email = getFromStorage('email');

    const handleModal = (value) =>{
        setIsOpen(value);
    };
    const handleCancel = (value) =>{
        setIsOpen(value);
        setEdit(!value);
    };
    const handleEdit = (data) =>{
        setEdit(true);
        setUserRecord(data)
        handleModal(true);
    };

    useEffect( () => {
         userDashboardDataAction();
    }, []);

    useEffect(()=>{
        findAllUsers()
    },[userDashboardData]);


    const findAllUsers = async () =>{
        if (userDashboardData.length > 0) {
        let filterArray = [];
            const filter = userDashboardData.filter(item => item.email === email);
            if (filter.length > 0) {
                userDashboardData.unshift(filter[0]);
                filterArray = userDashboardData.length && [...new Set(userDashboardData)];
            } else {
                filterArray = userDashboardData
            }
            setAllUsers(filterArray);
            setDuplicate(filterArray);
        } else {
            console.log("error--->>>")
        }
    };
    const handleDelete = async (data) =>{
        const res = await deleteUser(data.id);
        if (res.success){
            message.success('Your record deleted Successfully');
            history.push('/');
            localStorage.clear();
        } else {
             message.error('something went wrong!');
        }
    };
    const onUserView = (data) =>{
        history.push({pathname: `/userDetails/${data.id}`})
    };
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
        key: 'name',
      },
      {
        title: 'Roll No.',
        dataIndex: 'rollNo',
        key: 'rollNo',
      },
      {
        title: 'Branch',
        dataIndex: 'branch',
        sorter: (a, b) => a.branch.length - b.branch.length,
        key: 'branch'
      },
      {
        title: 'Gender',
        dataIndex: 'gender',
        sorter: (a, b) => a.gender.length - b.gender.length,
        key: 'gender'
      },
      {
        title: 'Email',
        dataIndex: 'email',
        sorter: (a, b) => a.email.length - b.email.length,
        key: 'email'
      },
      {
        title: 'Date of Birth',
        dataIndex: 'dateOfBirth',
        key: 'dateOfBirth'
      },
      {
        title: 'Action',
        dataIndex: '',
        key: 'key',
        width: '270px',
        render: (record) =>{
            const filterRecord = record.email === getFromStorage('email');
            return (<div key={record.key}>
                <button className="btn btn-primary" onClick={() =>onUserView(record)}>View</button>&nbsp;
                {filterRecord &&
                    <>
                        <button className="btn btn-primary" onClick={() =>handleEdit(record)}>Edit</button> &nbsp;
                            <Popconfirm placement="top" title={'Are you sure delete this record ?'} onConfirm={() =>handleDelete(record)} okText="Yes" cancelText="No">
                                    <button className="btn btn-danger">Delete</button>
                            </Popconfirm>
                    </>
                }
            </div>)
        }
      },
    ];

    let data = [];
    allUsers && allUsers.length && allUsers.map((item, i) =>{
        data.push({
            key: i+1,
            id: item._id || "",
            name: item.name || "",
            rollNo: item.rollNo || "",
            branch: item.branch || "",
            gender: item.gender || "",
            email: item.email || "",
            dateOfBirth: item.dateOfBirth || ""
        })
    });
    const onSearch = (value) =>{
        let filterRecord = duplicate || [];
        if(value != '') {
            filterRecord = filterRecord.filter(character => {
                if ((character.name.toLowerCase().includes(value))) return true;
                else return false;
            });
        }
        setAllUsers(filterRecord || [])
    };
    return (
        <div className="dashboard">
            {getFromStorage('token') && <Header/>}
            <Row>
                <Col span={4}/>
                <Col span={16}>
                    <Row>
                        <Col sm={12} />
                        <Col sm={12} >
                            <div className="mt-2 mb-2">
                                <Search placeholder="input search text" onSearch={onSearch} enterButton />
                            </div>
                        </Col>
                    </Row>
                    <Table
                        dataSource={data || []}
                        pagination={data.length > 5 ? true : false}
                        columns={columns} />
                </Col>
                <Col span={4}/>
            </Row>
            {isOpen &&
            <UserModal
                isModalVisible = {isOpen}
                handleOk={handleModal}
                handleCancel={handleCancel}
                userRecord={userRecord}
                findAllUsers={findAllUsers}
                isEdit={isEdit}
            />
            }
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        userDashboardData : getUserDashboardData(state)
    }
};

const mapDispatchToProps = {
    userDashboardDataAction: userDashboardData,
};
export default connect(mapStateToProps, mapDispatchToProps)(UserDashBord);