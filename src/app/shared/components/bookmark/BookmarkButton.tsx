import React, { useContext, useEffect, useState } from 'react';
import NotificationContext from '@app/shared/contexts/NotificationContext/NotificationContext';
import { BookmarksService } from '@app/core/services/bookmarks.service';

interface BookmarkButtonOptions {
  isInBookmark: boolean;
  postId: number | string;
}

const BookmarkButton = (props: BookmarkButtonOptions) => {
  const { showNotification } = useContext(NotificationContext);
  const bookmarkService = new BookmarksService();
  const [isInBookmark, setIsInBookmark] = useState(props.isInBookmark);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(null);

  const bookmarkHandler = async () => {
    setIsLoading(true);
    try {
      setHasError(false);
      const response: any = await bookmarkService.toggleBookmarks({
        postId: props.postId.toString(),
      });
      const { isInBookmark } = response;
      setIsInBookmark(isInBookmark);
    } catch (error) {
      setHasError(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (hasError) {
      showNotification({
        isSuccess: false,
        message:
          hasError.response.status === 401
            ? 'Please login first!'
            : `${
                isInBookmark ? 'Unbookmark' : 'Bookmark'
              } post unsuccessfully!`,
      });
    }
  }, [hasError]);

  return (
    <button
      className="btn btn-reaction"
      onClick={bookmarkHandler}
      disabled={isLoading}
    >
      <img
        className="reaction-icon"
        src={
          isInBookmark
            ? '../../../../assets/icons/bookmark-solid.svg'
            : '../../../../assets/icons/bookmark-outline.svg'
        }
        alt="Bookmark"
      />
    </button>
  );
};

export default BookmarkButton;
