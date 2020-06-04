import React from 'react';
import {useUserSelector} from '../../storage/app.selectors';
import GuardiaNavigator from '../guardia/guardia.navigator';
import PropietarioNavigator from '../propietario/propietario.navigator';

function HomeNavigator() {
  const accountType: number = useUserSelector((state) => state.cookie.type);

  return getNavigator(accountType);
}

const getNavigator = (type: number) => {
  switch (type) {
    case Type.PROPIETARIO:
      return <PropietarioNavigator />;
    case Type.GUARDIA:
      return <GuardiaNavigator />;
    default:
      throw Error('Invalid account type.');
  }
};

enum Type {
  PROPIETARIO = 1,
  GUARDIA = 2,
}

export default HomeNavigator;
