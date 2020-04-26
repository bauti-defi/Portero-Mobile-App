import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import SplashScreen from '../screens/splash.screen';
import {getCookie} from '../secure.storage';
import {useUserSelector} from '../storage/app.selectors';
import {UserAction} from '../storage/user.reducer';
import HomeNavigator from './home.navigator';
import LoginNavigator from './login.navigator';

function AppNavigator() {
  const [loading, setLoading] = useState(true);
  const cookie = useUserSelector((state) => state.cookie);
  const dispatch = useDispatch();

  useEffect(() => {
    console.debug('Fetching cookie from storage...');
    getCookie()
      .then((cookie) => {
        if (cookie) {
          console.debug('Found cookie!');
          dispatch({type: UserAction.STORE_COOKIE, cookie});
        }
        setLoading(false);
      })
      .catch((error) => setLoading(false));
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      {cookie.token ? <HomeNavigator /> : <LoginNavigator />}
    </NavigationContainer>
  );
}

export default AppNavigator;
