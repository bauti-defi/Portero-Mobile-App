import AsyncStorage from '@react-native-community/async-storage';
import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import loteReducer from './lotes.reducer';
import userReducer from './user.reducer';

const rootReducer = combineReducers({
  user: userReducer,
  lote: loteReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['userReducer'],
};

const persistedRootReducer = persistReducer(persistConfig, rootReducer);

export default persistedRootReducer;
