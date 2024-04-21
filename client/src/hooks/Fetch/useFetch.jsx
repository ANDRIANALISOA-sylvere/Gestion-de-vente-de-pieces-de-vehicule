import { useEffect, useState } from "react";
import axios from "axios";
export const useFecth = (url) => {
  const [donne, setDonne] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const getData = async () => {
    try {
      const res = await axios.get(url);
      setDonne(res.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, [url]);

  return { donne, loading, error };
};
