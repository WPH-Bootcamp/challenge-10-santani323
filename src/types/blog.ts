 
export interface Author {
  id: number;
  name: string;
  email: string;
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
