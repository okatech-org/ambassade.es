import { useConvexAuth } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useConvexQuery } from "@/integrations/convex/hooks";

export function useUserData() {
  const { isAuthenticated, isLoading } = useConvexAuth()
  
  const { data: userData, isPending: userPending, error } = useConvexQuery(
    api.functions.users.getMe,
    isAuthenticated ? {} : "skip"
  );

  return {
    userData,
    isSuperAdmin: Boolean(userData?.isSuperadmin),
    isPending: isLoading || userPending,
    error,
  };
}
