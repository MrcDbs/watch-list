import axios from 'axios';

const apiFetch = axios.create({
    baseURL: 'http://localhost:3001'
});

const REGISTER_URL = '/user/register';
const LOGIN_URL = '/user/login';
const SAVE_TOPIC = '/blog/saveTopic';
const GET_ARTICOLI = '/getArticoli';
const SAVE_ARTICOLO = '/addArticolo';
const DELETE_ARTICOLO = '/deleteArticolo/';
const GET_PROGRESS_BY_DATE = '/getProgressOrderedByDate';
const DELETE_PROGRESS = '/deleteProgress/';
const UPDATE_PROGRESS = '/updateProgress/';

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
    let res = await apiFetch.post(SAVE_ARTICOLO, { headers: headers, body: param });
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
    let res = await apiFetch.delete(DELETE_ARTICOLO + param, { headers: headers });
    console.log('FETCHING DAELETE ARTICOLO BY ID ', res);
    return res;
}

export const deleteProgressById = async (param) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'), // Include this line if using authorization headers
    };
    console.log("enter in axios delete param: ", param);
    let res = await apiFetch.delete(DELETE_PROGRESS + param, { headers: headers });
    console.log('FETCHING DAELETE ARTICOLO BY ID ', res);
    return res;
}

export const getAllProgress = async () => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'), // Include this line if using authorization headers
    };
    let res = await apiFetch.get(GET_PROGRESS_BY_DATE, { headers: headers });
    console.log('FETCHING DATA ARTICOLI ', res.data);
    return res.data;
}

export const updateProgress = async (id, param) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'), // Include this line if using authorization headers
    };
    let res = await apiFetch.post(UPDATE_PROGRESS + id, { headers: headers, body: param });
    return res;
}
