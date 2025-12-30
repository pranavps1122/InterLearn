import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export function useAuthStatus() {
  const { user, accessToken, authChecked } = useSelector(
    (state: RootState) => state.auth
  );

  const isAuthenticated = !!accessToken && !!user;

  return {
    isAuthenticated,
    role: user?.role ?? null,
    authChecked,
    
  };
}

