import InviteAction from '../actions/invite.actions';
import {
  createInvite,
  getAllInvites,
  InviteDTO,
} from '../requests/invite.requests';

export const createNewInvite = (inviteDTO: InviteDTO) => (dispatch) => {
  dispatch({type: InviteAction.CREATE_INVITE, isCreating: true});

  return createInvite(inviteDTO)
    .then((response) => response.data)
    .then((invite) => dispatch({type: InviteAction.SHOW_INVITE, invite}))
    .then(() => dispatch(getInvites()));
};

export const getInvites = () => (dispatch) => {
  dispatch({type: InviteAction.START_LOADING_INVITES});
  return getAllInvites()
    .then((response) => response.data)
    .then((inviteData) =>
      dispatch({type: InviteAction.FINISHED_LOADING_INVITES, ...inviteData}),
    );
};
