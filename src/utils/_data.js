import axios from 'axios'
import { getFromStorage } from "../utils/common";
import utils from "../utils/index";
const config = () => ({
    headers: {
        Authorization: 'Bearer'+ ' ' +getFromStorage("token"),
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

export async function login(data) {
    try {
        const url = utils.hostURL('login');
        const res = await axios.post(url, data, config());
        return { success: true, data: res.data  }
    } catch(e) {
        return {success: false, msg: "something went wrong"}
    }
}
export async function register(data) {
    try {
        const url = utils.hostURL('register');
        const res = await axios.post(url, data, config());
        return { success: true, data: res.data  }
    } catch(e) {
        return {success: false, msg: "something went wrong"}
    }
}

export async function logOut() {
    localStorage.clear();
    window.location.href = '/login'
}

export async function updateUser(id, data) {
    try {
        const url = utils.hostURL(`updateUser/${id}`);
        const res = await axios.put(url, data, config());
        return { success: true, data: res.data  }
    } catch(e) {
        return {success: false, msg: "something went wrong"}
    }
}
export async function getAllUsers() {
    try {
        const url = utils.hostURL(`getAllUsers`);
        const res = await axios.get(url, config());
        return { success: true, data: res.data  }
    } catch(e) {
        return {success: false, msg: "something went wrong"}
    }
}
export async function getUserById(email) {
    try {
        const url = utils.hostURL(`getUserById/${email}`);
        const res = await axios.get(url, config());
        return { success: true, data: res.data  }
    } catch(e) {
        return {success: false, msg: "something went wrong"}
    }
}
export async function deleteUser(id) {
    try {
        const url = utils.hostURL(`deleteUser/${id}`);
        const res = await axios.delete(url, config());
        return { success: true, data: res.data  }
    } catch(e) {
        return {success: false, msg: "something went wrong"}
    }
}