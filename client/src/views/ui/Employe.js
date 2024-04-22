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
import TableEmploye from "../../components/TableEmploye";

// Importations des hooks personnalisés
import { useToast } from "../../hooks/Toast/useToast";
import { ToastContainer } from "react-toastify";
import { useFecth } from "../../hooks/Fetch/useFetch";
import { useSweetAlert } from "../../hooks/SweetAlert/useSweetAlert";

const Employe = () => {
  // Utilisation des hooks et variable
  const { notify, alertError } = useToast();
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [searchString, setSearchString] = useState("");
  const [delayLoading, setDelayLoading] = useState(true);
  const toggleModal = () => setModal(!modal);
  const { showConfirmationAlert } = useSweetAlert();
  const itemsPerPage = 9;
  const [add, setAdd] = useState({
    matricule: "",
    nom: "",
    prenom: "",
    email: "",
    mdp: "",
    role: "",
  });
  const fields = [
    { name: "matricule", label: "Identifiant", type: "text" },
    { name: "nom", label: "nom", type: "text" },
    { name: "prenom", label: "prenom", type: "text" },
    { name: "email", label: "email", type: "email" },
    { name: "mdp", label: "mdp", type: "text" },
    {
      name: "role",
      label: "role",
      type: "select",
      options: [
        { value: "Administrateur", label: "Administrateur" },
        { value: "Employé", label: "Employé" },
      ],
    },
  ];

  // Récupération des données depuis l'API
  const { donne, loading, error } = useFecth(
    "http://localhost:5000/utilisateur/"
  );

  // Filtrage des données selon la chaîne de recherche
  const filteredLibraries = searchString.trim().toLowerCase()
    ? data.filter(
        (i) =>
          i.nom.toLowerCase().includes(searchString.trim().toLowerCase()) ||
          i.matricule
            .toLowerCase()
            .includes(searchString.trim().toLowerCase()) ||
          i.prenom.toLowerCase().includes(searchString.trim().toLowerCase()) ||
          i.email.toLowerCase().includes(searchString.trim().toLowerCase()) ||
          i.role.toLowerCase().includes(searchString.trim().toLowerCase())
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

  // Suppression d'un employe
  const deleteEmploye = (id) => {
    try {
      showConfirmationAlert(async () => {
        const res = await axios.delete(
          "http://localhost:5000/utilisateur/" + id
        );
        setData(
          [...data].filter((prev) => {
            return prev.matricule !== id;
          })
        );
        notify(res.data.message);
        setSelectedRow(null);
      });
    } catch (error) {
      alertError(error.message);
    }
  };

  // Ajout d'un nouveau employé
  const postEmploye = async () => {
    if (!add.matricule || !add.nom || !add.prenom || !add.mdp || !add.role) {
      alertError("Tous les champs sont obligatoires");
    } else {
      try {
        const res = await axios.post("http://localhost:5000/utilisateur/", add);
        setData([...data, add]);
        notify("Ajout avec succès");
        setAdd({
          matricule: "",
          nom: "",
          prenom: "",
          email: "",
          mdp: "",
          role: "",
        });
        toggleModal();
      } catch (error) {
        alertError(error.message);
      }
    }
  };

  // Gestion de la soumission du formulaire d'ajout
  const handleSubmitFournisseur = (e) => {
    e.preventDefault();
    postEmploye();
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
            { label: "Nouveau employé", disabled: false, dangerous: false },
            { label: "Supprimer", disabled: true, dangerous: true },
          ]}
          icons={[<BsPersonAdd />, <BiEditAlt />, <HiOutlineTrash />]}
          callbacks={[
            toggleModal,
            () => deleteEmploye(selectedRow.matricule),
          ]}
        />
        <SearchInput
          searchString={searchString}
          placeholder="Chercher un employé ..."
          onSearchChange={handleSearchChange}
        />
      </div>
      {data.length !== 0 && (
        <div>
          <TableEmploye
            filteredLibraries={currentItems}
            onRowSelect={onRowSelect}
            onRowDeselect={onRowDeselect}
            selectedRow={selectedRow}
          ></TableEmploye>
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

      {/* Modal pour ajouter un nouveau employé */}
      <ModalFournisseur
        modal={modal}
        toggleModal={toggleModal}
        formData={add}
        fields={fields}
        setFormData={setAdd}
        handleSubmit={handleSubmitFournisseur}
        title="Nouveau Employé"
      />
    </div>
  );
};

export default Employe;
