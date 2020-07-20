import LoteAction from '../actions/lote.actions';
import {fetchLotes} from '../requests/lotes.request';

export const getAllLotes = () => (dispatch) => {
  dispatch({type: LoteAction.START_LOADING, loading: true});

  return fetchLotes().then((allLotes) => {
    dispatch({type: LoteAction.FINISHED_LOADING, lotes: allLotes || []});
  });
};
