import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import React from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
} from 'react-native';


declare var global: {HermesInternal: null | {}};

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View>
          <Input
          placeholder='Email'
          leftIcon={
            <Icon
              name='user'
              size={24}
              color='black'
            />
          }
            />
        </View>
      </SafeAreaView>
    </>
  );
};


export default App;
