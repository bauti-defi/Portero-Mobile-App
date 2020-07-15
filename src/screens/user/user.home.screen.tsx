import {useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useLayoutEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import DrawerButton from '../../components/drawer.button';

const Stack = createStackNavigator();

const UserHomeScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: (props) => <DrawerButton />,
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Text h4>Text here!</Text>
    </SafeAreaView>
  );
};

// We have to wrap the screen in a stack navigator to have a header.
//We need the header for the drawer button.
const WrapperHomeScreen = () => {
  return (
    <Stack.Navigator initialRouteName="home">
      <Stack.Screen
        name="home"
        component={UserHomeScreen}
        options={{headerTitle: 'Ayuda'}}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WrapperHomeScreen;
