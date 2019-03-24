import { combineReducers } from 'redux';

import listCountries from './countries';

const countries = () => {
  return listCountries;
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
  modalWelcome
});