import axios from 'axios';

export const register = async (payload, user_type: string) =>
  await axios.post(`/${user_type}/register`, payload);
