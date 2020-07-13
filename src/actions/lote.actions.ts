import {getAllLotes} from '../requests/lotes.request';
import {LoteAction} from '../storage/storage.actions';

export const fetchLotes = (token: string) => (dispatch) => {
  console.debug('Loading lotes');

  dispatch({type: LoteAction.START_LOADING, loading: true});

  return getAllLotes(token).then((allLotes) => {
    dispatch({type: LoteAction.FINISHED_LOADING, lotes: allLotes || []});
  });
};
