import { createStore, applyMiddleware, combineReducers } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
// import reducers from './reducers';

import counter from './reducers/counter'
import episodes from './reducers/episodes'
const reducer = combineReducers({ counter, episodes })

// const reducer = combineReducers(reducers);
const createStoreWithMiddleware = applyMiddleware(apiMiddleware)(createStore);

export default function configureStore(initialState) {
  return createStoreWithMiddleware(reducer, initialState);
}
