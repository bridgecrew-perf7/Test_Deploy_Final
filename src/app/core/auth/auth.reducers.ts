import { createReducer } from '@app/core/helpers/reducer-factory';
import ACTION_TYPES from '@core/constants/types';

const initialState = {
  isLoading: false,
  isProcessing: false,
  hasError: false,
  data: null,
  error: null,
};

const authSuccess = (state, payload) => ({
  ...state,
  isLoading: false,
  hasError: false,
  error: null,
  data: payload,
});

const authError = (state, payload) => ({
  ...state,
  isLoading: false,
  hasError: true,
  error: payload,
});

const authStart = (state) => ({
  ...state,
  isLoading: true,
  hasError: false,
  error: null,
});

const resetAuth = (state) => ({
  ...state,
  isLoading: false,
  isProcessing: false,
  hasError: false,
  data: null,
  error: null,
});

const strategies = {
  [ACTION_TYPES.AUTH_SUCCESS]: authSuccess,
  [ACTION_TYPES.AUTH_START]: authStart,
  [ACTION_TYPES.AUTH_ERROR]: authError,
  [ACTION_TYPES.RESET_AUTH_STATE]: resetAuth,
  __default__: (state) => state,
};

const authReducer = createReducer(strategies, initialState);

export default authReducer;
