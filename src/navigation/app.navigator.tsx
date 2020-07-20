import {NavigationContainer} from '@react-navigation/native';
import axios from 'axios';
import React from 'react';
import {useUserSelector} from '../storage/app.selectors';
import HomeNavigator from './user/home.navigator';
import LoginNavigator from './user/login.navigator';

const AppNavigator = () => {
  const user = useUserSelector((user) => user);

  return (
    <NavigationContainer>
      {axios.defaults.headers.common['Authorization'] != '' && !!user.email ? (
        <HomeNavigator />
      ) : (
        <LoginNavigator />
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;
