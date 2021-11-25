import React from 'react';
import LoadingSpinner from '@app/shared/components/loading-spinner/LoadingSpinner';
import UserLiked from './UsersLiked';

const ListUsersLiked = ({ list, isLoadingList }) => {
  if (isLoadingList) {
    return <LoadingSpinner />
  }
  return (
    <ul className="list-users-liked">
    {
      list.length ? 
      (list.map((item) => 
        <li className="user-liked" key={item.user.id} >
          <UserLiked user={item.user} />
        </li>
      )) : (
        <h3 className="list-users-text">
          No one likes this post
        </h3>
      )
    }
    </ul>
  )
};

export default ListUsersLiked;
