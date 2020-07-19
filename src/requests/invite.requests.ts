import axios from 'axios';

export const createInvite = (inviteDTO: InviteDTO) =>
  axios.post('/invite/create', inviteDTO);

export const validateInvite = (message: string, id: string) =>
  axios.post('/invite/validate', {message, id});

export const getAllInvites = () => axios.get('/invite/get/all');

export const inviteResponse = (
  inviteId: string,
  approved: [],
  rejected: [],
) => {
  axios.post('/invite/auth/guests', {inviteId, approved, rejected});
};

export type InviteDTO = {
  guests: Guest[];
  exp: Date;
  lote_id: string;
};

type Guest = {
  doc_id: string;
  first_name: string;
  last_name: string;
};
