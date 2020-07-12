import React from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import {ListItem} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import EmptyPlaceholder from '../../components/empty.placeholder';
import {getAllLotes} from '../../requests/lotes.request';
import {useLoteSelector, useSessionSelector} from '../../storage/app.selectors';
import {Lote} from '../../storage/lotes.reducer';
import {LoteAction} from '../../storage/storage.actions';

const keyExtractor = (lote, index) => lote.lote_id;

const renderItem = ({item}) => (
  <ListItem
    title={`${item.lote_nickname} en ${item.barrio_name}`}
    subtitle={`${item.lote_street} ${item.lote_num}, ${item.lote_code}`}
    subtitleStyle={{fontSize: 15, opacity: 0.7}}
    titleStyle={{fontSize: 20, paddingBottom: 5}}
    bottomDivider
  />
);

function LotesScreen() {
  const lotes: Lote[] = useLoteSelector((state) => state.lotes);
  const loading: boolean = useLoteSelector((state) => state.loading);
  const token: string = useSessionSelector((session) => session.token);
  const dispatch = useDispatch();

  return (
    <SafeAreaView>
      <FlatList
        keyExtractor={keyExtractor}
        data={lotes}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        extraData={lotes}
        onRefresh={() => dispatch(fetchLotes(token))}
        renderItem={renderItem}
        refreshing={loading}
        ListEmptyComponent={EmptyPlaceholder}
      />
    </SafeAreaView>
  );
}

const fetchLotes = (token) => (dispatch) => {
  console.debug('Loading lotes data');

  dispatch({type: LoteAction.START_LOADING, loading: true});

  return getAllLotes(token).then((allLotes) => {
    dispatch({type: LoteAction.FINISHED_LOADING, lotes: allLotes || []});
  });
};

export default LotesScreen;
