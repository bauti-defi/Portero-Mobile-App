import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import DrawerButton from '../components/drawer.button';

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

function LotesScreen() {
  return (
    <SafeAreaView>
      <Text>List of lotes goes here</Text>
    </SafeAreaView>
  );
}

export default LotesNavigator;
