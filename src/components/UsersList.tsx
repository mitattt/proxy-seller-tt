import React from 'react';
import {IUser} from '../types/User';
import {Link} from 'react-router-dom';
import arrowUp from '../assets/img/ArrowUp.svg';
import arrowDown from '../assets/img/ArrowDown.svg';
import {Sort} from '../types/Sort';

type Props = {
  users: IUser[];
  onSortToggle: () => void;
  sortOrder: Sort;
};

export const UsersList: React.FC<Props> = ({
  users,
  onSortToggle,
  sortOrder,
}) => {
  if (!users.length) return <div className="box">No users</div>;

  const getArrowIcon = () => {
    return (
      <img src={sortOrder === Sort.ASD ? arrowUp : arrowDown} alt="arrowUp" />
    );
  };

  return (
    <div>
      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th className="has-text-centered">id</th>
            <th
              className="has-text-centered"
              onClick={onSortToggle}
              style={{cursor: 'pointer'}}>
              Name {getArrowIcon()}
            </th>
            <th className="has-text-centered">Show Albums</th>
            <th className="has-text-centered">Show Posts</th>
          </tr>
        </thead>

        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td className="has-text-centered">{user.id}</td>
              <td className="has-text-centered">{user.username}</td>
              <td className="has-text-centered">
                <Link
                  to={`/albums/${user.id}`}
                  className="button is-primary is-light">
                  Check the albums
                </Link>
              </td>
              <td className="has-text-centered">
                <Link
                  to={`/posts/${user.id}`}
                  className="button is-link is-light">
                  Check the posts
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
