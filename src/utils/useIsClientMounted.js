import { useEffect, useState } from "react";

/**
 * False on server and on the first client render (hydration-safe).
 * True after mount — use before reading localStorage or other browser-only APIs.
 */
export const useIsClientMounted = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
};
