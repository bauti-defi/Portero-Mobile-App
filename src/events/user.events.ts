import {UserAction} from '../actions/user.actions';
import {persistor} from '../storage/app.store';

export const loadUser = () => (dispatch) => {
  persistor.persist();
  dispatch({type: UserAction.DONE_LOADING_USER});
};
