import React from 'react';
import {useUserSelector} from '../storage/app.selectors';
import PropietarioNavigator from './propietario.navigator';
import TrabajadorNavigator from './trabajador.navigator';

function HomeNavigator() {
  const accountType: number = useUserSelector((state) => state.cookie.type);

  return getNavigator(accountType);
}

const getNavigator = (type: number) => {
  switch (type) {
    case Type.PROPIETARIO:
      return <PropietarioNavigator />;
    case Type.TRABAJADOR:
      return <TrabajadorNavigator />;
    default:
      throw Error('Invalid account type.');
  }
};

enum Type {
  PROPIETARIO = 1,
  TRABAJADOR = 2,
}

export default HomeNavigator;
