// Importations des bibliothèques externes
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

// Importations des icônes
import { HiOutlineTrash } from "react-icons/hi";
import { BsPersonAdd } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";

// Importations des composants
import SearchInput from "../../components/searchInput/searchInput";
import Loader from "../../layouts/loader/Loader";
import DropdownActions from "../../components/DropdownActions/DropdownActions";
import ModalFournisseur from "../../components/ModalForm/ModalFournisseur";
import PaginatedTable from "../../components/Pagination/Pagination";
import TableClient from "../../components/TableClient";

// Importations des hooks personnalisés
import { useToast } from "../../hooks/Toast/useToast";
import { ToastContainer } from "react-toastify";
import { useFecth } from "../../hooks/Fetch/useFetch";
import { useSweetAlert } from "../../hooks/SweetAlert/useSweetAlert";

const Client = () => {
  // Utilisation des hooks et variable
  const { notify, alertError } = useToast();
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalupdate, setModalUpdate] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [searchString, setSearchString] = useState("");
  const [delayLoading, setDelayLoading] = useState(true);
  const toggleModal = () => setModal(!modal);
  const toggleModalUpdate = () => setModalUpdate(!modalupdate);
  const { showConfirmationAlert } = useSweetAlert();
  const itemsPerPage = 9;
  const [add, setAdd] = useState({
    ID_Client: "",
    Nom: "",
    adresse: "",
    Tel: "",
    email: "",
  });
  const [update, setUpdate] = useState({
    ID_Client: "",
    Nom: "",
    adresse: "",
    Tel: "",
    email: "",
  });
  const fields = [
    { name: "ID_Client", label: "Identifiant", type: "text" },
    { name: "Nom", label: "Nom", type: "text" },
    { name: "adresse", label: "Adresse", type: "text" },
    { name: "Tel", label: "N° Téléphone", type: "tel" },
    { name: "email", label: "Email", type: "email" },
  ];

  // Récupération des données depuis l'API
  const { donne, loading, error } = useFecth("http://localhost:5000/client/");

  // Filtrage des données selon la chaîne de recherche
  const filteredLibraries = searchString.trim().toLowerCase()
    ? data.filter(
        (i) =>
          i.Nom.toLowerCase().includes(searchString.trim().toLowerCase()) ||
          i.email.toLowerCase().includes(searchString.trim().toLowerCase()) ||
          i.adresse.toLowerCase().includes(searchString.trim().toLowerCase()) ||
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

  // Mise à jour des données lorsqu'elles sont récupérées
  useEffect(() => {
    setData(donne);
  }, [donne]);

  // Délai d'affichage du loader
  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setDelayLoading(false);
    }, 1000);

    return () => clearTimeout(loadingTimeout);
  }, []);

  // Mise à jour des données de mise à jour lorsqu'une ligne est sélectionnée
  useEffect(() => {
    setUpdate(selectedRow);
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

  // Suppression d'un client
  const deleteClient = (id) => {
    try {
      showConfirmationAlert(async () => {
        const res = await axios.delete("http://localhost:5000/client/" + id);
        setData(
          [...data].filter((prev) => {
            return prev.ID_Client !== id;
          })
        );
        notify(res.data.message);
        setSelectedRow(null);
      });
    } catch (error) {
      alertError(error.message);
    }
  };

  // Ajout d'un nouveau client
  const postClient = async () => {
    if (!add.ID_Client || !add.Nom || !add.adresse || !add.Tel || !add.email) {
      alertError("Tous les champs sont obligatoires");
    } else {
      try {
        const res = await axios.post("http://localhost:5000/client/", add);
        setData([...data, add]);
        notify("Ajout avec succès");
        setAdd({
          ID_Client: "",
          Nom: "",
          adresse: "",
          Tel: "",
          email: "",
        });
        toggleModal();
      } catch (error) {
        alertError(error.message);
      }
    }
  };

  // Mise à jour d'un client existant
  const updateClient = async () => {
    if (
      !update.ID_Client ||
      !update.Nom ||
      !update.adresse ||
      !update.email ||
      !update.Tel
    ) {
      alertError("Tous les champs sont obligatoires");
    } else {
      try {
        const res = await axios.put(
          "http://localhost:5000/client/" + selectedRow.ID_Client,
          update
        );
        const newClient = [...data];
        const ClientIndex = data.findIndex((client) => {
          return client.ID_Client === selectedRow.ID_Client;
        });
        newClient[ClientIndex] = update;
        setData(newClient);
        notify("Modification avec succès");
        toggleModalUpdate();
        setSelectedRow(null);
      } catch (error) {
        alertError(error.message);
      }
    }
  };

  // Gestion de la soumission du formulaire d'ajout
  const handleSubmitFournisseur = (e) => {
    e.preventDefault();
    postClient();
  };

  // Gestion de la soumission du formulaire de mise à jour
  const handleSubmitFournisseurUpdating = (e) => {
    e.preventDefault();
    updateClient();
  };

  return (
    <div>
      <ToastContainer autoClose={3000} />
      {(delayLoading || loading) && <Loader />}
      <p className="text-center">{error && <div>{error.message}</div>}</p>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <DropdownActions
          selectedRow={selectedRow}
          actions={[
            { label: "Nouveau client", disabled: false, dangerous: false },
            { label: "Mettre à jour", disabled: true, dangerous: false },
            { label: "Supprimer", disabled: true, dangerous: true },
          ]}
          icons={[<BsPersonAdd />, <BiEditAlt />, <HiOutlineTrash />]}
          callbacks={[
            toggleModal,
            toggleModalUpdate,
            () => deleteClient(selectedRow.ID_Client),
          ]}
        />
        {data.length !== 0 && (
          <SearchInput
            searchString={searchString}
            placeholder="Chercher un client ..."
            onSearchChange={handleSearchChange}
          />
        )}
      </div>
      {data.length !== 0 && (
        <div>
          <TableClient
            filteredLibraries={currentItems}
            onRowSelect={onRowSelect}
            onRowDeselect={onRowDeselect}
            selectedRow={selectedRow}
          ></TableClient>
          <Pagination style={{ float: "right" }}>
            <PaginationItem disabled={currentPage === 1}>
              <PaginationLink onClick={() => handlePageChange(currentPage - 1)}>
                Précédent
              </PaginationLink>
            </PaginationItem>
            {renderPageNumbers()}
            <PaginationItem disabled={currentPage === totalPages}>
              <PaginationLink onClick={() => handlePageChange(currentPage + 1)}>
                Suivant
              </PaginationLink>
            </PaginationItem>
          </Pagination>
        </div>
      )}

      {/* Modal pour ajouter un nouveau client */}
      <ModalFournisseur
        modal={modal}
        toggleModal={toggleModal}
        formData={add}
        fields={fields}
        setFormData={setAdd}
        handleSubmit={handleSubmitFournisseur}
        title="Nouveau Client"
      />

      {/* Modal pour mettre à jour un client existant */}
      {update && (
        <ModalFournisseur
          modal={modalupdate}
          toggleModal={toggleModalUpdate}
          formData={update}
          fields={fields}
          setFormData={setUpdate}
          handleSubmit={handleSubmitFournisseurUpdating}
          title="Mise à jour Client"
        />
      )}
    </div>
  );
};

export default Client;
