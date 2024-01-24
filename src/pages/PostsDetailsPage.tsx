import React, {useEffect, useState, useCallback} from 'react';
import {useParams, useNavigate, Link} from 'react-router-dom';
import {getAllPosts, getUser} from '../api/fetchClient';
import {Loader, ErrorComponent, PostsList} from '../components';
import {IPost, IUser} from '../types';

export const PostsDetailsPage = () => {
  const [allPosts, setAllPosts] = useState<IPost[]>([]);
  const [user, setUser] = useState<IUser | undefined>();
  const [postsLoadingError, setPostsLoadingError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const {userId} = useParams();
  const navigation = useNavigate();

  const currentUserId = userId ? +userId : 0;
  const userPosts = allPosts.filter(post => post.userId === currentUserId);

  const fetchData = useCallback(async () => {
    try {
      const [posts, userResponse] = await Promise.all([
        getAllPosts(),
        getUser(currentUserId),
      ]);

      if (!userResponse?.username) {
        setPostsLoadingError(true);

        setTimeout(() => {
          navigation('..');
        }, 2000);
      } else {
        setAllPosts(posts);
        setUser(userResponse);
      }
    } catch (e) {
      setPostsLoadingError(true);
    } finally {
      setIsLoading(false);
    }
  }, [navigation]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (isLoading) {
    return <Loader />;
  }

  if (postsLoadingError) {
    return <ErrorComponent />;
  }

  return (
    <section>
      <Link to="/users" className="button is-light is-primary">
        Go home
      </Link>
      <h1 className="title mt-4">{user?.username}'s posts</h1>
      <PostsList posts={userPosts} />
    </section>
  );
};
