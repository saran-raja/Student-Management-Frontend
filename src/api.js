import axios from "axios";
import { useEffect, useState } from "react";

function Api(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
     axios
      .get(url)
      .then((response) => {
        setData(response.data);
        setError("Data fetched successfully");
      })
      .catch((error) => {
        console.log(error);
        setError("Unable to fetch data");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url]);
  return { data, loading, error };
}
export default Api;
