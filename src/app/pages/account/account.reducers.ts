import ACTION_TYPES from '@app/core/constants/types';
import { createReducer } from '@app/core/helpers/reducer-factory';

const initialState = {
  isLoading: false,
  isSuccess: false,
  hasError: false,
  data: null,
  error: null,
};
const setAccountInfo = (state, payload) => ({
  ...state,
  data: payload,
});

const updateInfoSuccess = (state, payload) => ({
  ...state,
  isLoading: false,
  isSuccess: true,
  hasError: false,
  error: null,
  data: payload,
});

const updateInfoError = (state, payload) => ({
  ...state,
  isLoading: false,
  hasError: true,
  error: payload,
});

const updateInfoStart = (state) => ({
  ...state,
  isLoading: true,
  hasError: false,
  error: null,
});

const resetAccountState = (state) => ({
  ...state,
  isLoading: false,
  isSuccess: false,
  hasError: false,
  data: null,
  error: null,
});

const resetUpdateInfoState = (state) => ({
  ...state,
  isLoading: false,
  isSuccess: false,
  hasError: false,
  error: null,
});
const strategies = {
  [ACTION_TYPES.SET_ACCOUNT_INFO]: setAccountInfo,
  [ACTION_TYPES.UPDATE_INFO_START]: updateInfoStart,
  [ACTION_TYPES.UPDATE_INFO_SUCCESS]: updateInfoSuccess,
  [ACTION_TYPES.UPDATE_INFO_ERROR]: updateInfoError,
  [ACTION_TYPES.RESET_UPDATE_INFO_STATE]: resetUpdateInfoState,
  [ACTION_TYPES.RESET_ACCOUNT_STATE]: resetAccountState,
  __default__: (state) => state,
};

const accountReducer = createReducer(strategies, initialState);

export default accountReducer;
