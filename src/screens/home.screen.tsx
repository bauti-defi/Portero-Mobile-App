import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import InviteScreen from './invite.screen';
import React from 'react';

const Tab = createBottomTabNavigator();

function HomeScreen() {
  return (
    <Tab.Navigator initialRouteName="Invitaciones">
      <Tab.Screen name="Invitaciones" component={InviteScreen} />
    </Tab.Navigator>
  );
}

export default HomeScreen;
