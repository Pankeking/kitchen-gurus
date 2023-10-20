import { router } from "expo-router";
import { useSelector } from "react-redux";
import { User, AuthState } from "../redux/types";

export default function RequireAuth ({ children } : {children: React.ReactNode}) {
  const user = useSelector<AuthState, User | null>(
    state => state.user
  );

  return !user ? () => router.replace('/(auth)') : router.replace('/');
}

