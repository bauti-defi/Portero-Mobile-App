import 'react-native-gesture-handler';
import React from 'react';
import AppNavigator from './navigator';
import {Provider} from 'react-redux'
import {store} from './storage/app.store'

const App = () => {
  
  return (
      <Provider store={store}>
        <AppNavigator/>
      </Provider>
  );
};


export default App;
