import { PageRoute } from '@core/modules/custom-router-dom/router.interface';
import Draft from './Draft';

const draftRoutes: PageRoute[] = [
  {
    path: '/draft',
    element: Draft,
    isProtected: true,
  },
];

export default draftRoutes;
