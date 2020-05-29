import {Reducer} from 'redux';
import {UserAction} from './user.reducer';

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
  loading: true,
};

const loteReducer: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case LoteAction.SAVE:
      return {...state, lotes: action.lotes};
    case LoteAction.LOADING:
      return {...state, loading: action.loading};
    case LoteAction.CLEAR:
    case UserAction.LOG_OUT:
      return initialState;
    default:
      return state;
  }
};

export enum LoteAction {
  SAVE = 'save_lotes',
  CLEAR = 'clear_lotes',
  LOADING = 'loading_lotes',
}

export default loteReducer;
