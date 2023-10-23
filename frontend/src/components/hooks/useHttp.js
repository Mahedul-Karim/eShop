import { useCallback, useState } from "react";
import { BASE_URL } from "../../util/base";

export const useHttp = function () {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async function (
    endpoint,
    method = "GET",
    headers = {},
    body = null
  ) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/${endpoint}`, {
        method,
        headers,
        body
      });
      const data = await res.json();
     
      if (data.status === "failed") {
        throw new Error(data.message);
      }

      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  },
  []);

  return [isLoading, fetchData , error];
};
