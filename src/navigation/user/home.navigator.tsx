import React from 'react';
import {useUserSelector} from '../../storage/app.selectors';
import {AccountType} from '../../storage/user.module';
import GuardiaNavigator from '../guardia/guardia.navigator';
import PropietarioNavigator from '../propietario/propietario.navigator';
import UserNavigator from './user.navigator';

const HomeNavigator = () => {
  const accountType: AccountType = useUserSelector((user) => user.acc_type);

  return getNavigator(accountType);
};

const getNavigator = (type: number) => {
  switch (type) {
    case AccountType.PROPIETARIO:
      return <PropietarioNavigator />;
    case AccountType.GUARDIA:
      return <GuardiaNavigator />;
    default:
      return <UserNavigator />;
  }
};

export default HomeNavigator;
