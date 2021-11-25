import { combineReducers } from 'redux';

import authReducer from '@app/core/auth/auth.reducers';
import accountReducer from './pages/account/account.reducers';

const appReducer = combineReducers({
  authReducer,
  accountReducer,
});

export default appReducer;
