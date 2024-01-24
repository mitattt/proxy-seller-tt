import {IAlbum} from '../types/Album';
import {IPost} from '../types/Post';
import {IUser} from '../types/User';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

async function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: any = null,
): Promise<T> {
  const options: RequestInit = {method};
  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }
  const response = await fetch(BASE_URL + url, options);
  return response.json();
}

export const client = {
  get: <T>(url: string) => request<T>(url),
};

export function getUser(userId: number) {
  return client.get<IUser>(`/users/${userId}`);
}

export function getAllUsers() {
  return client.get<IUser[]>('/users');
}

export function getAllPosts() {
  return client.get<IPost[]>('/posts');
}

export function getAllAlbums() {
  return client.get<IAlbum[]>('/albums');
}
