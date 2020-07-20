import React from 'react';
import {DynamicModuleLoader} from 'redux-dynamic-modules';
import {useUserSelector} from '../../storage/app.selectors';
import InviteModule from '../../storage/invite.module';
import LoteModule from '../../storage/lote.module';
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
      return (
        //@ts-ignore word typing error
        <DynamicModuleLoader modules={[InviteModule, LoteModule]}>
          <PropietarioNavigator />
        </DynamicModuleLoader>
      );
    case AccountType.GUARDIA:
      return <GuardiaNavigator />;
    default:
      return <UserNavigator />;
  }
};

export default HomeNavigator;
