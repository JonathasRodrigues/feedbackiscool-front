import { combineReducers } from 'redux';

import listCountries from './countries';

const countries = () => {
  return listCountries;
};

export const reducer = combineReducers({
  countries
});