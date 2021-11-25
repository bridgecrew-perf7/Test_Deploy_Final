import { User } from './User';

export interface Article {
  id?: number;
  title: string;
  description: string;
  content: string;
  status: string;
  tags: Array<string>;
  userId?: number;
  likes?: string | number;
  comments?: string | number;
  cover: string;
  recommend?: boolean;
  deletedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
  user?: User;
}
