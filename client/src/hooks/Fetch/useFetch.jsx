import { useEffect, useState } from "react";
import axios from "axios";

// Hook custom useFecth
export const useFecth = (url) => {
  // États pour les données, le chargement et les erreurs
  const [donne, setDonne] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fonction pour récupérer les données depuis l'URL
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

  // Utilisation de l'effet useEffect pour récupérer les données lors du montage du composant
  useEffect(() => {
    getData();
  }, [url]);

  // Retour des états pour être utilisés dans le composant
  return { donne, loading, error };
};
