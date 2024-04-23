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
import TableCategorie from "../../components/TableCategorie";

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
    ID_Categorie: "",
    Nom: "",
  });
  const [update, setUpdate] = useState({
    ID_Categorie: "",
    Nom: "",
  });
  const fields = [
    { name: "ID_Categorie", label: "Identifiant", type: "text" },
    { name: "Nom", label: "Nom", type: "text" },
  ];

  // Récupération des données depuis l'API
  const { donne, loading, error } = useFecth(
    "http://localhost:5000/categorie/"
  );

  // Filtrage des données selon la chaîne de recherche
  const filteredLibraries = searchString.trim().toLowerCase()
    ? data.filter(
        (i) =>
          i.Nom.toLowerCase().includes(searchString.trim().toLowerCase()) ||
          i.ID_Categorie.toLowerCase().includes(
            searchString.trim().toLowerCase()
          )
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

  // Suppression d'un categorie
  const deleteCategorie = (id) => {
    try {
      showConfirmationAlert(async () => {
        const res = await axios.delete("http://localhost:5000/categorie/" + id);
        setData(
          [...data].filter((prev) => {
            return prev.ID_Categorie !== id;
          })
        );
        notify(res.data.message);
        setSelectedRow(null);
      });
    } catch (error) {
      alertError(error.message);
    }
  };

  // Ajout d'une nouvelle categorie
  const postCategorie = async () => {
    if (!add.ID_Categorie || !add.Nom) {
      alertError("Tous les champs sont obligatoires");
    } else {
      try {
        const res = await axios.post("http://localhost:5000/categorie/", add);
        setData([...data, add]);
        notify("Ajout avec succès");
        setAdd({
          ID_Categorie: "",
          Nom: "",
        });
        toggleModal();
      } catch (error) {
        alertError(error.message);
      }
    }
  };

  // Mise à jour d'une categorie
  const updateCategorie = async () => {
    if (!update.ID_Categorie || !update.Nom) {
      alertError("Tous les champs sont obligatoires");
    } else {
      try {
        const res = await axios.put(
          "http://localhost:5000/categorie/" + selectedRow.ID_Categorie,
          update
        );
        const newCategorie = [...data];
        const CategorieIndex = data.findIndex((categorie) => {
          return categorie.ID_Categorie === selectedRow.ID_Categorie;
        });
        newCategorie[CategorieIndex] = update;
        setData(newCategorie);
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
    postCategorie();
  };

  // Gestion de la soumission du formulaire de mise à jour
  const handleSubmitFournisseurUpdating = (e) => {
    e.preventDefault();
    updateCategorie();
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
            { label: "Nouvelle categorie", disabled: false, dangerous: false },
            { label: "Mettre à jour", disabled: true, dangerous: false },
            { label: "Supprimer", disabled: true, dangerous: true },
          ]}
          icons={[<BsPersonAdd />, <BiEditAlt />, <HiOutlineTrash />]}
          callbacks={[
            toggleModal,
            toggleModalUpdate,
            () => deleteCategorie(selectedRow.ID_Categorie),
          ]}
        />
        {data.length !== 0 && (
          <SearchInput
            searchString={searchString}
            placeholder="Chercher une categorie ..."
            onSearchChange={handleSearchChange}
          />
        )}
      </div>
      {data.length !== 0 && (
        <div>
          <TableCategorie
            filteredLibraries={currentItems}
            onRowSelect={onRowSelect}
            onRowDeselect={onRowDeselect}
            selectedRow={selectedRow}
          ></TableCategorie>
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

      {/* Modal pour ajouter une nouvelle categorie */}
      <ModalFournisseur
        modal={modal}
        toggleModal={toggleModal}
        formData={add}
        fields={fields}
        setFormData={setAdd}
        handleSubmit={handleSubmitFournisseur}
        title="Nouvelle Catégorie"
      />

      {/* Modal pour mettre à jour une categorie existant */}
      {update && (
        <ModalFournisseur
          modal={modalupdate}
          toggleModal={toggleModalUpdate}
          formData={update}
          fields={fields}
          setFormData={setUpdate}
          handleSubmit={handleSubmitFournisseurUpdating}
          title="Mise à jour Catégorie"
        />
      )}
    </div>
  );
};

export default Categorie;
