import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text} from 'react-native';
import DrawerButton from '../components/drawer.button';
import {ListItem} from 'react-native-elements';
import {FlatList} from 'react-native-gesture-handler';
const axios = require('axios').default;

const Stack = createStackNavigator();

function LotesNavigator({navigation}) {
  return (
    <Stack.Navigator
      initialRouteName="Lotes"
      screenOptions={{
        headerLeft: (props) => <DrawerButton navigation={navigation} />,
      }}>
      <Stack.Screen name="Lotes" component={LotesScreen} />
    </Stack.Navigator>
  );
}

async function GetLotes() {
  return await axios({
    method: 'get',
    url: 'http://192.168.0.101:3500/lotes/propietario/all',
  }).then((response) => response.data);
}

const list = [
  {
    name: 'Amy Farha',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President',
  },
  {
    name: 'Chris Jackson',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman',
  },
];

const keyExtractor = (item, index) => item.id;

const renderItem = ({item}) => (
  <ListItem
    title={item.street}
    subtitle={item.nickname}
    bottomDivider
    // chevron
  />
);

 function LotesScreen() {
  const [lotes, setLotes] = useState([]);

  useEffect (() => {
    setLotes(GetLotes())
  });

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

export default LotesNavigator;
