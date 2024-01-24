import {useState, useCallback, useEffect} from 'react';
import {useParams, useNavigate, Link} from 'react-router-dom';
import {getAllAlbums, getUser} from '../api/fetchClient';
import {Loader, ErrorComponent, AlbumsList} from '../components';
import {IAlbum, IUser} from '../types';

export const AlbumsDetailsPage = () => {
  const [allAlbums, setAllAlbums] = useState<IAlbum[]>([]);
  const [user, setUser] = useState<IUser | undefined>();
  const [postsLoadingError, setPostsLoadingError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const {userId} = useParams();
  const navigation = useNavigate();

  const currentUserId = userId ? +userId : 0;
  const userAlbums = allAlbums.filter(album => album.userId === currentUserId);

  const fetchData = useCallback(async () => {
    try {
      const [albums, userResponse] = await Promise.all([
        getAllAlbums(),
        getUser(currentUserId),
      ]);

      if (!userResponse?.username) {
        setPostsLoadingError(true);

        setTimeout(() => {
          navigation('..');
        }, 2000);
      } else {
        setAllAlbums(albums);
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
      <h1 className="title mt-4">{user?.username}'s albums</h1>
      <AlbumsList albums={userAlbums} />
    </section>
  );
};
