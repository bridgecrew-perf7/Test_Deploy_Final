import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { UsersService } from '@app/core/services/users.service';
import UserInfo from '../component/UserInfo';
import UserArticlesList from '../../../shared/modules/UserArticle/UserArticlesList';
import LoadingSpinner from '@app/shared/components/loading-spinner/LoadingSpinner';

const Profile = () => {
  const { id } = useParams();
  const usersService = new UsersService();
  const [userInfo, setUserInfo] = useState(null);
  const [articlesList, setArticlesList] = useState(null);
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [isArticlesLoading, setIsArticlesLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsUserLoading(true);
    setIsArticlesLoading(true);
    setHasError(false);
    (async () => {
      try {
        const response = await usersService.getUserInfo(id);
        setUserInfo(response);
      } catch (error) {
        setHasError(true);
      }
      setIsUserLoading(false);
    })();
    (async () => {
      try {
        const response: any = await usersService.getArticlesList(id);
        setArticlesList(response.Posts);
      } catch (error) {
        setHasError(true);
      }
      setIsArticlesLoading(false);
    })();
    return;
  }, [id]);

  if (isUserLoading || isArticlesLoading) {
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
    <>
      {userInfo && <UserInfo userInfo={userInfo} />}
      {articlesList && (
        <UserArticlesList
          isReaction
          articlesList={articlesList}
          heading="Personal Posts"
          message="No posts to show"
        />
      )}
    </>
  );
};

export default Profile;
