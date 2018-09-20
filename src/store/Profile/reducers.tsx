import { combineReducers } from 'redux';

export enum enProfileActions {
  requestListReview = 'REQUEST_LIST_REVIEW',
  receiveListReviewSuccess = 'RECEIVE_LIST_REVIEW_SUCCESS',
  receiveListReviewError = 'RECEIVE_LIST_REVIEW_ERROR',

  requestListWish = 'REQUEST_LIST_WISH',
  receiveListWishSuccess = 'RECEIVE_LIST_WISH_SUCCESS',
  receiveListWishError = 'RECEIVE_LIST_WISH_ERROR',
  hasAccessSuccess = 'HAS_ACCESS_SUCCESS',
  hasAccessError = 'HAS_ACCESS_ERROR'
}

const listReview = (state = { isFetching: false }, action: any) => {
  switch (action.type) {
    case enProfileActions.requestListReview:
      return {
        ...state,
        isFetching: true
      };
    case enProfileActions.receiveListReviewSuccess:
    return {
        ...state,
        data: action.data,
        isFetching: false
      };
    case enProfileActions.receiveListReviewError:
      return {
        ...state,
        isFetching: false
      };
    default:
      return state;
  }
};

const listWish = (state = { isFetching: false }, action: any) => {
  switch (action.type) {
    case enProfileActions.requestListWish:
      return {
        ...state,
        isFetching: true
      };
    case enProfileActions.receiveListWishSuccess:
    return {
        ...state,
        data: action.data,
        isFetching: false
      };
    case enProfileActions.receiveListWishError:
      return {
        ...state,
        isFetching: false
      };
    default:
      return state;
  }
};

const hasAccess = (state = false, action: any) => {
  switch (action.type) {
    case enProfileActions.hasAccessSuccess:
      return action.access;
    case enProfileActions.hasAccessError:
    default:
      return state;
  }
};

export const reducer = combineReducers({
    listReview,
    listWish,
    hasAccess
});
