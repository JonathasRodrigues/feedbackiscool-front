import { combineReducers } from 'redux';

export enum enSchoolActions {
  requestList = 'REQUEST_LIST_SCHOOL',
  receiveListSuccess = 'RECEIVE_LIST_SCHOOL_SUCCESS',
  receiveListError = 'RECEIVE_LIST_SCHOOL_ERROR',
  requestInsert = 'REQUEST_INSERT_SCHOOL',
  receiveInsertSuccess = 'RECEIVE_INSERT_SCHOOL_SUCCESS',
  receiveInsertError = 'RECEIVE_INSERT_SCHOOL_ERROR',
  selected = 'SELECTED_SCHOOL',
  requestFindById = 'REQUEST_FIND_BY_ID_SCHOOL',
  receiveFindByIdSuccess = 'RECEIVE_FIND_BY_ID_SCHOOL_SUCCESS',
  receiveFindByIdError = 'RECEIVE_FIND_BY_ID_SCHOOL_ERROR',
}

const list = (state = { isFetching: false }, action: any) => {
  switch (action.type) {
    case enSchoolActions.requestList:
      return {
        ...state,
        isFetching: true
      };
    case enSchoolActions.receiveListSuccess:
    return {
        ...state,
        data: action.data,
        isFetching: false
      };
    case enSchoolActions.receiveListError:
      return {
        ...state,
        isFetching: false
      };
    default:
      return state;
  }
};

const insert = (state = { isFetching: false }, action: any) => {
  switch (action.type) {
    case enSchoolActions.requestInsert:
      return {
        ...state,
        isFetching: true
      };
    case enSchoolActions.receiveInsertSuccess:
    return {
        ...state,
        data: action.data,
        isFetching: false
      };
    case enSchoolActions.receiveInsertError:
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
    case enSchoolActions.selected:
      return action.item;
    default:
      return state;
  }
};

const findById = (state = { isFetching: false }, action: any) => {
  switch (action.type) {
    case enSchoolActions.requestFindById:
      return {
        ...state,
        isFetching: true
      };
    case enSchoolActions.receiveFindByIdSuccess:
    return {
        ...state,
        data: action.data,
        isFetching: false
      };
    case enSchoolActions.receiveFindByIdError:
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
    insert,
    selected,
    findById
});
