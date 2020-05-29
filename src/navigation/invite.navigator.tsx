import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import CreateButton from '../components/create.button';
import DrawerButton from '../components/drawer.button';
import CreateInviteScreen from '../screens/invites/invite.form.screen';
import InviteScreen from '../screens/invites/invite.screen';

const Stack = createStackNavigator();

const InviteNavigator = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="Invitaciones">
      <Stack.Screen
        name="Invitaciones"
        component={InviteScreen}
        options={{
          headerLeft: (props) => <DrawerButton navigation={navigation} />,
          headerRight: (props) => (
            <CreateButton
              onPress={() => navigation.navigate('Crear Invitacion')}
            />
          ),
        }}
      />
      <Stack.Screen name="Crear Invitacion" component={CreateInviteScreen} />
    </Stack.Navigator>
  );
};

export default InviteNavigator;
