import { PageRoute } from '@core/modules/custom-router-dom/router.interface';
import NewPost from './containers/NewPost';
import PostDetail from './containers/PostDetail';
import UpdatePost from './containers/UpdatePost';
import Post from './Post';

const postRoutes: PageRoute[] = [
  {
    path: '/post',
    element: Post,
    children: [
      {
        path: '/',
        redirect: '/',
      },
      {
        path: '/new-post',
        element: NewPost,
        isProtected: true,
      },
      {
        path: '/:id',
        element: PostDetail,
      },
      {
        path: '/update-post/:id',
        element: UpdatePost,
        isProtected: true,
      },
    ],
  },
];

export default postRoutes;
