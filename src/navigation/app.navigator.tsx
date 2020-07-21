import {NavigationContainer} from '@react-navigation/native';
import axios from 'axios';
import React from 'react';
import SplashScreen from '../screens/user/splash.screen';
import {useLoadAppSelector, useUserSelector} from '../storage/app.selectors';
import HomeNavigator from './user/home.navigator';
import LoginNavigator from './user/login.navigator';

const AppNavigator = () => {
  const user = useUserSelector((user) => user);
  const {loadingSession, loadingUser} = useLoadAppSelector((state) => state);

  if (loadingSession) {
    return <SplashScreen />;
  }

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
