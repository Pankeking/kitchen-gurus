import { router } from "expo-router";
import { useSelector } from "react-redux";

interface User {
  id: string;
  email: string;
}

interface RootState  {
  auth: {
    user: User | null;
    email: string | null;
    loading: boolean;
    error: Error | null;
  }
}

export default function RequireAuth ({ children } : {children: React.JSX.Element}) {
  const user = useSelector<RootState, User | null>(
    state => state.auth.user
  );

  return !user ? () => router.replace('/(auth)') : children;
}

