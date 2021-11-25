import React, { useEffect, useState } from 'react';
import { PostService } from '@app/core/services/post.service';
import LoadingSpinner from '@app/shared/components/loading-spinner/LoadingSpinner';
import UserArticlesList from '@app/shared/modules/UserArticle/UserArticlesList';

const Draft = () => {
  const postService = new PostService();
  const [draftList, setDraftList] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    (async () => {
      try {
        const response = await postService.getDraft();
        setDraftList(response);
      } catch (error) {
        setHasError(true);
      }
      setIsLoading(false);
    })();
  }, []);

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
    <>
      {draftList && (
        <UserArticlesList
          isReaction={false}
          articlesList={draftList}
          heading="Personal Drafts"
          message="No drafts to show"
        />
      )}
    </>
  );
};

export default Draft;
