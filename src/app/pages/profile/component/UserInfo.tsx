import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { User } from '@app/core/constants/entity/User';
import FollowButton from '@app/shared/components/follow/FollowButton';

const UserInfo = (props: { userInfo: User }) => {
  const { id } = useParams();
  const accountState = useSelector((state: any) => state.accountReducer);
  const isMyPage =
    accountState.data?.displayName === props.userInfo.displayName;
  const [isFollowed, setIsFollowed] = useState(props.userInfo.isFollowed);
  const [followersNumber, setFollowersNumber] = useState(
    props.userInfo.followers
  );

  const updateFollowUI = () => {
    setIsFollowed((prevState) => !prevState);
    setFollowersNumber((prevState) =>
      isFollowed ? prevState - 1 : prevState + 1
    );
  };

  return (
    <section className="profile">
      <div className="container container-sm">
        <div className="profile-container">
          <div className="profile-img-box">
            <img
              className="profile-img"
              src={
                props.userInfo.picture ||
                '../../../../assets/images/default-user-picture.jpeg'
              }
              alt={props.userInfo.displayName}
            />
          </div>
          <div className="profile-detail">
            <div className="profile-name">
              <h3 className="profile-fullname">
                {props.userInfo.firstName} {props.userInfo.lastName}
              </h3>
              <p className="profile-displayname">
                @{props.userInfo.displayName || props.userInfo.firstName}
              </p>
            </div>
            <div className="profile-follow">
              <Link to="following">
                <span className="profile-follow-number">
                  {props.userInfo.followings}
                </span>
                <span className="profile-follow-text">followings</span>
              </Link>
              <Link to="follower">
                <span className="profile-follow-number">{followersNumber}</span>
                <span className="profile-follow-text">followers</span>
              </Link>
            </div>
            <div className="profile-actions">
              {isMyPage ? (
                <Link to="/account/info" className="btn btn-outline">
                  Change profile
                </Link>
              ) : (
                <FollowButton
                  isFollowed={isFollowed}
                  followingId={id}
                  onClick={updateFollowUI}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserInfo;
