import { useEffect } from "react";
import { useQuery } from "react-query";
import * as apiClient from "../service/api-client";
import AuthorizedStore from "../context/authorizedStore";

const useIsAuthorized = () => {
  const { isSuccess } = useQuery("isAuthorized", apiClient.isLoggedIn, {
    retry: 0,
  });
  const setIsAuthorized = AuthorizedStore((state) => state.setIsAuthorized);

  useEffect(() => {
    setIsAuthorized(isSuccess);
  }, [isSuccess, setIsAuthorized]);
};

export default useIsAuthorized;
