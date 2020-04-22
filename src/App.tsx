import axios from 'axios';
import React from 'react';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import * as AppConfig from './app.config.json';
import AppNavigator from './navigation/app.navigator';
import {store} from './storage/app.store';

axios.defaults.baseURL = AppConfig.host[AppConfig.mode];
axios.defaults.timeout = 3000;

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
