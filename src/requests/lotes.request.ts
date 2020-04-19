import axios from 'axios';

export const getAllLotes = async () =>
  await axios.get('/lote/propietario/all').then((response) => response.data);

export const associatePropietarioToLote = async (associarDTO: AssociarDTO) =>
  await axios.post('/lote/associate', associarDTO);

type AssociarDTO = {invite: string; nickname: string; id: string};
