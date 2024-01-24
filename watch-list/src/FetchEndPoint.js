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
    let res = await apiFetch.post(SAVE_ARTICOLO, param);
    return res;
}

export const getAll = async () => {
    let res = await apiFetch.get(GET_ARTICOLI);
    console.log('FETCHING DATA ARTICOLI ', res.data);
    return res.data;
}

export const deleteById = async (param) => {
    console.log("enter in axios delete param: ", param);
    let res = await apiFetch.delete(DELETE_ARTICOLO + param);
    console.log('FETCHING DAELETE ARTICOLO BY ID ', res);
    return res;
}
