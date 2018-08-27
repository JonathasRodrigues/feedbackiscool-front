import { combineReducers } from 'redux';

export enum enAuthenticationActions {
  requestLogin = 'REQUEST_LOGIN',
  receiveLoginSuccess = 'RECEIVE_LOGIN_SUCCESS',
  receiveLoginError = 'RECEIVE_LOGIN_ERROR',
  logout = 'LOGOUT',
  sessionExpired = 'SESSION_EXPIRED',
  requestRegister = 'REQUEST_REGISTER',
  receiveRegisterSuccess = 'RECEIVE_REGISTER_SUCCESS',
  receiveRegisterError = 'RECEIVE_REGISTER_ERROR',
  requestRecover = 'REQUEST_RECOVER',
  receiveRecoverSuccess = 'RECEIVE_RECOVER_SUCCESS',
  receiveRecoverError = 'RECEIVE_RECOVER_ERROR',
  requestPasswordChange = 'REQUEST_PASSWORD_CHANGE',
  receivePasswordChangeSuccess = 'RECEIVE_PASSWORD_CHANGE_SUCCESS',
  receivePasswordChangeError = 'RECEIVE_PASSWORD_CHANGE_ERROR',
  openOrCloseDrawer = 'OPEN_CLOSE_DRAWER'
}

const initialState = {
  isFetching: false,
  isAuthenticated: !!localStorage.getItem('acessToken')
};

const authentication = (state = initialState, action: any) => {
  switch (action.type) {
    case enAuthenticationActions.requestLogin:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false
      };
    case enAuthenticationActions.receiveLoginSuccess:
        localStorage.setItem('acessToken', action.data.id);
        localStorage.setItem('id', action.data.userId);
        return {
          ...state,
          isFetching: false,
          isAuthenticated: true
        };
    case enAuthenticationActions.receiveLoginError:

      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        error: action.error
      };
    case enAuthenticationActions.logout:
      localStorage.removeItem('acessToken');
      localStorage.removeItem('id');
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false
      };
    case enAuthenticationActions.sessionExpired:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false
      };
    default:
      return state;
  }
};

const register = (state = { isFetching: false }, action: any) => {
  switch (action.type) {
    case enAuthenticationActions.requestRegister:
      return {
        ...state,
        isFetching: true
      };
    case enAuthenticationActions.receiveRegisterSuccess:
      return {
        ...state,
        user: action.user,
        isFetching: false
      };
    case enAuthenticationActions.receiveRegisterError:
      return {
        ...state,
        isFetching: false
      };
    default:
      return state;
  }
};

const recover = (state = { isFetching: false }, action: any) => {
  switch (action.type) {
    case enAuthenticationActions.requestRecover:
      return {
        ...state,
        isFetching: true
      };
    case enAuthenticationActions.receiveRecoverSuccess:
      return {
        ...state,
        identification: action.identification,
        isFetching: false
      };
    case enAuthenticationActions.receiveRecoverError:
      return {
        ...state,
        isFetching: false,
        err: action.err
      };
    default:
      return state;
  }
};

const changePassword = (state = { isFetching: false }, action: any) => {
  switch (action.type) {
    case enAuthenticationActions.requestPasswordChange:
      return {
        ...state,
        isFetching: true
      };
    case enAuthenticationActions.receivePasswordChangeSuccess:
      return {
        ...state,
        newPassword: action.newPassword,
        isFetching: false
      };
    case enAuthenticationActions.receivePasswordChangeError:
      return {
        ...state,
        isFetching: false,
        err: action.err
      };
    default:
      return state;
  }
};

const drawer = (state = false, action: any) => {
  switch (action.type) {
    case enAuthenticationActions.openOrCloseDrawer:
      return action.open;
    default:
      return state;
  }
};

export const reducer = combineReducers({
  authentication,
  register,
  recover,
  changePassword,
  drawer
});
