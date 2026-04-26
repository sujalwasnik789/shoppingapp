import { useAuth } from '@clerk/nextjs';

export function useAuthStatus() {
  const { isLoaded, userId, sessionId } = useAuth();

  return {
    isLoaded,
    isLoggedIn: !!userId,
    userId,
    sessionId,
  };
}
