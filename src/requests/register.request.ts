import axios from 'axios';

export const register = (payload: RegisterDTO) =>
  axios.post('/user/register', payload);

export type RegisterDTO = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  birth_date: string;
  doc_id: string;
};
