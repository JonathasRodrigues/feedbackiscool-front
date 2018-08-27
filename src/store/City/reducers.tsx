import { combineReducers } from 'redux';

export enum enCityActions {
  requestList = 'REQUEST_LIST_CITY',
  receiveListSuccess = 'RECEIVE_LIST_CITY_SUCCESS',
  receiveListError = 'RECEIVE_LIST_CITY_ERROR',
  selected = 'SELECTED_CITY',
}

const list = (state = { isFetching: false }, action: any) => {
  switch (action.type) {
    case enCityActions.requestList:
      return {
        ...state,
        isFetching: true
      };
    case enCityActions.receiveListSuccess:
    console.log(action);
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
    default:
      return state;
  }
};

export const reducer = combineReducers({
    list,
    selected
});
