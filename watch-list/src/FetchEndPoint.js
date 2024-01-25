import axios from 'axios';

const apiFetch = axios.create({
    baseURL: 'http://localhost:3001'
});

const REGISTER_URL = '/user/register';
const LOGIN_URL = '/user/login';
const SAVE_TOPIC = '/blog/saveTopic';
const GET_ARTICOLI = '/getArticoli';
const SAVE_ARTICOLO = '/addArticolo';
const DELETE_ARTICOLO = '/deleteArticolo/'

export const login = async (param) => {
    let res = await apiFetch.post(LOGIN_URL, param);
    console.log("USER LOGIN ", res.data);
    localStorage.setItem('token', res.data.token);
    return res;
}

export const register = async (param) => {
    let res = await apiFetch.post(REGISTER_URL, param);
    return res;
}

export const save = async (param) => {
    let res = await apiFetch.post(SAVE_TOPIC, param);
    return res;
}

export const savePost = async (param) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'), // Include this line if using authorization headers
    };
    let res = await apiFetch.post(SAVE_ARTICOLO, headers, param);
    return res;
}

export const getAll = async () => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'), // Include this line if using authorization headers
    };
    let res = await apiFetch.get(GET_ARTICOLI, { headers: headers });
    console.log('FETCHING DATA ARTICOLI ', res.data);
    return res.data;
}

export const deleteById = async (param) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'), // Include this line if using authorization headers
    };
    console.log("enter in axios delete param: ", param);
    let res = await apiFetch.delete(DELETE_ARTICOLO + param, headers);
    console.log('FETCHING DAELETE ARTICOLO BY ID ', res);
    return res;
}
