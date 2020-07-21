import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import DrawerButton from '../../components/drawer.button';
import InviteFeedbackScreen from '../../screens/propietario/invite.feedback.screen';
import CreateInviteScreen from '../../screens/propietario/invite.form.screen';
import InviteScreen from '../../screens/propietario/invite.screen';

const Stack = createStackNavigator();

const InviteNavigator = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="Invitaciones">
      <Stack.Screen
        name="Invitaciones"
        component={InviteScreen}
        options={{
          headerLeft: (props) => <DrawerButton navigation={navigation} />,
        }}
      />
      <Stack.Screen name="Crear Invitacion" component={CreateInviteScreen} />
      <Stack.Screen
        name="Creation Feedback"
        component={InviteFeedbackScreen}
        options={{header: (props) => null}}
      />
    </Stack.Navigator>
  );
};

export default InviteNavigator;
