import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {InviteState} from './invite.module';
import {LoginState} from './login.reducer';
import {LoteState} from './lote.module';
import {RegistrationState} from './registration.reducer';
import {SessionState} from './session.module';
import {UserState} from './user.module';

export const useRootSelector: TypedUseSelectorHook<any> = useSelector;

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

export const useLoginReducer: TypedUseSelectorHook<LoginState> = (selector) =>
  useRootSelector((state) => selector(state.login));

export const useRegistrationReducer: TypedUseSelectorHook<RegistrationState> = (
  selector,
) => useRootSelector((state) => selector(state.registration));
