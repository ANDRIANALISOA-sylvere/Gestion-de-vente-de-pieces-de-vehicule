import { useFecth } from "../../hooks/useFetch";
import Loader from "../../layouts/loader/Loader";

const Marque = () => {
  const { donne, loading, error } = useFecth(
    "http://localhost:5000/marque/"
  );
  return (
    <div>
      {loading && <Loader></Loader>}
      {JSON.stringify(donne)}
      {error && <div>{error.message}</div>}
    </div>
  );
};

export default Marque;
