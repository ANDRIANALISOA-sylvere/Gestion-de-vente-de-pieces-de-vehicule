import { useFecth } from "../../hooks/useFetch";
import Loader from "../../layouts/loader/Loader";

const Client = () => {
  const { donne, loading, error } = useFecth(
    "http://localhost:5000/client/"
  );
  return (
    <div>
      {loading && <Loader></Loader>}
      {JSON.stringify(donne)}
      {error && <div>{error.message}</div>}
    </div>
  );
};

export default Client;
