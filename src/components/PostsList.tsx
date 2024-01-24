import React from 'react';
import {IPost} from '../types/Post';

type Props = {
  posts: IPost[];
};

export const PostsList: React.FC<Props> = ({posts}) => {
  if (!posts.length) return <div className="box">No posts</div>;
  return (
    <div>
      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>id</th>
            <th>Title</th>
            <th>Description</th>
          </tr>
        </thead>

        <tbody>
          {posts.map(post => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.body}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
