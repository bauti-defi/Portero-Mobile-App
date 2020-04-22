import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {LoteState} from './lotes.reducer';
import {RootState} from './root.reducer';
import {UserState} from './user.reducer';

export const useRootSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useUserSelector: TypedUseSelectorHook<UserState> = (selector) =>
  useRootSelector((state) => selector(state.user));

export const useLoteSelector: TypedUseSelectorHook<LoteState> = (selector) =>
  useRootSelector((state) => selector(state.lote));
