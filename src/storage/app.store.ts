import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {combineReducers, createStore} from 'redux';
import loteReducer from './lotes.reducer';
import userReducer from './user.reducer';

const rootReducer = combineReducers({
  user: userReducer,
  lote: loteReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const useRootSelector: TypedUseSelectorHook<RootState> = useSelector;

export const store = createStore(rootReducer);
