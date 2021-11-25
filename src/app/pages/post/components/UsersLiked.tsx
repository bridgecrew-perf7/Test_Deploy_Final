import React from 'react';
import { Link } from 'react-router-dom';

const UserLiked = ({ user }) => {
  return (
    <>
      <div className="post-author-subcription">
        <div className="author-info">
          <Link to={`/profile/${user.id}`}>
            <img
              className="author-img"
              src={user.picture ||
                '../../../../assets/images/default-user-picture.jpeg'}
              alt={user.displayName}
            />
          </Link>
          <div className="author-info-detail">
            <Link to={`/profile/${user.id}`}>
              <h5 className="author-name">{`${user.firstName} ${user.lastName}`}</h5>
            </Link>
            <span className="author-display-name txt-primary">
              {user.displayName
                ? `@${user.displayName}`
                : ''}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserLiked;
