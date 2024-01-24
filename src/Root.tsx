import {Route, HashRouter as Router, Routes} from 'react-router-dom';
import App from './App';
import {
  UsersPage,
  PostsDetailsPage,
  AlbumsDetailsPage,
  NotFoundPage,
} from './pages';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<UsersPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="posts/:userId" element={<PostsDetailsPage />} />
        <Route path="albums/:userId" element={<AlbumsDetailsPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Router>
);
