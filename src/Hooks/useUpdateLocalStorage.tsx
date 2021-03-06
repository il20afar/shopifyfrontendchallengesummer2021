// [IMPORTS]
/* node_modules */
import { useEffect } from "react";

// [CUSTOM HOOK]
export const useUpdateLocalStorage = (
  nominations: any,
  setNominations: (obj: any) => void
) => {
  return useEffect(() => {
    localStorage.setItem(
      "shopify_challenge_nominations",
      JSON.stringify(nominations)
    );
  }, [nominations, setNominations]);
};
