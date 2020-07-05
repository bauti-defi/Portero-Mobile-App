import axios from 'axios';

export const createInvite = (inviteDTO: InviteDTO) =>
  axios.post('/invite/create', inviteDTO);

export const validateInvite = (message: string, id: string) =>
  axios.post('/invite/validate', {message, id});

export const inviteResponse = (
  inviteId: string,
  approved: [],
  rejected: [],
) => {
  console.log({inviteId, approved, rejected});
  axios.post('/invite/auth/guests', {inviteId, approved, rejected});
};

type InviteDTO = {
  doc_id: string;
  first_name: string;
  last_name: string;
  lote_id: string;
};
