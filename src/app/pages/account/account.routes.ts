import { PageRoute } from '@core/modules/custom-router-dom/router.interface';
import Account from './Account';
import AccountInfo from './containers/AccountInfo';
import PasswordChange from './containers/PasswordChange';
import UpdateInfo from './containers/UpdateInfo';

const accountRoutes: PageRoute[] = [
  {
    path: '/account',
    element: Account,
    children: [
      {
        path: '/',
        redirect: 'info',
      },
      {
        path: '/info',
        element: AccountInfo,
      },
      {
        path: '/change-password',
        element: PasswordChange,
      },
      {
        path: '/update-infomation',
        element: UpdateInfo,
      },
    ],
    isProtected: true,
  },
];

export default accountRoutes;
