import ACTION_TYPES from '@app/core/constants/types';
import {
  setAccountInfo,
  resetAccountState,
} from '@app/pages/account/account.actions';
import { AccountService } from '../services/account.service';
import { AuthService } from '../services/auth.service';

const auth = new AuthService();
const account = new AccountService();

// Validate Auth Token stored in localStorage
export const validateAuthToken = () => async (dispatch) => {
  try {
    dispatch(authStart());
    const res = await account.getPersonalInfo();
    dispatch(
      authSuccess({
        accessToken: auth.getToken(),
        userInfo: res,
      })
    );
    dispatch(setAccountInfo(res));
  } catch (error) {
    dispatch(resetAuth());
  }
};

// Sign In
export const signIn = (payload) => async (dispatch) => {
  try {
    dispatch(authStart());
    const res = await auth.signIn(payload);
    auth.setToken((<any>res).accessToken);
    dispatch(setAccountInfo((<any>res).userInfo));
    dispatch(authSuccess(res));
  } catch (error) {
    dispatch(authError(error.response.data));
  }
};

// Sign Out
export const signOut = () => async (dispatch) => {
  try {
    dispatch(authStart());
    auth.removeToken();
    dispatch(resetAccountState());
    dispatch(resetAuth());
  } catch (error) {
    console.log(error);
  }
};

// Sign In Google
export const signInGoogle = (payload) => async (dispatch) => {
  try {
    auth.setToken(payload);
  } catch (error) {
    dispatch(authError(error.response.data));
  }
};

// Register
export const registerAccount = (payload) => async (dispatch) => {
  try {
    dispatch(authStart());
    const res = await auth.register(payload);
    dispatch(authSuccess(res));
  } catch (error) {
    dispatch(authError(error.response.data));
  }
};
/* 
  Auth action
*/
export const authStart = () => ({
  type: ACTION_TYPES.AUTH_START,
});

export const authSuccess = (payload) => ({
  type: ACTION_TYPES.AUTH_SUCCESS,
  payload,
});

export const authError = (payload) => ({
  type: ACTION_TYPES.AUTH_ERROR,
  payload,
});
export const resetAuth = () => ({
  type: ACTION_TYPES.RESET_AUTH_STATE,
});
