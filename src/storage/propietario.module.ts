import {getInvites} from '../actions/invite.actions';
import {getAllLotes} from '../actions/lote.actions';
import inviteReducer from './invite.reducer';
import loteReducer from './lotes.reducer';

const PropietarioModule = {
  id: 'propietario_module',
  reducerMap: {
    lote: loteReducer,
    invite: inviteReducer,
  },
  initialActions: [getAllLotes(), getInvites()],
};

export default PropietarioModule;
