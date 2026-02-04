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
  avatarPublicId: string;
  username: string;
  avatarUrl: string;
  email: string;
  headline?: string;
}
export interface ProfileState {
  user: User | null;
  loading: boolean;
  error: string | null;
}


