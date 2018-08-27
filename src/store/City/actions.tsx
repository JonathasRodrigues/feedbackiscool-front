import CityService from './services';
import { logError } from 'errors/errorHandler';
import { enCityActions } from './reducers';

export function list() {
  return async (dispatch: any) => {
    try {
      dispatch({ type: enCityActions.requestList });
      const { data } = await CityService.list();
      dispatch({ type: enCityActions.receiveListSuccess, data });
    } catch (error) {
      dispatch({ type: enCityActions.receiveListError, error });
      logError(error);
    }
  };
}

export function selected(item: any) {
  return async (dispatch: any) => {
    try {
      dispatch({ type: enCityActions.selected, item });
    } catch (error) {
      logError(error);
    }
  };
}