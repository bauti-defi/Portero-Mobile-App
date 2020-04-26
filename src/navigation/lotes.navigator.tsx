import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import AddButton from '../components/add.button';
import DrawerButton from '../components/drawer.button';
import ConfirmationScreen from '../screens/lotes/association.confirmation.screen';
import LoteAssociationScreen from '../screens/lotes/lote.association.screen';
import LotesScreen from '../screens/lotes/lotes.screen';
import QRScannerScreen from '../screens/lotes/qr.scanner.screen';

const Stack = createStackNavigator();

function LotesNavigator({route, navigation}) {
  return (
    <Stack.Navigator initialRouteName="Lotes">
      <Stack.Screen
        name="Lotes"
        component={LotesScreen}
        options={{
          headerLeft: (props) => <DrawerButton navigation={navigation} />,
          headerRight: (props) => (
            <AddButton onPress={() => navigation.navigate('Associar')} />
          ),
        }}
      />
      <Stack.Screen name="Associar" component={LoteAssociationScreen} />
      <Stack.Screen
        name="Lote QR Scanner"
        component={QRScannerScreen}
        options={{title: 'Escanear QR'}}
      />
      <Stack.Screen
        name="Confirmation"
        component={ConfirmationScreen}
        options={{title: '', headerLeft: null}}
      />
    </Stack.Navigator>
  );
}

export default LotesNavigator;
