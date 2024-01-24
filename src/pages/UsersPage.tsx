import React, {useCallback, useEffect, useState} from 'react';
import {getAllUsers} from '../api/fetchClient';
import {useDebounce} from '../hooks/useDebounce';
import {
  ErrorComponent,
  Input,
  Loader,
  SpacerComponent,
  UsersList,
} from '../components';
import {IUser, Sort} from '../types';

export const UsersPage = () => {
  const [allUsers, setAllUsers] = useState<IUser[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [postsLoadingError, setPostsLoadingError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState<Sort>(Sort.ASD);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const users = await getAllUsers();
      setAllUsers(users);
    } catch (e) {
      setPostsLoadingError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e?.target?.value);
  };

  const debouncedValue = useDebounce<string>(searchQuery, 500);
  let filteredUsers = allUsers.filter(user =>
    user.username.toLowerCase().includes(debouncedValue.toLowerCase()),
  );

  filteredUsers = filteredUsers.sort((a, b) => {
    const order = sortOrder === Sort.ASD ? 1 : -1;
    return order * a.username.localeCompare(b.username);
  });

  const toggleSortOrder = useCallback(() => {
    setSortOrder(sortOrder === Sort.ASD ? Sort.DESC : Sort.ASD);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (!isLoading && postsLoadingError) {
    return <ErrorComponent />;
  }

  return (
    <section>
      <h1 className="title">All users</h1>
      <Input
        placeholder="Search users..."
        value={searchQuery}
        onChange={handleSearchInputChange}
      />
      <SpacerComponent value={5} />
      <UsersList
        users={filteredUsers}
        onSortToggle={toggleSortOrder}
        sortOrder={sortOrder}
      />
    </section>
  );
};
