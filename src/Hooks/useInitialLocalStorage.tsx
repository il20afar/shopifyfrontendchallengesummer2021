import { useEffect } from "react";

export const useInitialLocalStorage = (setNominations: (obj: any) => void) => {
  return useEffect(() => {
    const loc = localStorage.getItem("shopify_challenge_nominations");
    if (loc !== null) {
      setNominations(JSON.parse(loc));
    }
  }, []);
};
