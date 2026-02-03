export type User = {
  id: string;
  email: string;
  username: string;
};

export type AuthRegisterPayload = {
  name: string;
  email: string;
  username: string;
  password: string;
};

export type AuthLoginPayload = {
  email: string;
  password: string;
};

export type AuthLoginResponse = {
  token: string; 
};

export type AuthRegisterResponse = {
  id: string;
  email: string;
  username: string;
};


export type AuthErrorResponse = {
  statusCode: number;
  error: string;
  message: string;
  timestamp: string;
  path: string;
  details?: {
    errors: string[];
  };
};
