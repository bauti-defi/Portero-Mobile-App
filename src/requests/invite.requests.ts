import axios from 'axios';

export const createInvite = (inviteDTO: InviteDTO) =>
  axios.post('/invite/create', inviteDTO);

type InviteDTO = {
  doc_id: string;
  first_name: string;
  last_name: string;
  lote_id: string;
};
