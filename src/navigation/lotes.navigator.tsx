import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import AddButton from '../components/add.button';
import DrawerButton from '../components/drawer.button';
import FeedbackScreen from '../screens/lotes/association.feedback.screen';
import LoteAssociationScreen from '../screens/lotes/lote.association.screen';
import LoteQRScannerScreen from '../screens/lotes/lote.qr.scanner.screen';
import LotesScreen from '../screens/lotes/lotes.screen';

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
        component={LoteQRScannerScreen}
        options={{title: 'Escanear QR'}}
      />
      <Stack.Screen
        name="Feedback"
        component={FeedbackScreen}
        options={{title: '', headerLeft: null}}
      />
    </Stack.Navigator>
  );
}

export default LotesNavigator;
