import AuthenticationService from './services';
import { logError } from 'errors/errorHandler';
import { enAuthenticationActions } from './reducers';

export function register(user: any) {
  return async (dispatch: any) => {
    try {
      dispatch({ type: enAuthenticationActions.requestRegister });
      const { data } = await AuthenticationService.register(user);
      dispatch({ type: enAuthenticationActions.receiveRegisterSuccess, data });
    } catch (error) {
      dispatch({ type: enAuthenticationActions.receiveRegisterError, error });
      logError(error);
    }
  };
}
export function login(email: string, password: string) {
  return async (dispatch: any) => {
    try {
      dispatch({ type: enAuthenticationActions.requestLogin });
      const { data } = await AuthenticationService.login(email, password);
      dispatch({ type: enAuthenticationActions.receiveLoginSuccess, data });
    } catch (error) {
      dispatch({ type: enAuthenticationActions.receiveLoginError, error });
      logError(error);
    }
  };
}
export function recover(identification: string) {
  return async (dispatch: any) => {
    try {
      dispatch({ type: enAuthenticationActions.requestRecover });
      const { data } = await AuthenticationService.recover(identification);
      dispatch({ type: enAuthenticationActions.receiveRecoverSuccess, data });
    } catch (error) {
      dispatch({ type: enAuthenticationActions.receiveRecoverError, error });
      logError(error);
    }
  };
}
export function passwordChange(newPassword: any) {
  return async (dispatch: any) => {
    try {
      dispatch({ type: enAuthenticationActions.requestPasswordChange });
      const { data } = await AuthenticationService.changePassword(newPassword);
      dispatch({ type: enAuthenticationActions.receivePasswordChangeSuccess, data });
    } catch (error) {
      dispatch({ type: enAuthenticationActions.receivePasswordChangeError, error });
      logError(error);
    }
  };
}

export function logout() {
  return async (dispatch: any) => {
    try {
      dispatch({ type: enAuthenticationActions.logout });
    } catch (error) {
      logError(error);
    }
  };
}

export function drawer(open: boolean) {
  return async (dispatch: any) => {
    try {
      dispatch({ type: enAuthenticationActions.openOrCloseDrawer, open });
    } catch (error) {
      logError(error);
    }
  };
}