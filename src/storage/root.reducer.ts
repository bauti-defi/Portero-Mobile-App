import {combineReducers} from 'redux';
import loteReducer from './lotes.reducer';
import userReducer from './user.reducer';

const rootReducer = combineReducers({
  user: userReducer,
  lote: loteReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
