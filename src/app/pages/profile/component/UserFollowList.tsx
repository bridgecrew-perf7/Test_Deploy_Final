import React from 'react';
import { User } from '@app/core/constants/entity/User';
import UserFollowItem from './UserFollowItem';

const UserFollowList = (props: { followList: User[] }) => {
  return (
    <ul className="row follow-list">
      {props.followList.map((userInfo) => (
        <UserFollowItem userInfo={userInfo} key={userInfo.id} />
      ))}
    </ul>
  );
};

export default UserFollowList;
