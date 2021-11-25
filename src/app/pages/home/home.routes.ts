import { PageRoute } from '@core/modules/custom-router-dom/router.interface';
import Home from './containers/Home';

const homeRoutes: PageRoute[] = [
  {
    path: '/',
    element: Home,
  },
];

export default homeRoutes;
