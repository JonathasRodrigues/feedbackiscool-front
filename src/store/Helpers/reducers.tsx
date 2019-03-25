import { combineReducers } from 'redux';

import listCountries from './countries';
import listCurrencies from './currencies';

const countries = () => {
  return listCountries;
};

const currencies = () => {
  return listCurrencies;
};

const modalWelcome = (state = false, action: any) => {
  switch (action.type) {
    case 'MODAL_WELCOME_OPEN':
      return true;
    case 'MODAL_WELCOME_CLOSE':
    default:
      return false;
  }
};

export const reducer = combineReducers({
  countries,
  currencies,
  modalWelcome
});