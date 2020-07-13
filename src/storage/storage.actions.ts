export enum APP_ACTION {
  LOAD = 'load',
}

export enum LoteAction {
  FINISHED_LOADING = 'save_lotes',
  CLEAR = 'clear_lotes',
  START_LOADING = 'loading_lotes',
}

export enum InviteAction {
  START_SENDING = 'start_sending',
  SHOW_INVITE = 'show_invite',
  FINISHED_LOADING_INVITES = 'finished_loading_invites',
}

export enum LoginAction {
  ATTEMPTING_LOGIN = 'attempting_login',
  FAILED_LOGIN = 'failed_login',
  LOG_IN = 'log_in',
  LOG_OUT = 'log_out',
  RESET = 'reset_login',
}

export enum RegistrationAction {
  ATTEMPTING_REGISTRATION = 'attempting_registration',
  SUCCESSFUL_REGISTRATION = 'successful_registration',
  FAILED_REGISTRATION = 'failed_registration',
}
