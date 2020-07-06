import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import DrawerButton from '../../components/drawer.button';
import GuardiaActivityScreen from '../../screens/guardia/guardia.activity.screen';

const Stack = createStackNavigator();

const ActivityFeedNavigator = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="Actividad">
      <Stack.Screen
        name="Actividad"
        component={GuardiaActivityScreen}
        options={{
          headerLeft: (props) => <DrawerButton />,
        }}
      />
    </Stack.Navigator>
  );
};

export default ActivityFeedNavigator;
