import axios from 'axios';
import React from 'react';
import {View} from 'react-native';
import {Input} from 'react-native-elements';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import * as AppConfig from './app.config.json';
import AppNavigator from './navigation/user/app.navigator';
import {persistor, store} from './storage/app.store';

axios.defaults.baseURL = AppConfig.host[AppConfig.mode];
axios.defaults.timeout = 3000;

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigator />
      </PersistGate>
    </Provider>
  );
};

const Test = () => {
  return (
    <View>
      <Input></Input>
    </View>
  );
};

export default Test;
