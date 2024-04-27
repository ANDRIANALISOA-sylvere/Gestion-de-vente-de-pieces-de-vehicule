import React, { useEffect, useState } from "react";
import { useFecth } from "../../hooks/Fetch/useFetch";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useToast } from "../../hooks/Toast/useToast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import {
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Pagination,
  PaginationItem,
  PaginationLink,
  UncontrolledAccordion,
} from "reactstrap";
import TableCommande from "../../components/TableCommande";
import PaginatedTable from "../../components/Pagination/Pagination";
import Loader from "../../layouts/loader/Loader";
import SearchInput from "../../components/searchInput/searchInput";
const animatedComponents = makeAnimated();

const Commandes = () => {
  const { notify, alertError } = useToast();
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [searchString, setSearchString] = useState("");
  const [delayLoading, setDelayLoading] = useState(true);
  const [produitsSel, setProduitsSel] = useState([]);
  const [idClient, setIdClient] = useState("");
  const [idcommande, setIdCommande] = useState("");
  const [dateCommande, setDateCommande] = useState("");
  const itemsPerPage = 9;
  const { donne, loading, error } = useFecth("http://localhost:5000/piece/");
  const { donne: client } = useFecth("http://localhost:5000/client/");
  const {
    donne: commande,
    loading: spinner,
    error: errorfetch,
  } = useFecth("http://localhost:5000/tablecommande/");

  // Mise à jour des données lorsqu'elles sont récupérées
  useEffect(() => {
    if (commande.length > 0) {
      const formattedData = commande.map((item) => ({
        ...item,
        DateCommande: moment(item.DateCommande).format("DD-MM-YYYY"),
      }));
      setData(formattedData);
    }
  }, [commande]);

  // Filtrage des données selon la chaîne de recherche
  const filteredLibraries = searchString.trim().toLowerCase()
    ? data.filter(
        (i) =>
          i.ID_Commande.toLowerCase().includes(
            searchString.trim().toLowerCase()
          ) ||
          i.ID_Client.toLowerCase().includes(searchString.trim().toLowerCase())
      )
    : data;

  // Appel de la fonction sur la pagination
  const {
    currentItems,
    renderPageNumbers,
    handlePageChange,
    currentPage,
    totalPages,
  } = PaginatedTable({ data: filteredLibraries, itemsPerPage });

  // Délai d'affichage du loader
  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setDelayLoading(false);
    }, 1000);

    return () => clearTimeout(loadingTimeout);
  }, []);

  // Mise à jour des données de mise à jour lorsqu'une ligne est sélectionnée
  useEffect(() => {
    // setUpdate(selectedRow);
  }, [selectedRow]);

  // Gestion de la sélection et de la désélection des lignes
  const onRowSelect = (row) => {
    setSelectedRow(row);
  };

  const onRowDeselect = () => {
    setSelectedRow(null);
  };

  // Gestion du changement de la chaîne de recherche
  const handleSearchChange = (newValue) => {
    setSearchString(newValue);
  };

  const handleSelectChange = (selectedOptions) => {
    const updatedProduitsSel = selectedOptions.map((option) => ({
      id_produit: option.value,
      quantite: 1,
    }));
    setProduitsSel(updatedProduitsSel);
  };

  const handleQuantiteChange = (id_produit, quantite) => {
    setProduitsSel((prevProduitsSel) =>
      prevProduitsSel.map((produit) =>
        produit.id_produit === id_produit ? { ...produit, quantite } : produit
      )
    );
  };

  const fetchCommandes = async () => {
    try {
      const response = await fetch("http://localhost:5000/tablecommande/");
      const data = await response.json();
      const formattedData = data.map((item) => ({
        ...item,
        DateCommande: moment(item.DateCommande).format('DD-MM-YYYY'),
      }));
      return formattedData;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!idcommande || !dateCommande || !idClient || produitsSel.length === 0) {
      alertError("Tous les champs sont obligatoires");
    } else {
      try {
        const response = await fetch("http://localhost:5000/tablecommande", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ID_Commande: idcommande,
            ID_Client: idClient,
            DateCommande: dateCommande,
            produits: produitsSel,
          }),
        });
        const data = await response.json();
        if (data.status === "ok") {
          notify(data.message);
          setIdCommande("");
          setDateCommande("");
          setIdClient("");
          setProduitsSel([]);

          const nouvellesCommandes = await fetchCommandes();
          setData(nouvellesCommandes);
        } else {
          alertError(data.message);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  console.log(data);

  return (
    <div>
      <ToastContainer autoClose={3000} />
      {(delayLoading || spinner) && <Loader />}
      <UncontrolledAccordion flush>
        <AccordionItem>
          <AccordionHeader targetId="1">Nouvelle commande</AccordionHeader>
          <AccordionBody accordionId="1" className="bg-white">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="commande">Identifiant:</label>
                    <input
                      type="text"
                      value={idcommande}
                      className="form-control"
                      placeholder="Entrer l'identifiant du commande"
                      onChange={(e) => setIdCommande(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="client">Client:</label>
                    <select
                      type="select"
                      value={idClient}
                      className="form-control"
                      onChange={(e) => setIdClient(e.target.value)}
                    >
                      <option value="">Selectionner un client</option>
                      {client.map((c) => (
                        <option value={c.ID_Client} key={c.ID_Client}>
                          {c.ID_Client}-{c.Nom}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="date_commande">Date Commande:</label>
                    <input
                      type="date"
                      value={dateCommande}
                      className="form-control"
                      onChange={(e) => setDateCommande(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="piece">Commandes Sélectionnées:</label>
                    <Select
                      isMulti
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      defaultValue="Séléctionner une pièce"
                      options={donne.map((d) => ({
                        value: d.ID_Piece,
                        label: d.ID_Piece,
                      }))}
                      onChange={handleSelectChange}
                      value={produitsSel.map((produit) => ({
                        value: produit.id_produit,
                        label: produit.id_produit,
                      }))}
                    />
                  </div>
                </div>
              </div>
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 mt-2">
                {produitsSel.map((produit) => (
                  <div key={produit.id_produit} className="col">
                    <div className="form-group">
                      <label htmlFor="quantite">
                        Quantité pour {produit.id_produit}:
                      </label>
                      <input
                        type="number"
                        value={produit.quantite}
                        className="form-control form-control-sm"
                        onChange={(e) =>
                          handleQuantiteChange(
                            produit.id_produit,
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="col"></div>
                  </div>
                ))}
              </div>
              <br />
              <button type="submit" className="btn btn-success btn-sm mb-2">
                Soumettre
              </button>
            </form>
          </AccordionBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader targetId="2">Liste des commandes</AccordionHeader>
          <AccordionBody accordionId="2" className="bg-white">
            <div className="mb-3">
              {data.length !== 0 && (
                <SearchInput
                  searchString={searchString}
                  placeholder="Chercher une commande ..."
                  onSearchChange={handleSearchChange}
                />
              )}
            </div>
            {data.length !== 0 && (
              <div>
                <TableCommande
                  filteredLibraries={currentItems}
                  onRowSelect={onRowSelect}
                  onRowDeselect={onRowDeselect}
                  selectedRow={selectedRow}
                ></TableCommande>
                <Pagination className="d-flex justify-content-end">
                  <PaginationItem disabled={currentPage === 1}>
                    <PaginationLink
                      onClick={() => handlePageChange(currentPage - 1)}
                    >
                      Précédent
                    </PaginationLink>
                  </PaginationItem>
                  {renderPageNumbers()}
                  <PaginationItem disabled={currentPage === totalPages}>
                    <PaginationLink
                      onClick={() => handlePageChange(currentPage + 1)}
                    >
                      Suivant
                    </PaginationLink>
                  </PaginationItem>
                </Pagination>
              </div>
            )}
          </AccordionBody>
        </AccordionItem>
      </UncontrolledAccordion>
    </div>
  );
};

export default Commandes;
