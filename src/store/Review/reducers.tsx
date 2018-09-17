import { combineReducers } from 'redux';

export enum enReviewActions {
  requestList = 'REQUEST_LIST_REVIEW',
  receiveListSuccess = 'RECEIVE_LIST_REVIEW_SUCCESS',
  receiveListError = 'RECEIVE_LIST_REVIEW_ERROR',
  requestInsert = 'REQUEST_INSERT_REVIEW',
  receiveInsertSuccess = 'RECEIVE_INSERT_REVIEW_SUCCESS',
  receiveInsertError = 'RECEIVE_INSERT_REVIEW_ERROR',
  selected = 'SELECTED_REVIEW',
  requestFindById = 'REQUEST_FIND_BY_ID_REVIEW',
  receiveFindByIdSuccess = 'RECEIVE_FIND_BY_ID_REVIEW_SUCCESS',
  receiveFindByIdError = 'RECEIVE_FIND_BY_ID_REVIEW_ERROR',

  requestInsertProspect = 'REQUEST_INSERT_PROSPECT',
  receiveInsertProspectSuccess = 'RECEIVE_INSERT_PROSPECT_SUCCESS',
  receiveInsertProspectError = 'RECEIVE_INSERT_PROSPECT_ERROR',
}

const list = (state = { isFetching: false }, action: any) => {
  switch (action.type) {
    case enReviewActions.requestList:
      return {
        ...state,
        isFetching: true
      };
    case enReviewActions.receiveListSuccess:
    return {
        ...state,
        data: action.data,
        isFetching: false
      };
    case enReviewActions.receiveListError:
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
    case enReviewActions.requestInsert:
      return {
        ...state,
        isFetching: true
      };
    case enReviewActions.receiveInsertSuccess:
    return {
        ...state,
        data: action.data,
        isFetching: false
      };
    case enReviewActions.receiveInsertError:
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
    case enReviewActions.selected:
      return action.item;
    default:
      return state;
  }
};

const findById = (state = { isFetching: false }, action: any) => {
  switch (action.type) {
    case enReviewActions.requestFindById:
      return {
        ...state,
        isFetching: true
      };
    case enReviewActions.receiveFindByIdSuccess:
    return {
        ...state,
        data: action.data,
        isFetching: false
      };
    case enReviewActions.receiveFindByIdError:
      return {
        ...state,
        isFetching: false
      };
    default:
      return state;
  }
};

const insertProspect = (state = { isFetching: false }, action: any) => {
  switch (action.type) {
    case enReviewActions.requestInsertProspect:
      return {
        ...state,
        isFetching: true
      };
    case enReviewActions.receiveInsertProspectSuccess:
    return {
        ...state,
        data: action.data,
        isFetching: false
      };
    case enReviewActions.receiveInsertProspectError:
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
    insertProspect,
    selected,
    findById
});
