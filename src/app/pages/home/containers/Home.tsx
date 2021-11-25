import React, { useEffect, useState } from 'react';
import { PostService } from '@app/core/services/post.service';
import Banner from '../components/Banner/Banner';
import FeaturedArticles from '../components/FeaturedArticles/FeaturedArticles';
import PublicArticles from '../components/PublicArticles/PublicArticles';
import LoadingSpinner from '@app/shared/components/loading-spinner/LoadingSpinner';
import { useSelector } from 'react-redux';

const Home = () => {
  const postService = new PostService();
  const authState = useSelector((state: any) => state.authReducer);
  const [publicArticles, setPublicArticles] = useState([]);
  const [featuresArticles, setfeaturesArticles] = useState([]);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingFeatured, setLoadingFeatured] = useState(false);
  const [hasError, setHasError] = useState(false);
  const loadMoreCallBack = (page) => {
    setPage(page);
    setLoading(true);
  };
  // fetch api Featured Articles
  useEffect(() => {
    setLoadingFeatured(true);
    setHasError(false);
    (async () => {
      try {
        const resFeatured: any = await postService.getFeaturedArticles({
          page: 1,
          size: 6,
        });
        setfeaturesArticles([...featuresArticles, ...resFeatured.data]);
        setLoadingFeatured(false);
      } catch (error) {
        setHasError(true);
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    setPage(1);
    setPublicArticles([]);
    (async () => {
      setHasError(false);
      try {
        if (authState.data) {
          const resPublic: any = await postService.getFollowingPost({
            page: page,
            size: 6,
          });
          setPublicArticles([...resPublic.data]);
        } else {
          const resPublic: any = await postService.getPublicArticles({
            page: page,
            size: 6,
          });
          setPublicArticles([...resPublic.data]);
        }
        setLoading(false);
      } catch (error) {
        setHasError(true);
        setLoading(false);
      }
    })();
  }, [authState.data]);

  // fetch api List Posts
  useEffect(() => {
    setLoading(true);
    (async () => {
      setHasError(false);
      try {
        if (authState.data) {
          const resPublic: any = await postService.getFollowingPost({
            page: page,
            size: 6,
          });
          setPublicArticles([...publicArticles, ...resPublic.data]);
        } else {
          const resPublic: any = await postService.getPublicArticles({
            page: page,
            size: 6,
          });
          setPublicArticles([...publicArticles, ...resPublic.data]);
        }
        setLoading(false);
      } catch (error) {
        setHasError(true);
        setLoading(false);
      }
    })();
  }, [page]);

  if (loadingFeatured) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Banner />
      <FeaturedArticles featuredList={featuresArticles} />
      <PublicArticles
        publicArticles={publicArticles}
        parentCallback={loadMoreCallBack}
        page={page}
        loading={loading}
        title={authState.data ? 'Following' : 'Public Posts'}
      />
    </>
  );
};

export default Home;
