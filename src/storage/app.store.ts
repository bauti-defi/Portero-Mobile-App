import {createStore} from 'redux-dynamic-modules';
import {getThunkExtension} from 'redux-dynamic-modules-thunk';
import LoadAppModule from './load.app.module';

export const store = createStore(
  {
    extensions: [getThunkExtension()],
  },
  //@ts-ignore
  LoadAppModule,
);

//@ts-ignore
//const persistor = persistStore(store);
