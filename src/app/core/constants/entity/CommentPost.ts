import { User } from './User';

interface CommentPost {
  id: number;
  userId: number;
  postId: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  user: User;
}

export default CommentPost;
