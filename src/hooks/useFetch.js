import { useEffect, useState } from "react";

const useFetch = (model = "", method = "fetchAll") => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await callServer2("GET", model, method);
        setData(res.data);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };
    fetchData();
  }, [model]);
  const reFetch = async () => {
    try {
      setLoading(true);
      const res = await callServer2("GET", model, method);
      setData(res.data);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };
  return { data, loading, error, reFetch };
};

export default useFetch;
