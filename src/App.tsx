import React from 'react';
import {
  SafeAreaView,
} from 'react-native';
import LoginScreen from './login.screen';
import AppHeader from './header';


declare var global: {HermesInternal: null | {}};

const App = () => {
  return (
    <>
      <SafeAreaView>
        <AppHeader/>
        <LoginScreen/>
      </SafeAreaView>
    </>
  );
};


export default App;
