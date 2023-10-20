interface User {
  id: string;
  email: string;
}
interface Error {
  code: string;
  name: string;
}
interface AuthState  {
  
    user: User | null;
    email: string | null;
    loading: boolean;
    error: Error | null;
  
}

export { AuthState, User, Error }