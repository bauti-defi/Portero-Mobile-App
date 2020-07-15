import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {AppAction} from '../../actions/app.actions';
import {loadSession} from '../../actions/session.actions';
import SplashScreen from '../../screens/user/splash.screen';
import {useSessionSelector, useUserSelector} from '../../storage/app.selectors';
import HomeNavigator from './home.navigator';
import LoginNavigator from './login.navigator';

function AppNavigator() {
  const hasUser = useUserSelector((user) => !!user);
  const session = useSessionSelector((session) => session);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: AppAction.START_LOADING});
    dispatch(loadSession());
  }, []);

  if (session!.loadingToken) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      {session.token && hasUser ? <HomeNavigator /> : <LoginNavigator />}
    </NavigationContainer>
  );
}

export default AppNavigator;
