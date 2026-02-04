export interface Author {
  id: number;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface Article {
  id: number;
  title: string;
  content: string;
  tags: string[];
  imageUrl: string;
  author: Author;
  createdAt: string;
  likes: number;
  comments: number;
}

export interface ArticlesResponse {
  data: Article[];
  total: number;
  page: number;
  lastPage: number;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface UrlParams {
  userId?: number;
  page?: number;
  limit?: number;
}

export interface ParamArticleDetail {
  id: number;
}
export interface ArticleDetailResponse {
  id: number;
  title: string;
  content: string;
  tags: string[];
  imageUrl: string;
  imagePublicId: string;
  createdAt: string;
  likes: number;
  comments: number;
  author: Author;
}

export interface ComponentArticleCardProps {
  id: number;
  content: string;
  createdAt: string;
  author: Author;
}

export interface NewArticleParams {
  title: string;
  content: string;
  tags: string[];
  image: File;
}
