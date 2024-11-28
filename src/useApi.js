import { useCallback, useState } from "react";
import axios from "axios";

const UseApi = ({ url, method, headers = {} }) => {
  const [state, setState] = useState({
    data: null,
    isLoading: false,
    error: null,
  });

  const fetchData = useCallback(
    async (data = {}) => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          ...headers,
        },
      };

      await new Promise((resolve) => setTimeout(resolve, 500));

      try {
        let response;

        if (method === "delete") {
          response = await axios.delete(url, { data, ...config });
        } else if (method === "get") {
          response = await axios.get(url, config);
        } else {
          response = await axios[method](url, data, config);
        }

        setState({ data: response.data, isLoading: false, error: null });
      } catch (error) {
        const errorMsg =
          error.response?.data?.error || "An unexpected error occurred";
        console.error("Error fetching data:", error);
        setState({ isLoading: false, data: null, error: errorMsg });
      }
    },
    [url, method]
  );

  return { stateData: state, fetchData };
};

export default UseApi;
