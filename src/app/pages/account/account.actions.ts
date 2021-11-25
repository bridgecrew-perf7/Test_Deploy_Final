import ACTION_TYPES from '@app/core/constants/types';
import { AccountService } from '@app/core/services/account.service';
import { uploadImage } from '@app/core/services/upload.service';
const accountService = new AccountService();

export const updatePersonalInfo = (payload) => async (dispatch) => {
  try {
    dispatch(updateInfoStart());
    const res = await accountService.updatePersonalInfo(payload);
    dispatch(updateInfoSuccess(res));
    dispatch(resetUpdateInfoState());
  } catch (error) {
    dispatch(updateInfoError(error.response.data));
    dispatch(resetUpdateInfoState());
  }
};

export const changeAvatar = (payload) => async (dispatch) => {
  try {
    dispatch(updateInfoStart());
    let urlImage = null;
    await uploadImage(payload.picture[0]).then((res) => {
      urlImage = res;
    });
    const fullInfo = { ...payload, picture: urlImage };
    dispatch(updatePersonalInfo(fullInfo));
  } catch (error) {
    dispatch(updateInfoError(error.response.data));
  }
};
export const setAccountInfo = (payload) => ({
  type: ACTION_TYPES.SET_ACCOUNT_INFO,
  payload,
});

export const updateInfoStart = () => ({
  type: ACTION_TYPES.UPDATE_INFO_START,
});

export const updateInfoSuccess = (payload) => ({
  type: ACTION_TYPES.UPDATE_INFO_SUCCESS,
  payload,
});

export const updateInfoError = (payload) => ({
  type: ACTION_TYPES.UPDATE_INFO_ERROR,
  payload,
});

export const resetUpdateInfoState = () => ({
  type: ACTION_TYPES.RESET_UPDATE_INFO_STATE,
});

export const resetAccountState = () => ({
  type: ACTION_TYPES.RESET_ACCOUNT_STATE,
});
