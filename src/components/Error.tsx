import React from 'react';

export const ErrorComponent = () => {
  return (
    <div className="notification is-danger" data-cy="PostsLoadingError">
      Something went wrong!
    </div>
  );
};
