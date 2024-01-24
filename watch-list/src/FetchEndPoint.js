import axios from 'axios';

const apiFetch = axios.create({
    baseURL: 'http://localhost:3001'
});

const REGISTER_URL = '/user/register';
const LOGIN_URL = '/user/login';
const SAVE_TOPIC = '/blog/saveTopic';
const GET_ARTICOLI = '/getArticoli';
const SAVE_POST = '/blog/savePost';

export const login = async (param) => {
    let res = await apiFetch.post(LOGIN_URL, param);
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
    let res = await apiFetch.post(SAVE_POST, param);
    return res;
}

export const getAll = async () => {
    let res = await apiFetch.get(GET_ARTICOLI);
    console.log('FETCHING DATA ARTICOLI ', res.data);
    return res.data;
}
