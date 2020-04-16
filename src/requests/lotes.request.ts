import axios from 'axios';

export const getAllLotes = async () => await axios.get('/lote/propietario/all');

export const associatePropietarioToLote = async (associarDTO: AssociarDTO) => {
  //console.log(JSON.stringify(associarDTO));
  return await axios.post('/lote/associate', associarDTO);
};

type AssociarDTO = {invite: string; nickname: string; id: string};
