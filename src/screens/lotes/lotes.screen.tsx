import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import {ListItem} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import {getAllLotes} from '../../requests/lotes.request';
import {useLoteSelector} from '../../storage/app.selectors';
import {Action} from '../../storage/dispatch.actions';
import {Lote} from '../../storage/lotes.reducer';
import LotesLoading from './lotes.loading';

const keyExtractor = (lote, index) => lote.lote_id;

const renderItem = ({item}) => (
  <ListItem
    title={`${item.nickname} en ${item.barrio_name}`}
    subtitle={`${item.lote_street} ${item.lote_num}, ${item.lote_code}`}
    bottomDivider
  />
);

function LotesScreen({navigation}) {
  const lotes: Lote[] = useLoteSelector((state) => state.lotes);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  function loadLotes() {
    console.log('Loading lotes...');
    setLoading(true);
    getAllLotes().then((ourLotes) => {
      dispatch({type: Action.SAVE_LOTES, lotes: ourLotes || []});
      setLoading(false);
    });
  }

  useEffect(() => {
    loadLotes();
  }, []);

  return (
    <SafeAreaView>
      <FlatList
        keyExtractor={keyExtractor}
        data={lotes}
        extraData={lotes}
        onRefresh={loadLotes}
        renderItem={renderItem}
        refreshing={loading}
        ListEmptyComponent={LotesLoading(loading)}
      />
    </SafeAreaView>
  );
}

export default LotesScreen;
