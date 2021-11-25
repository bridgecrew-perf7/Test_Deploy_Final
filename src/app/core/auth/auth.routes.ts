import Login from './containers/Login';
import Register from './containers/Register';
import Auth from './Auth';
import { PageRoute } from '../modules/custom-router-dom/router.interface';

const authRoutes: PageRoute[] = [
  {
    path: '/auth',
    element: Auth,
    children: [
      {
        path: '/',
        redirect: 'login',
      },
      {
        path: '/login',
        element: Login,
      },
      {
        path: '/register',
        element: Register,
      },
    ],
  },
];

export default authRoutes;
