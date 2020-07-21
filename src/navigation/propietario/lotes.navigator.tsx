import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import DrawerButton from '../../components/drawer.button';
import LotesScreen from '../../screens/propietario/lotes.screen';

const Stack = createStackNavigator();

function LotesNavigator({route, navigation}) {
  return (
    <Stack.Navigator initialRouteName="Lotes">
      <Stack.Screen
        name="Lotes"
        component={LotesScreen}
        options={{
          headerLeft: (props) => <DrawerButton navigation={navigation} />,
        }}
      />
    </Stack.Navigator>
  );
}

export default LotesNavigator;
