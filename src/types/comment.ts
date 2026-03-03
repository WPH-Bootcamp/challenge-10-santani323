export interface ParmComment {
  content: string;
}

export interface CommentResponse {
  id: number;
  content: string;
  author: AuthorComment;
  post: PostComment;
  createdAt: string;
}

export interface AuthorComment {
  id: number;
  name: string;
  avatarUrl?: string;
}

export interface PostComment {
  id: number;
}
