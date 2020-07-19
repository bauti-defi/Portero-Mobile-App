import React from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import {ListItem} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import {getAllLotes} from '../../actions/lote.actions';
import EmptyPlaceholder from '../../components/empty.placeholder';
import {useLoteSelector} from '../../storage/app.selectors';

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
  const {lotes, loading} = useLoteSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={{flexGrow: 1}}>
      <FlatList
        keyExtractor={keyExtractor}
        data={lotes}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        extraData={lotes}
        onRefresh={() => dispatch(getAllLotes())}
        renderItem={renderItem}
        refreshing={loading}
        ListEmptyComponent={EmptyPlaceholder}
      />
    </SafeAreaView>
  );
}

export default LotesScreen;
