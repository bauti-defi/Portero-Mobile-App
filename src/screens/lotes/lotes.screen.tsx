import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text} from 'react-native';
import {ListItem} from 'react-native-elements';
import {FlatList} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {getAllLotes} from '../../requests/lotes.request';
import {Action} from '../../storage/dispatch.actions';
import {Lote, useLoteSelector} from '../../storage/lotes.reducer';

const keyExtractor = (lote, index) => lote.lote_id;

const renderItem = ({item}) => (
  <ListItem
    title={`${item.nickname} en ${item.barrio_name}`}
    subtitle={`${item.lote_street} ${item.lote_num}, ${item.lote_code}`}
    bottomDivider
  />
);

function LotesScreen() {
  const lotes: Lote[] = useLoteSelector((state) => state.lote.lotes);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  async function fetchLotes() {
    const ourLotes = await getAllLotes();
    dispatch({type: Action.SAVE_LOTES, lotes: ourLotes});
    setLoading(false);
  }

  useEffect(() => {
    async function fetch() {
      await fetchLotes();
    }

    fetch();
  }, []);

  return (
    <SafeAreaView>
      {lotes.length === 0 ? (
        <Text>No Tenes Lotes</Text>
      ) : (
        <FlatList
          keyExtractor={keyExtractor}
          data={lotes}
          onRefresh={fetchLotes}
          refreshing={loading}
          renderItem={renderItem}
        />
      )}
    </SafeAreaView>
  );
}

export default LotesScreen;
