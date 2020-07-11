import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import SplashScreen from '../../screens/user/splash.screen';
import {getCredentials} from '../../secure.storage';
import {useUserSelector} from '../../storage/app.selectors';
import {APP_ACTION} from '../../storage/storage.actions';
import HomeNavigator from './home.navigator';
import LoginNavigator from './login.navigator';

function AppNavigator() {
  const [loading, setLoading] = useState(true);
  const email: string = useUserSelector((user) => user.email);
  const dispatch = useDispatch();

  useEffect(() => {
    console.debug('Fetching credentials from keychain...');
    getCredentials()
      .then((credentials) => {
        if (!!credentials.password) {
          console.debug(`Found credentials for: ${credentials.username}!`);
          dispatch({
            type: APP_ACTION.LOAD,
            token: credentials.password,
          });
        } else {
          console.debug(`No credentials found!`);
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
      {email ? <HomeNavigator /> : <LoginNavigator />}
    </NavigationContainer>
  );
}

export default AppNavigator;
