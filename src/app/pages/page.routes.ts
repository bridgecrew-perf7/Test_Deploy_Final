import Page from './Page';
import { PageRoute } from '@core/modules/custom-router-dom/router.interface';
import accountRoutes from './account/account.routes';
import homeRoutes from './home/home.routes';
import postRoutes from './post/post.routes';
import profileRoutes from './profile/profile.routes';
import draftRoutes from './draft/draft.routes';
import bookmarksRoutes from './bookmarks/bookmarks.routes';
import recyclebinRoutes from './recyclebin/recyclebin.routes';

const pageRoutes: PageRoute[] = [
  {
    path: '/',
    element: Page,
    children: [
      ...homeRoutes,
      ...accountRoutes,
      ...profileRoutes,
      ...postRoutes,
      ...draftRoutes,
      ...bookmarksRoutes,
      ...recyclebinRoutes,
    ],
  },
];

export default pageRoutes;
