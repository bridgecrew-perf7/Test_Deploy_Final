import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router';
import NotificationContext from '@app/shared/contexts/NotificationContext/NotificationContext';
import { resetAccountState, updatePersonalInfo } from '../account.actions';
import LoadingButton from '@app/shared/components/loading-button/LoadingButton';

const FormUpdateInfo = (props) => {
  const accountReducer = useSelector((state: any) => state.accountReducer);
  const dataInfo = accountReducer.data;
  const { showNotification } = useContext(NotificationContext);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const formObject = getValues();
    for (const key in formObject) {
      if (key === 'dob') {
        setValue(key, dataInfo[key].split('/').reverse().join('-'));
      } else {
        setValue(key, dataInfo[key]);
      }
    }
  }, []);

  useEffect(() => {
    if (accountReducer.isSuccess) {
      showNotification({
        isSuccess: true,
        message: 'Update successfully !',
      });
    }
    if (accountReducer.hasError) {
      showNotification({
        isSuccess: false,
        message: accountReducer.error.errors[0],
      });
    }
  }, [accountReducer]);
  const onSubmit = async (data) => {
    delete data.email;
    dispatch(updatePersonalInfo(data));
  };
  if (accountReducer.isSuccess) {
    return <Navigate to={'/account/info'} />;
  }
  return (
    <form
      className="form form-horizontal form-outline"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="form-control">
        <div className="form-label-box">
          <label className="form-label">Name</label>
        </div>
        <div className="form-box form-6">
          <div className="form-box">
            <input
              className={`form-input ${errors.firstName ? 'invalid' : ''}`}
              id="first-name"
              type="text"
              placeholder="First Name"
              {...register('firstName', {
                required: 'Please input your first name',
              })}
            />
            {errors.firstName && (
              <span className="form-error">{errors.firstName.message}</span>
            )}
          </div>
          <div className="form-box">
            <input
              className={`form-input ${errors.lastName ? 'invalid' : ''}`}
              id="last-name"
              type="text"
              placeholder="Last Name"
              {...register('lastName', {
                required: 'Please input your last name',
              })}
            />
            {errors.lastName && (
              <span className="form-error">{errors.lastName.message}</span>
            )}
          </div>
        </div>
      </div>
      <div className="form-control">
        <div className="form-label-box">
          <label className="form-label" htmlFor="display-name">
            Display Name
          </label>
        </div>
        <div className="form-box">
          <input
            className={`form-input ${errors.displayName ? 'invalid' : ''}`}
            id="display-name"
            type="text"
            placeholder="Display Name"
            {...register('displayName', {
              required: 'Please input display name',
            })}
          />
          {errors.displayName && (
            <span className="form-error">{errors.displayName.message}</span>
          )}
        </div>
      </div>
      <div className="form-control">
        <div className="form-label-box">
          <label className="form-label" htmlFor="phone">
            Phone Number
          </label>
        </div>
        <div className="form-box">
          <input
            className={`form-input ${errors.phone ? 'invalid' : ''}`}
            id="phone"
            type="tel"
            placeholder="Phone Number"
            {...register('phone', {
              required: 'Please input your phone number',
              pattern: {
                value: /^\d+$/g,
                message: 'Invalid phone number',
              },
            })}
          />
          {errors.phone && (
            <span className="form-error">{errors.phone.message}</span>
          )}
        </div>
      </div>
      <div className="form-control">
        <div className="form-label-box">
          <label className="form-label" htmlFor="dob">
            Date Of Birth
          </label>
        </div>
        <div className="form-box">
          <input
            className={`form-input ${errors.dob ? 'invalid' : ''}`}
            id="dob"
            type="date"
            {...register('dob', {
              required: 'Please input your date of birth',
            })}
          />
          {errors.dob && (
            <span className="form-error">{errors.dob.message}</span>
          )}
        </div>
      </div>
      <div className="form-control">
        <div className="form-label-box">
          <label className="form-label" htmlFor="gender">
            Gender
          </label>
        </div>
        <div className="form-box">
          <div className="form-box form-radio">
            <div>
              <input
                {...register('gender', {
                  required: 'Please choose your gender',
                })}
                type="radio"
                name="gender"
                value="male"
                id="male"
              />
              <label htmlFor="male" className="form-radio-label">
                Male
              </label>
            </div>
            <div>
              <input
                {...register('gender')}
                type="radio"
                name="gender"
                value="female"
                id="female"
              />
              <label htmlFor="female" className="form-radio-label">
                Female
              </label>
            </div>
            <div>
              <input
                {...register('gender')}
                type="radio"
                name="gender"
                value="other"
                id="other"
              />
              <label htmlFor="other" className="form-radio-label">
                Other
              </label>
            </div>
          </div>
          {errors.gender && (
            <span className="form-error">{errors.gender.message}</span>
          )}
        </div>
      </div>
      <div className="form-control">
        <div className="form-label-box">
          <label className="form-label" htmlFor="email">
            Email
          </label>
        </div>
        <div className="form-box">
          <input
            className={`form-input ${errors.email ? 'invalid' : ''}`}
            id="email"
            type="text"
            placeholder="Email"
            {...register('email')}
            disabled
          />
          {errors.email && (
            <span className="form-error">{errors.email.message}</span>
          )}
        </div>
      </div>
      {accountReducer.error && accountReducer.hasError ? (
        <p className="txt-error txt-center">{accountReducer.error.errors[0]}</p>
      ) : (
        ''
      )}
      <LoadingButton
        classBtn="btn btn-primary btn-form-horizontal"
        loading={accountReducer.isLoading}
      >
        Save
      </LoadingButton>
    </form>
  );
};

export default FormUpdateInfo;
