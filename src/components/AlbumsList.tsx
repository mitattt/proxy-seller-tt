import React from 'react';
import {IAlbum} from '../types/Album';

type Props = {
  albums: IAlbum[];
};

export const AlbumsList: React.FC<Props> = ({albums}) => {
  if (!albums.length) return <div className="box">No albums</div>;
  return (
    <div>
      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>id</th>
            <th>Title</th>
          </tr>
        </thead>

        <tbody>
          {albums.map(album => (
            <tr key={album.id}>
              <td>{album.id}</td>
              <td>{album.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
