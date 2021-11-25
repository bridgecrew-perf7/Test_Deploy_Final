import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '@app/core/constants/entity/User';

const UserFollowItem = (props: { userInfo: User }) => {
  const userProfileLink = `/profile/${props.userInfo.id}`;

  return (
    <li className="col col-lg-3 col-md-6 col-sm-12">
      <Link className="follow-item" to={userProfileLink}>
        <div className="follow-img-box">
          {!props.userInfo.picture && (
            <img
              className="follow-img"
              src="../../../../assets/images/default-user-picture.jpeg"
              alt={props.userInfo.displayName}
            />
          )}
          {props.userInfo.picture && (
            <img
              className="follow-img"
              src={props.userInfo.picture}
              alt={props.userInfo.displayName}
            />
          )}
        </div>

        <h3 className="follow-fullname">
          {props.userInfo.firstName} {props.userInfo.lastName}
        </h3>
        <p className="follow-displayname">
          @{props.userInfo.displayName || props.userInfo.firstName}
        </p>
      </Link>
    </li>
  );
};

export default UserFollowItem;
