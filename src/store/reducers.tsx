import { combineReducers } from 'redux';
import { reducer as authReducer } from './Authentication/reducers';
import { reducer as cityReducer } from './City/reducers';
import { reducer as reviewReducer } from './Review/reducers';
import { reducer as schoolReducer } from './School/reducers';
//ALPHBETICAL ORDER

export const reducer = combineReducers({
  Authentication: authReducer,
  City: cityReducer,
  School: schoolReducer,
  Review: reviewReducer
});