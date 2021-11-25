import React, { useContext, useEffect, useState } from 'react';
import { FriendsService } from '@app/core/services/friends.service';
import LoadingButton from '../loading-button/LoadingButton';
import NotificationContext from '@app/shared/contexts/NotificationContext/NotificationContext';

interface FollowButtonOptions {
  isFollowed: boolean;
  followingId: number | string;
  onClick?: () => void;
}

const FollowButton = (props: FollowButtonOptions) => {
  const { showNotification } = useContext(NotificationContext);
  const friendService = new FriendsService();
  const [isFollowed, setIsFollowed] = useState(props.isFollowed);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const followHandler = async () => {
    setIsLoading(true);
    try {
      setHasError(false);
      const response: any = await friendService.followUser({
        followingId: props.followingId,
      });
      const { followed } = response;
      setIsFollowed(followed);
      if (props.onClick) {
        props.onClick();
      }
    } catch (error) {
      setHasError(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (hasError) {
      showNotification({
        isSuccess: false,
        message: `${isFollowed ? 'Unfollow' : 'Follow'} user unsuccessfully!`,
      });
    }
  }, [hasError]);

  return (
    <LoadingButton
      loading={isLoading}
      classBtn="btn btn-outline btn-follow"
      handleFunction={followHandler}
    >
      {isFollowed ? 'Unfollow' : 'Follow'}
    </LoadingButton>
  );
};

export default FollowButton;
