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

export function totalCities() {
  return async (dispatch: any) => {
    try {
      dispatch({ type: enCityActions.requestTotalCities });
      const { data } = await CityService.totalCities();
      dispatch({ type: enCityActions.successTotalCities, data });
    } catch (error) {
      dispatch({ type: enCityActions.errorTotalCities, error });
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

export function unSelected() {
  return async (dispatch: any) => {
    try {
      dispatch({ type: enCityActions.unselected });
    } catch (error) {
      logError(error);
    }
  };
}