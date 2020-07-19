import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import SplashScreen from '../../screens/user/splash.screen';
import {useSessionSelector, useUserSelector} from '../../storage/app.selectors';
import HomeNavigator from './home.navigator';
import LoginNavigator from './login.navigator';

const AppNavigator = () => {
  const hasUser = useUserSelector((user) => !!user);
  const session = useSessionSelector((session) => session);

  if (session!.loadingToken) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      {session.token && hasUser ? <HomeNavigator /> : <LoginNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
