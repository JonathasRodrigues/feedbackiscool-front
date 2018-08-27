import SchoolService from './services';
import { logError } from 'errors/errorHandler';
import { enSchoolActions } from './reducers';

export function list(id?: any) {
  return async (dispatch: any) => {
    try {
      dispatch({ type: enSchoolActions.requestList });
      const { data } = await SchoolService.list(id);
      dispatch({ type: enSchoolActions.receiveListSuccess, data });
    } catch (error) {
      dispatch({ type: enSchoolActions.receiveListError, error });
      logError(error);
    }
  };
}

export function insert(school: any) {
  return async (dispatch: any) => {
    try {
      dispatch({ type: enSchoolActions.requestInsert });
      const { data } = await SchoolService.insert(school);
      dispatch({ type: enSchoolActions.receiveInsertSuccess, data });
    } catch (error) {
      dispatch({ type: enSchoolActions.receiveInsertError, error });
      logError(error);
    }
  };
}

export function selected(item: any) {
  return async (dispatch: any) => {
    try {
      dispatch({ type: enSchoolActions.selected, item });
    } catch (error) {
      logError(error);
    }
  };
}

export function findById(id?: any) {
  return async (dispatch: any) => {
    try {
      dispatch({ type: enSchoolActions.requestFindById });
      const { data } = await SchoolService.findById(id);
      dispatch({ type: enSchoolActions.receiveFindByIdSuccess, data });
    } catch (error) {
      dispatch({ type: enSchoolActions.receiveFindByIdError, error });
      logError(error);
    }
  };
}