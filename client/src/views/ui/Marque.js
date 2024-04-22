// Importations des bibliothèques externes
import React, { useEffect, useState } from "react";
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
import TableMarque from "../../components/TableMarque";

// Importations des hooks personnalisés
import { useToast } from "../../hooks/Toast/useToast";
import { ToastContainer } from "react-toastify";
import { useFecth } from "../../hooks/Fetch/useFetch";
import { useSweetAlert } from "../../hooks/SweetAlert/useSweetAlert";

const Categorie = () => {
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
    ID_Marque: "",
    Nom: "",
  });
  const [update, setUpdate] = useState({
    ID_Marque: "",
    Nom: "",
  });
  const fields = [
    { name: "ID_Marque", label: "Identifiant", type: "text" },
    { name: "Nom", label: "Nom", type: "text" },
  ];

  // Récupération des données depuis l'API
  const { donne, loading, error } = useFecth("http://localhost:5000/marque/");

  // Filtrage des données selon la chaîne de recherche
  const filteredLibraries = searchString.trim().toLowerCase()
    ? data.filter(
        (i) =>
          i.Nom.toLowerCase().includes(searchString.trim().toLowerCase()) ||
          i.ID_Marque.toLowerCase().includes(searchString.trim().toLowerCase())
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

  // Suppression d'une marque
  const deleteMarque = (id) => {
    try {
      showConfirmationAlert(async () => {
        const res = await axios.delete("http://localhost:5000/marque/" + id);
        setData(
          [...data].filter((prev) => {
            return prev.ID_Marque !== id;
          })
        );
        notify(res.data.message);
        setSelectedRow(null);
      });
    } catch (error) {
      alertError(error.message);
    }
  };

  // Ajout d'une nouvelle marque
  const postMarque = async () => {
    if (!add.ID_Marque || !add.Nom) {
      alertError("Tous les champs sont obligatoires");
    } else {
      try {
        const res = await axios.post("http://localhost:5000/marque/", add);
        setData([...data, add]);
        notify("Ajout avec succès");
        setAdd({
          ID_Marque: "",
          Nom: "",
        });
        toggleModal();
      } catch (error) {
        alertError(error.message);
      }
    }
  };

  // Mise à jour d'une marque
  const updateMarque = async () => {
    if (!update.ID_Marque || !update.Nom) {
      alertError("Tous les champs sont obligatoires");
    } else {
      try {
        const res = await axios.put(
          "http://localhost:5000/marque/" + selectedRow.ID_Marque,
          update
        );
        const newMarque = [...data];
        const MarqueIndex = data.findIndex((marque) => {
          return marque.ID_Marque === selectedRow.ID_Marque;
        });
        newMarque[MarqueIndex] = update;
        setData(newMarque);
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
    postMarque();
  };

  // Gestion de la soumission du formulaire de mise à jour
  const handleSubmitFournisseurUpdating = (e) => {
    e.preventDefault();
    updateMarque();
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
            { label: "Nouvelle Marque", disabled: false, dangerous: false },
            { label: "Mettre à jour", disabled: true, dangerous: false },
            { label: "Supprimer", disabled: true, dangerous: true },
          ]}
          icons={[<BsPersonAdd />, <BiEditAlt />, <HiOutlineTrash />]}
          callbacks={[
            toggleModal,
            toggleModalUpdate,
            () => deleteMarque(selectedRow.ID_Marque),
          ]}
        />
        <SearchInput
          searchString={searchString}
          placeholder="Chercher une marque ..."
          onSearchChange={handleSearchChange}
        />
      </div>
      {data.length !== 0 && (
        <div>
          <TableMarque
            filteredLibraries={currentItems}
            onRowSelect={onRowSelect}
            onRowDeselect={onRowDeselect}
            selectedRow={selectedRow}
          ></TableMarque>
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

      {/* Modal pour ajouter une nouvelle marque */}
      <ModalFournisseur
        modal={modal}
        toggleModal={toggleModal}
        formData={add}
        fields={fields}
        setFormData={setAdd}
        handleSubmit={handleSubmitFournisseur}
        title="Nouvelle Marque"
      />

      {/* Modal pour mettre à jour une marque existant */}
      {update && (
        <ModalFournisseur
          modal={modalupdate}
          toggleModal={toggleModalUpdate}
          formData={update}
          fields={fields}
          setFormData={setUpdate}
          handleSubmit={handleSubmitFournisseurUpdating}
          title="Mise à jour Marque"
        />
      )}
    </div>
  );
};

export default Categorie;
