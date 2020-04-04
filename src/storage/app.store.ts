import {createStore, combineReducers, Reducer} from 'redux'
import useReducer from './user.reducer'


const rootReducer = combineReducers({
    user: useReducer
})

export type RootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)