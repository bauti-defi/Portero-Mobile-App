import AsyncStorage from '@react-native-community/async-storage';
import {Reducer} from 'redux';
import {persistReducer} from 'redux-persist';
import {LoginAction, LoteAction} from './storage.actions';

export interface LoteState {
  lotes: Lote[];
  loading: boolean;
}

export type Lote = {
  barrio_id: string;
  barrio_name: string;
  lote_code: number;
  lote_num: number;
  lote_id: string;
  lote_street: string;
  lote_name: string;
  lote_nickname: string;
};

const initialState: LoteState = {
  lotes: [],
  loading: false,
};

const loteReducer: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case LoteAction.FINISHED_LOADING:
      return {
        ...state,
        lotes: action.lotes,
        loading: false,
      };
    case LoteAction.START_LOADING:
      return {...state, loading: action.loading};
    case LoteAction.CLEAR:
    case LoginAction.LOG_OUT:
      return initialState;
    default:
      return state;
  }
};

const persistConfig = {
  key: 'lote',
  storage: AsyncStorage,
};

const persistedLoteReducer = persistReducer(persistConfig, loteReducer);

export default persistedLoteReducer;
