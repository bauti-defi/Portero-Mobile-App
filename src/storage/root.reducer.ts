import {combineReducers} from 'redux';
import loteReducer from './lotes.reducer';
import sessionReducer from './session.reducer';
import userReducer from './user.reducer';

const rootReducer = combineReducers({
  user: userReducer,
  lote: loteReducer,
  session: sessionReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
