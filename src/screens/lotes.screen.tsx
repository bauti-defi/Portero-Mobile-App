import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text} from 'react-native';
import {ListItem} from 'react-native-elements';
import {FlatList} from 'react-native-gesture-handler';
import {getAllLotes} from '../requests/lotes.request';

const keyExtractor = (item, index) => item.id;

const renderItem = ({item}) => (
  <ListItem
    title={item.nickname}
    subtitle={item.street}
    bottomDivider
    // chevron
  />
);

function LotesScreen() {
  const [lotes, setLotes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const lotes = await getAllLotes().then((response) => response.data);
      setLotes(lotes);
    }

    fetchData();
  }, []);

  return (
    <SafeAreaView>
      <Text>List of lotes goes here</Text>
      <FlatList
        keyExtractor={keyExtractor}
        data={lotes}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

export default LotesScreen;
