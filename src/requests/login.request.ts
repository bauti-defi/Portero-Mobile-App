import axios from 'axios';

export const logIn = (email: string, password: string, mid: string) =>
  axios.post('/auth/login', {email, password, mid});
