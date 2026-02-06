import { useEffect, useState } from "react";
import { fetch } from "@/utils";
import { User } from "./types";

export default function useAuthenticatedUser() {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    if (!user) {
      fetch("/v1/auth/me")
        .then((response) => response.json())
        .then((data) => setUser(data))
        .catch((error) => {
          // Gracefully handle auth errors (e.g., cloud API key missing, not authenticated)
          console.warn("Authentication check failed:", error?.message || error);
          // Don't set user, leaving it undefined indicates not authenticated
        });
    }
  }, [user]);

  return { user };
}
