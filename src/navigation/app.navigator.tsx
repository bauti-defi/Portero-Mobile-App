import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {getToken} from '../jwt.service';
import SplashScreen from '../screens/splash.screen';
import {Action} from '../storage/dispatch.actions';
import {useUserSelector} from '../storage/user.reducer';
import HomeNavigator from './home.navigator';
import LoginNavigator from './login.navigator';

function AppNavigator() {
  const [loading, setLoading] = useState(true);
  const token = useUserSelector((state) => state.user.token);
  const dispatch = useDispatch();

  useEffect(() => {
    getToken().then((response) => {
      if (response) {
        dispatch({type: Action.STORE_TOKEN, token: response});
      }
    });
    setLoading(false);
  });

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      {token ? <HomeNavigator /> : <LoginNavigator />}
    </NavigationContainer>
  );
}

export default AppNavigator;
