import { PageRoute } from '@core/modules/custom-router-dom/router.interface';
import Recyclebin from './Recyclebin';

const recyclebinRoutes: PageRoute[] = [
  {
    path: '/recyclebin',
    element: Recyclebin,
    isProtected: true,
  },
];

export default recyclebinRoutes;
