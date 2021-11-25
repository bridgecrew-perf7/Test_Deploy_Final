const RESOURCES = {
  auth: 'auth',
  users: 'users',
  posts: 'posts',
  signatures: 'signatures',
  friends: 'friends',
  bookmarks: 'bookmarks',
};

export const ENDPOINT = {
  auth: {
    index: `${RESOURCES.auth}`,
    login: `${RESOURCES.auth}/login`,
    loginGoogle: `${RESOURCES.auth}/google`,
    loginFacebook: `${RESOURCES.auth}/facebook`,
    loginGithub: `${RESOURCES.auth}/github`,
  },
  users: {
    index: `${RESOURCES.users}`,
    login: `${RESOURCES.users}/login`,
    logout: `${RESOURCES.users}/logout`,
    register: `${RESOURCES.users}/register`,
    userMe: `${RESOURCES.users}/me`,
    resetPassword: `${RESOURCES.users}/reset-password`,
    changePassword: `${RESOURCES.users}/change-password`,
  },
  posts: {
    index: `${RESOURCES.posts}`,
    public: `${RESOURCES.posts}/public`,
    recommend: `${RESOURCES.posts}/recommend`,
    draft: `${RESOURCES.posts}/draft`,
    recyclebin: `${RESOURCES.posts}/recyclebin`,
  },
  signatures: {
    index: `${RESOURCES.signatures}`,
  },
  friends: {
    index: `${RESOURCES.friends}`,
    follow: `${RESOURCES.friends}/follow`,
  },
  bookmarks: {
    index: `${RESOURCES.bookmarks}`,
  },
};
