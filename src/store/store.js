import {
  createStore, combineReducers,
  compose, applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import usersFromServerReducer from './reducers/usersFromServerReducer';

const rootReducer = combineReducers({
  usersFromServer: usersFromServerReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [thunk];

export const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(...middlewares)
  ),
);
