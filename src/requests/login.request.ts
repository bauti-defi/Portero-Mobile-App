import axios from 'axios';

export const login = async (
  email: string,
  password: string,
  device_id: string,
) => await axios.post('/auth/login', {email, password, mid: device_id});
