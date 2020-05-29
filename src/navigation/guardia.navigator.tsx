import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import DrawerContent from '../components/home.drawer.content';
import ActivityFeedNavigator from './activity.feed.navigator';

const Drawer = createDrawerNavigator();

const GuardiaNavigator = () => {
  return (
    <Drawer.Navigator
      lazy={true}
      initialRouteName="Activity Feed"
      drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="Activity Feed" component={ActivityFeedNavigator} />
    </Drawer.Navigator>
  );
};
export default GuardiaNavigator;
