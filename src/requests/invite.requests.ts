import axios from 'axios';

export const createInvite = (inviteDTO: InviteDTO) =>
  axios.post('/invite/create', inviteDTO);

export const validateInvite = (message: string, id: string) =>
  axios.post('/invite/validate', {message, id});

export const allowVisita = (inviteId: string) =>
  axios.post('/invite/allow', null, {params: {id: inviteId}});

type InviteDTO = {
  doc_id: string;
  first_name: string;
  last_name: string;
  lote_id: string;
};
