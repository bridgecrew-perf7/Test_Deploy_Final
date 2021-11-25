import React, { useContext, useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import NotificationContext from '@app/shared/contexts/NotificationContext/NotificationContext';
import { AccountService } from '@app/core/services/account.service';
import LoadingButton from '@app/shared/components/loading-button/LoadingButton';

const accountService = new AccountService();
const PasswordChange = () => {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const navigate = useNavigate();
  const { showNotification } = useContext(NotificationContext);

  const newPassword = useRef({});
  newPassword.current = watch('newPassword', '');

  const changePassword = async (data) => {
    delete data.reNewPassword;
    try {
      setIsLoading(true);
      setHasError(false);
      const res = await accountService.updatePassword(data);
      setIsLoading(false);
      setSuccessMsg(res);
    } catch (error) {
      setHasError(true);
      setIsLoading(false);
    }
  };

  // Show notification
  useEffect(() => {
    if (successMsg) {
      showNotification({ isSuccess: true, message: successMsg });
    }
  }, [successMsg]);

  if (!!successMsg) {
    return <Navigate to={'/account/info'} />;
  }

  return (
    <div className="container">
      <div className="sub-heading mb-2">
        <h2 className="txt-center">Password Change</h2>
      </div>
      <form
        className="form form-horizontal form-outline"
        onSubmit={handleSubmit(changePassword)}
      >
        <div className="form-control">
          <div className="form-label-box">
            <label className="form-label" htmlFor="old-password">
              Old Password
            </label>
          </div>
          <div className="form-box">
            <input
              className={`form-input ${errors.oldPassword ? 'invalid' : ''}`}
              id="old-password"
              type="password"
              name="oldPassword"
              placeholder="Old Password"
              {...register('oldPassword', {
                required: 'Please input old password',
                minLength: {
                  value: 8,
                  message: 'Password at least 8 characters',
                },
              })}
            />
            {errors.oldPassword && (
              <span className="form-error">{errors.oldPassword.message}</span>
            )}
          </div>
        </div>
        <div className="form-control">
          <div className="form-label-box">
            <label className="form-label" htmlFor="new-password">
              New Password
            </label>
          </div>
          <div className="form-box">
            <input
              className={`form-input ${errors.newPassword ? 'invalid' : ''}`}
              id="new-password"
              type="password"
              name="newPassword"
              placeholder="New Password"
              {...register('newPassword', {
                required: 'Please input new password',
                minLength: {
                  value: 8,
                  message: 'Password at least 8 characters',
                },
              })}
            />
            {errors.newPassword && (
              <span className="form-error">{errors.newPassword.message}</span>
            )}
          </div>
        </div>
        <div className="form-control">
          <div className="form-label-box">
            <label className="form-label" htmlFor="re-new-password">
              Confirm New Password
            </label>
          </div>
          <div className="form-box">
            <input
              className={`form-input ${errors.reNewPassword ? 'invalid' : ''}`}
              id="re-new-password"
              type="password"
              placeholder="Confirm New Password"
              {...register('reNewPassword', {
                validate: (value) =>
                  value === newPassword.current || 'Not match password',
              })}
            />
            {errors.reNewPassword && (
              <span className="form-error">{errors.reNewPassword.message}</span>
            )}
            {successMsg && <span className="mt-5">{successMsg}</span>}
          </div>
        </div>
        {hasError && (
          <span className="form-error txt-center">
            Please check your password again
          </span>
        )}
        <LoadingButton
          classBtn="btn btn-primary btn-form-horizontal"
          loading={isLoading}
        >
          Change Password
        </LoadingButton>
      </form>
    </div>
  );
};

export default PasswordChange;
