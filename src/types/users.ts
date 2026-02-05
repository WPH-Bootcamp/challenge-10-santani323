export interface User {
  id: number;
  name: string;
  email: string;
  headline: string;
  avatarUrl?: string;
}

export interface ProfileState {
  id: number;
  name: string;
  username: string;
  avatarUrl: string;
  email: string;
  headline?: string;
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface UpdateProfilePayload {
  name?: string;
  headline?: string;
  avatar?: File;
}


