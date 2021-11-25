import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { PostService } from '@app/core/services/post.service';
import PostForm from '../components/PostForm';
import LoadingSpinner from '@app/shared/components/loading-spinner/LoadingSpinner';

const UpdatePostPage = () => {
  const { id } = useParams();
  const postService = new PostService();
  const [postDetail, setPostDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    (async () => {
      try {
        const response = await postService.getPost(id);
        setPostDetail(response);
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

  return <>{postDetail && <PostForm postDetail={postDetail} />}</>;
};

export default UpdatePostPage;
