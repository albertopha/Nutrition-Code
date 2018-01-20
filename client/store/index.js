import {createStore, combineReducers, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './user';
import foods from './foods';
import barcodeFood from './barcodeFood';
import calories from './calories';

const reducer = combineReducers({user, foods, barcodeFood, calories});
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user';
export * from './foods';
export * from './barcodeFood';
export * from './calories';
