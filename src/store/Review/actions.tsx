import ReviewService from './services';
import { logError } from 'errors/errorHandler';
import { enReviewActions } from './reducers';

export function list(id?: any) {
  return async (dispatch: any) => {
    try {
      dispatch({ type: enReviewActions.requestList });
      const { data } = await ReviewService.list(id);
      dispatch({ type: enReviewActions.receiveListSuccess, data });
    } catch (error) {
      dispatch({ type: enReviewActions.receiveListError, error });
      logError(error);
    }
  };
}

export function insert(review: any) {
  return async (dispatch: any) => {
    try {
      dispatch({ type: enReviewActions.requestInsert });
      const { data } = await ReviewService.insert(review);
      dispatch({ type: enReviewActions.receiveInsertSuccess, data });
    } catch (error) {
      dispatch({ type: enReviewActions.receiveInsertError, error });
      logError(error);
    }
  };
}

export function selected(item: any) {
  return async (dispatch: any) => {
    try {
      dispatch({ type: enReviewActions.selected, item });
    } catch (error) {
      logError(error);
    }
  };
}

export function findById(id?: any) {
  return async (dispatch: any) => {
    try {
      dispatch({ type: enReviewActions.requestFindById });
      const { data } = await ReviewService.findById(id);
      dispatch({ type: enReviewActions.receiveFindByIdSuccess, data });
    } catch (error) {
      dispatch({ type: enReviewActions.receiveFindByIdError, error });
      logError(error);
    }
  };
}

export function insertProspect(prospect: any) {
  return async (dispatch: any) => {
    try {
      dispatch({ type: enReviewActions.requestInsertProspect });
      const { data } = await ReviewService.insertProspect(prospect);
      dispatch({ type: enReviewActions.receiveInsertProspectSuccess, data });
    } catch (error) {
      dispatch({ type: enReviewActions.receiveInsertProspectError, error });
      logError(error);
    }
  };
}

export function totalReviews() {
  return async (dispatch: any) => {
    try {
      dispatch({ type: enReviewActions.requestTotalReviews });
      const { data } = await ReviewService.totalReviews();
      dispatch({ type: enReviewActions.successTotalReviews, data });
    } catch (error) {
      dispatch({ type: enReviewActions.errorTotalReviews, error });
      logError(error);
    }
  };
}

export function listLast() {
  return async (dispatch: any) => {
    try {
      dispatch({ type: enReviewActions.requestListLast });
      const { data } = await ReviewService.listLast();
      dispatch({ type: enReviewActions.receiveListLastSuccess, data });
    } catch (error) {
      dispatch({ type: enReviewActions.receiveListLastError, error });
      logError(error);
    }
  };
}
