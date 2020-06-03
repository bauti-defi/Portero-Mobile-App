import axios from 'axios';

export const createInvite = (inviteDTO: InviteDTO) =>
  axios.post('/invite/create', inviteDTO);

export const validateInvite = (validate: ValidateDTO) =>
  axios.post('/invite/validate', validate);

export const allowVisita = (inviteId: string) =>
  axios.post('/invite/allow', null, {params: {id: inviteId}});

type ValidateDTO = {message: string; id: string};

type InviteDTO = {
  doc_id: string;
  first_name: string;
  last_name: string;
  lote_id: string;
};
