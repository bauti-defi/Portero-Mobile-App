import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {InviteState} from './invite.reducer';
import {LoteState} from './lotes.reducer';
import {RootState} from './root.reducer';
import {SessionState} from './session.reducer';
import {UserState} from './user.reducer';

export const useRootSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useUserSelector: TypedUseSelectorHook<UserState> = (selector) =>
  useRootSelector((state) => selector(state.user));

export const useSessionSelector: TypedUseSelectorHook<SessionState> = (
  selector,
) => useRootSelector((state) => selector(state.session));

export const useLoteSelector: TypedUseSelectorHook<LoteState> = (selector) =>
  useRootSelector((state) => selector(state.lote));

export const useInviteSelector: TypedUseSelectorHook<InviteState> = (
  selector,
) => useRootSelector((state) => selector(state.invite));
