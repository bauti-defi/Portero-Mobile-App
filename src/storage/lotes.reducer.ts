import {TypedUseSelectorHook} from 'react-redux';
import {Reducer} from 'redux';
import {useRootSelector} from './app.store';
import {Action} from './dispatch.actions';

export interface LoteState {
  lotes: Lote[];
}

export type Lote = {
  barrio_id: string;
  barrio_name: string;
  lote_code: number;
  lote_num: number;
  lote_id: string;
  lote_street: string;
  lote_name: string;
  nickname: string;
};

export const useLoteSelector: TypedUseSelectorHook<LoteState> = (selector) =>
  useRootSelector((state) => selector(state.lote));

const initialState: LoteState = {
  lotes: [],
};

const loteReducer: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case Action.SAVE_LOTES:
      return {...state, lotes: action.lotes};
    case Action.CLEAR_LOTES:
    case Action.LOG_OUT:
      return {};
    default:
      return state;
  }
};

export default loteReducer;
