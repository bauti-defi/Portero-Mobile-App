import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {SafeAreaView} from 'react-native';
import {Text} from 'react-native-elements';
import CreateInviteButton from '../components/create.invite.button';
import DrawerButton from '../components/drawer.button';

const Stack = createStackNavigator();

function InviteNavigator({navigation}) {
  return (
    <Stack.Navigator initialRouteName="Invitaciones">
      <Stack.Screen
        name="Invitaciones"
        component={InviteScreen}
        options={{
          headerLeft: (props) => <DrawerButton navigation={navigation} />,
          headerRight: (props) => (
            <CreateInviteButton navigation={navigation} />
          ),
        }}
      />
      <Stack.Screen name="Crear Invitacion" component={CreateInviteScreen} />
    </Stack.Navigator>
  );
}

function InviteScreen() {
  return (
    <SafeAreaView>
      <Text>Invite Screen</Text>
    </SafeAreaView>
  );
}

function CreateInviteScreen() {
  return (
    <SafeAreaView>
      <Text>Create Invite screen</Text>
    </SafeAreaView>
  );
}

export default InviteNavigator;
