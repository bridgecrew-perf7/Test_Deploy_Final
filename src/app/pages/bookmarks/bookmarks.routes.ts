import { PageRoute } from '@core/modules/custom-router-dom/router.interface';
import Bookmarks from './Bookmarks';

const bookmarksRoutes: PageRoute[] = [
  {
    path: '/bookmarks',
    element: Bookmarks,
    isProtected: true,
  },
];

export default bookmarksRoutes;
