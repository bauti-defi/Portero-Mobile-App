import {useUserSelector} from 'src/storage/app.selectors';
import PropietarioNavigator from './propietario.navigator';

function HomeNavigator() {
  const accountType: number = useUserSelector((state) => state.type);

  return getNavigator(accountType);
}

const getNavigator = (type: number) => {
  switch (type) {
    case Type.PROPIETARIO:
      return <PropietarioNavigator />;
    default:
      throw Error('Invalid account type.');
  }
};

enum Type {
  PROPIETARIO = 1,
  TRABAJADOR = 2,
}

export default HomeNavigator;
