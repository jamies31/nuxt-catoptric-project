export interface LogInFormValues {
  email: string;
  password: string;
}

export interface UserResponse {
  statusCode: number;
  error: string;
  user?: any;
  session?: any;
}

export interface RegisterFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SessionResponse {
  statusCode: number;
  body: string;
}