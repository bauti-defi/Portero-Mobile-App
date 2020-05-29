import axios from 'axios';

export const register = (payload) => axios.post('/user/register', payload);
