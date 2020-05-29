import axios from 'axios';

export const login = (email: string, password: string, device_id: string) =>
  axios.post('/auth/login', {
    email,
    password,
    mid: device_id,
  });
