import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text} from 'react-native';
import {ListItem} from 'react-native-elements';
import {FlatList} from 'react-native-gesture-handler';
import {getAllLotes} from '../requests/lotes.request';

const keyExtractor = (lote, index) => lote.id;

const renderItem = ({item}) => (
  <ListItem
    title={item.nickname}
    subtitle={`${item.street} ${item.num}, ${item.code}`}
    bottomDivider
    // chevron
  />
);

function LotesScreen() {
  const [lotes, setLotes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const lotes = await getAllLotes().then((response) => response.data);
      setLotes([mockLote]);
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

const mockLote = {
  id: '1',
  nickname: 'Casa de Mama',
  street: 'La Alameda',
  num: 11,
  name: 'Lote 11',
  code: 1607,
};

export default LotesScreen;
