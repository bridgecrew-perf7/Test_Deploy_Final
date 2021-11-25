import React, { useEffect, useState } from 'react';
import { BookmarksService } from '@app/core/services/bookmarks.service';
import LoadingSpinner from '@app/shared/components/loading-spinner/LoadingSpinner';
import UserArticlesList from '@app/shared/modules/UserArticle/UserArticlesList';

const Bookmarks = () => {
  const bookmarksService = new BookmarksService();
  const [bookmarksList, setBookmarksList] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    (async () => {
      try {
        const response: any = await bookmarksService.getBookmarks();
        const posts = response
          .filter((item) => item.post)
          .map((item) => item.post);
        setBookmarksList(posts);
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
      {bookmarksList && (
        <UserArticlesList
          isReaction
          articlesList={bookmarksList}
          heading="Personal Bookmarks"
          message="No bookmarks to show"
        />
      )}
    </>
  );
};

export default Bookmarks;
