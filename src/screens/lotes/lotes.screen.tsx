import React, {useEffect} from 'react';
import {FlatList, SafeAreaView, View} from 'react-native';
import {ListItem, Text} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import EmptyPlaceholder from '../../components/empty.placeholder';
import {getAllLotes} from '../../requests/lotes.request';
import {useLoteSelector} from '../../storage/app.selectors';
import {Lote, LoteAction} from '../../storage/lotes.reducer';

const keyExtractor = (lote, index) => lote.lote_id;

const renderItem = ({item}) => (
  <ListItem
    title={`${item.lote_nickname} en ${item.barrio_name}`}
    subtitle={`${item.lote_street} ${item.lote_num}, ${item.lote_code}`}
    bottomDivider
  />
);

function LotesScreen() {
  const lotes: Lote[] = useLoteSelector((state) => state.lotes);
  const loading: boolean = useLoteSelector((state) => state.loading);
  const dispatch = useDispatch();

  const setLoading = (loading: boolean) =>
    dispatch({type: LoteAction.LOADING, loading});

  const setLotes = (lotes: Lote[]) => dispatch({type: LoteAction.SAVE, lotes});

  const loadLotes = () => {
    console.log('Loading lotes...');
    getAllLotes().then((ourLotes) => {
      setLotes(ourLotes || []);
    });
  };

  const refresh = () => setLoading(true);

  useEffect(() => {
    if (loading) {
      loadLotes();
    }
    setLoading(false);
  }, [loading]);

  return (
    <SafeAreaView>
      <FlatList
        keyExtractor={keyExtractor}
        data={lotes}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        extraData={lotes}
        onRefresh={refresh}
        renderItem={renderItem}
        refreshing={loading}
        ListEmptyComponent={EmptyPlaceholder}
      />
    </SafeAreaView>
  );
}

const EmptyLoteList = () => {
  return (
    <View>
      <Text h4>No tenes lotes!</Text>
    </View>
  );
};

export default LotesScreen;
