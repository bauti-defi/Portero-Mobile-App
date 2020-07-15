import {
  createInvite,
  getAllInvites,
  InviteDTO,
} from '../requests/invite.requests';

export enum InviteAction {
  START_SENDING = 'start_sending',
  SHOW_INVITE = 'show_invite',
  FINISHED_LOADING_INVITES = 'finished_loading_invites',
}

export const createNewInvite = (token: string, inviteDTO: InviteDTO) => (
  dispatch,
) => {
  dispatch({type: InviteAction.START_SENDING, isSending: true});

  return createInvite(token, inviteDTO)
    .then((response) => response.data)
    .then((invite) => dispatch({type: InviteAction.SHOW_INVITE, invite}))
    .then(dispatch(getInvites(token)));
};

export const getInvites = (token: string) => (dispatch) => {
  return getAllInvites(token)
    .then((response) => response.data)
    .then((inviteData) =>
      dispatch({type: InviteAction.FINISHED_LOADING_INVITES, ...inviteData}),
    );
};
