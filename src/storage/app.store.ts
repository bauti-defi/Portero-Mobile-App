import {createStore} from 'redux-dynamic-modules';
import {getThunkExtension} from 'redux-dynamic-modules-thunk';
import {persistStore} from 'redux-persist';

export const store = createStore({extensions: [getThunkExtension()]});

export const persistor = persistStore(store);
