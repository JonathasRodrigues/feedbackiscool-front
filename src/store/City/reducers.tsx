import { combineReducers } from 'redux';

export enum enCityActions {
  requestList = 'REQUEST_LIST_CITY',
  receiveListSuccess = 'RECEIVE_LIST_CITY_SUCCESS',
  receiveListError = 'RECEIVE_LIST_CITY_ERROR',
  selected = 'SELECTED_CITY',
  unselected = 'UNSELECTED_CITY',
  requestTotalCities = 'REQUEST_TOTAL_CITIES',
  successTotalCities = 'SUCCESS_TOTAL_CITIES',
  errorTotalCities = 'ERROR_TOTAL_CITIES',

}

const list = (state = { isFetching: false }, action: any) => {
  switch (action.type) {
    case enCityActions.requestList:
      return {
        ...state,
        isFetching: true
      };
    case enCityActions.receiveListSuccess:
    return {
        ...state,
        data: action.data,
        isFetching: false
      };
    case enCityActions.receiveListError:
      return {
        ...state,
        isFetching: false
      };
    default:
      return state;
  }
};

const selected = (state = {}, action: any) => {
  switch(action.type) {
    case enCityActions.selected:
      return action.item;
    case enCityActions.unselected:
      return null;
    default:
      return state;
  }
};

const total = (state = { isFetching: false }, action: any) => {
  switch (action.type) {
    case enCityActions.requestTotalCities:
      return {
        ...state,
        isFetching: true
      };
    case enCityActions.successTotalCities:
    return {
        ...state,
        data: action.data.count,
        isFetching: false
      };
    case enCityActions.errorTotalCities:
      return {
        ...state,
        isFetching: false
      };
    default:
      return state;
  }
};

export const reducer = combineReducers({
    list,
    selected,
    total
});
