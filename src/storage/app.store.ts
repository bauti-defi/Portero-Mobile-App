import {createStore, combineReducers} from 'redux'
import rootReducer from './root.reducer'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

const reducers = combineReducers({
    rootReducer
})

export const store = createStore(reducers)