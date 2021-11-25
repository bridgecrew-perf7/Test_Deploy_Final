import { PageRoute } from '@core/modules/custom-router-dom/router.interface';
import Follower from './containers/Follower';
import Following from './containers/Following';
import Profile from './containers/Profile';
import ProfilePage from './Profile';

const profileRoutes: PageRoute[] = [
  {
    path: '/profile',
    element: ProfilePage,
    children: [
      {
        path: '/',
        redirect: 'me',
      },
      {
        path: '/:id',
        element: Profile,
      },
      {
        path: '/:id/following',
        element: Following,
      },
      {
        path: '/:id/follower',
        element: Follower,
      },
    ],
    isProtected: true,
  },
];

export default profileRoutes;
