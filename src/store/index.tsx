import { createStore, applyMiddleware, combineReducers } from 'redux';
import { reducer } from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import * as createRavenMiddleware from 'raven-for-redux';
import Raven from 'raven-js';
import thunk from 'redux-thunk';

const appReducers = combineReducers({ app: reducer });

export default createStore(
  appReducers,
  composeWithDevTools(
    applyMiddleware(thunk, createRavenMiddleware(Raven,
      {
      getUserContext(state: any) {
        const { isAuthenticated } = state.app.Authentication.authentication;
        if (!isAuthenticated) return null;
        return {
          ...{ name: localStorage.getItem('name'), id: localStorage.getItem('id') },
          id: localStorage.getItem('id')
        };
      }
    }
  ))
  ),
);
