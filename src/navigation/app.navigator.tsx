import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {getToken} from '../jwt.service';
import SplashScreen from '../screens/splash.screen';
import {useUserSelector} from '../storage/app.selectors';
import {Action} from '../storage/dispatch.actions';
import HomeNavigator from './home.navigator';
import LoginNavigator from './login.navigator';

function AppNavigator() {
  const [loading, setLoading] = useState(true);
  const token = useUserSelector((state) => state.token);
  const dispatch = useDispatch();

  async function fetchToken() {
    console.log('fetching token...');
    const token: string | false = await getToken();
    if (token) {
      console.log(`found token: ${token}`);
      dispatch({type: Action.STORE_TOKEN, token});
    }
  }

  useEffect(() => {
    async function fetch() {
      await fetchToken();
    }

    if (!token) {
      fetch();
    }
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
