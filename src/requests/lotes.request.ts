import axios from 'axios';

export const getAllLotes = async () => await axios.get('/lote/propietario/all');
