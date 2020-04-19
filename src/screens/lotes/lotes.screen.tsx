import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text} from 'react-native';
import {ListItem} from 'react-native-elements';
import {FlatList} from 'react-native-gesture-handler';
import {getAllLotes} from '../../requests/lotes.request';

const keyExtractor = (lote, index) => lote.lote_id;

const renderItem = ({item}) => (
  <ListItem
    title={`${item.nickname} en ${item.barrio_name}`}
    subtitle={`${item.lote_street} ${item.lote_num}, ${item.lote_code}`}
    bottomDivider
  />
);

function LotesScreen() {
  const [lotes, setLotes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const ourLotes = await getAllLotes().then((response) => response.data);
      setLotes(ourLotes);
    }

    fetchData();
  }, []);

  return (
    <SafeAreaView>
      {lotes.length === 0 ? (
        <Text>No Tenes Lotes</Text>
      ) : (
        <FlatList
          keyExtractor={keyExtractor}
          data={lotes}
          renderItem={renderItem}
        />
      )}
    </SafeAreaView>
  );
}

export default LotesScreen;
