import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import UserFollowList from '../component/UserFollowList';
import { FriendsService } from '@core/services/friends.service';
import LoadingSpinner from '@app/shared/components/loading-spinner/LoadingSpinner';

const Following = () => {
  const { id } = useParams();
  const friendService = new FriendsService();
  const [followingList, setFollowingList] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    (async () => {
      try {
        const response = await friendService.getFollowings(id);
        setFollowingList(response);
      } catch (error) {
        setHasError(true);
      }
      setIsLoading(false);
    })();
  }, [id]);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (hasError) {
    return (
      <p className="txt-center txt-error mt-10">
        Something went wrong. Please try again!
      </p>
    );
  }

  return (
    <section className="follow">
      <div className="container container-sm ">
        <h2 className="follow-title">User followings</h2>
        {followingList?.length ? (
          <UserFollowList followList={followingList} />
        ) : (
          <></>
        )}
      </div>
    </section>
  );
};

export default Following;
