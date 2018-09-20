import ProfileService from './services';
import { logError } from 'errors/errorHandler';
import { enProfileActions } from './reducers';

export function canAccessContent(userId: any) {
  return async (dispatch: any) => {
    try {
      const review = await ProfileService.hasReview(userId);
      const wishs = await ProfileService.hasWish(userId);
      const rw = review.data.count;
      const ws = wishs.data.count;
      let access = (rw > 0 || ws > 0) ? true : false;
      dispatch({ type: enProfileActions.hasAccessSuccess, access });
    } catch (error) {
      dispatch({ type: enProfileActions.hasAccessError, error });
      logError(error);
    }
  };
}

export function listReviews(userId: any) {
  return async (dispatch: any) => {
    try {
      dispatch({ type: enProfileActions.requestListReview });
      const { data } = await ProfileService.listReview(userId);
      dispatch({ type: enProfileActions.receiveListReviewSuccess, data });
    } catch (error) {
      dispatch({ type: enProfileActions.receiveListReviewError, error });
      logError(error);
    }
  };
}

export function listWishs(userId: any) {
  return async (dispatch: any) => {
    try {
      dispatch({ type: enProfileActions.requestListWish });
      const { data } = await ProfileService.listWish(userId);
      dispatch({ type: enProfileActions.receiveListWishSuccess, data });
    } catch (error) {
      dispatch({ type: enProfileActions.receiveListWishError, error });
      logError(error);
    }
  };
}
