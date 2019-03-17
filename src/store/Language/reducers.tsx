import { combineReducers } from 'redux';

import en_US from 'antd/lib/locale-provider/en_US';
import enLocale from 'locales/en_US';

import pt_BR from 'antd/lib/locale-provider/pt_BR';
import ptLocale from 'locales/pt_BR';

const all = ( state = [
  {
    messages:  Object.assign({}, ptLocale),
    locale: 'pt',
    data: pt_BR,
    lg: 'Portuguese'
  },
  {
    messages:  Object.assign({}, enLocale),
    locale: 'en',
    data: en_US,
    lg: 'English'
  }
], action: any) => { return state; };

const defaultLocale = {
  messages:  Object.assign({}, enLocale),
  locale: 'en',
  data: en_US,
  lg: 'English'
};

const current = (state = defaultLocale, action: any) => {
  switch (action.type) {
    case 'CHANGE_CURRENT_LANGUAGE':
      return action.newLanguage;
    default:
      return state;
  }
};

export const reducer = combineReducers({
    current,
    all
});