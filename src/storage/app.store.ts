import {createStore} from 'redux-dynamic-modules';
import {getThunkExtension} from 'redux-dynamic-modules-thunk';
import {persistStore} from 'redux-persist';
import SessionModule from './session.module';
import UserModule from './user.module';

export const store = createStore(
  {extensions: [getThunkExtension()]},
  SessionModule,
  UserModule,
);

export const persistor = persistStore(store, {manualPersist: true});
