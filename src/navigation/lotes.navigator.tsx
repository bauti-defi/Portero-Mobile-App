import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import DrawerButton from '../components/drawer.button';
import LotesScreen from '../screens/lotes.screen';

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

export default LotesNavigator;
