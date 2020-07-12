import React from 'react';
import {useUserSelector} from '../../storage/app.selectors';
import GuardiaNavigator from '../guardia/guardia.navigator';
import PropietarioNavigator from '../propietario/propietario.navigator';

enum Type {
  PROPIETARIO = 1,
  GUARDIA = 2,
}

const HomeNavigator = () => {
  const accountType: number = useUserSelector((user) => user.acc_type);

  return getNavigator(accountType);
};

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

export default HomeNavigator;
