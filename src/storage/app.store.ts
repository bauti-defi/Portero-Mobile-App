import {createStore} from 'redux-dynamic-modules';
import {getThunkExtension} from 'redux-dynamic-modules-thunk';
import {persistStore} from 'redux-persist';
import RootModule from './root.module';

export const store = createStore(
  {extensions: [getThunkExtension()]},
  RootModule,
);

export const persistor = persistStore(store);
