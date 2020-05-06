import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {SafeAreaView} from 'react-native';
import {Text} from 'react-native-elements';
import CreateButton from '../components/create.button';
import DrawerButton from '../components/drawer.button';
import EmptyList from '../components/empty.list';

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
            <CreateButton
              onPress={() => navigation.navigate('Crear Invitacion')}
            />
          ),
        }}
      />
      <Stack.Screen name="Crear Invitacion" component={CreateInviteScreen} />
    </Stack.Navigator>
  );
}

function InviteScreen() {
  return (
    <SafeAreaView style={{flexGrow: 1}}>
      <EmptyList />
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
