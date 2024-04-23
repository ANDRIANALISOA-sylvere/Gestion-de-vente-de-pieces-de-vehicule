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
import TablePiece from "../../components/TablePiece";

// Importations des hooks personnalisés
import { useToast } from "../../hooks/Toast/useToast";
import { ToastContainer } from "react-toastify";
import { useFecth } from "../../hooks/Fetch/useFetch";
import { useSweetAlert } from "../../hooks/SweetAlert/useSweetAlert";

const Piece = () => {
  // Utilisation des hooks et variable
  const { notify, alertError } = useToast();
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalupdate, setModalUpdate] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [categorie, setCategorie] = useState([]);
  const [fournisseur, setFournisseur] = useState([]);
  const [marque, setMarque] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [delayLoading, setDelayLoading] = useState(true);
  const toggleModal = () => setModal(!modal);
  const toggleModalUpdate = () => setModalUpdate(!modalupdate);
  const { showConfirmationAlert } = useSweetAlert();
  const itemsPerPage = 9;
  const [add, setAdd] = useState({
    ID_Piece: "",
    Nom: "",
    Prix_unitaire_ht: "",
    ID_Categorie: "",
    ID_marque: "",
    Stock_disponible: "",
    ID_Fournisseur: "",
    TVA: "",
  });
  const [update, setUpdate] = useState({
    ID_Piece: "",
    Nom: "",
    Prix_unitaire_ht: "",
    ID_Categorie: "",
    ID_marque: "",
    Stock_disponible: "",
    ID_Fournisseur: "",
    TVA: "",
  });
  // Récupération des données depuis l'API
  const { donne, loading, error } = useFecth("http://localhost:5000/piece/");
  const getCategorie = async () => {
    try {
      const res = await axios.get("http://localhost:5000/categorie");
      setCategorie(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getMarque = async () => {
    try {
      const res = await axios.get("http://localhost:5000/marque");
      setMarque(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getFournisseur = async () => {
    try {
      const res = await axios.get("http://localhost:5000/fournisseur");
      setFournisseur(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fields = [
    { name: "ID_Piece", label: "Identifiant", type: "text" },
    { name: "Nom", label: "Nom", type: "text" },
    { name: "Prix_unitaire_ht", label: "Prix_unitaire_ht", type: "number" },
    {
      name: "ID_Categorie",
      label: "Catégorie",
      type: "select",
      options: categorie.map((cat) => ({
        value: cat.ID_Categorie,
        label: cat.ID_Categorie + "-" + cat.Nom,
      })),
    },
    {
      name: "ID_marque",
      label: "Marque",
      type: "select",
      options: marque.map((mark) => ({
        value: mark.ID_Marque,
        label: mark.ID_Marque + "-" + mark.Nom,
      })),
    },
    { name: "Stock_disponible", label: "Stock_disponible", type: "number" },
    {
      name: "ID_Fournisseur",
      label: "Fournisseur",
      type: "select",
      options: fournisseur.map((fournisseur) => ({
        value: fournisseur.ID_Fournisseur,
        label: fournisseur.ID_Fournisseur + "-" + fournisseur.Nom,
      })),
    },
    { name: "TVA", label: "TVA", type: "number" },
  ];

  const formatData = (data, categorie, marque, fournisseur) => {
    return data.map((item) => {
      const categorieName =
        categorie.find((cat) => cat.ID_Categorie === item.ID_Categorie)?.Nom ||
        "";
      const marqueName =
        marque.find((mark) => mark.ID_Marque === item.ID_marque)?.Nom || "";
      const fournisseurName =
        fournisseur.find(
          (fournisseur) => fournisseur.ID_Fournisseur === item.ID_Fournisseur
        )?.Nom || "";
      return {
        ...item,
        ID_Categorie: categorieName,
        ID_marque: marqueName,
        ID_Fournisseur: fournisseurName,
      };
    });
  };

  const formattedData = formatData(data, categorie, marque, fournisseur);

  // Filtrage des données selon la chaîne de recherche
  const filteredLibraries = searchString.trim().toLowerCase()
    ? formattedData.filter(
        (i) =>
          i.ID_Piece.toLowerCase().includes(
            searchString.trim().toLowerCase()
          ) ||
          i.Nom.toLowerCase().includes(searchString.trim().toLowerCase()) ||
          i.ID_Categorie.toLowerCase().includes(
            searchString.trim().toLowerCase()
          ) ||
          i.ID_marque.toLowerCase().includes(
            searchString.trim().toLowerCase()
          ) ||
          i.ID_Fournisseur.toLowerCase().includes(
            searchString.trim().toLowerCase()
          )
      )
    : formattedData;

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

  useEffect(() => {
    getCategorie();
    getFournisseur();
    getMarque();
  }, []);

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

  // Suppression d'une piece
  const deletePiece = (id) => {
    try {
      showConfirmationAlert(async () => {
        const res = await axios.delete("http://localhost:5000/piece/" + id);
        setData(
          [...data].filter((prev) => {
            return prev.ID_Piece !== id;
          })
        );
        notify(res.data.message);
        setSelectedRow(null);
      });
    } catch (error) {
      alertError(error.message);
    }
  };

  // Ajout d'une nouvelle piece
  const postPiece = async () => {
    if (
      !add.ID_Piece ||
      !add.Nom ||
      !add.Prix_unitaire_ht ||
      !add.ID_Categorie ||
      !add.ID_marque ||
      !add.Stock_disponible ||
      !add.ID_Fournisseur ||
      !add.TVA
    ) {
      alertError("Tous les champs sont obligatoires");
    } else {
      try {
        const res = await axios.post("http://localhost:5000/piece/", add);
        setData([...data, add]);
        notify("Ajout avec succès");
        setAdd({
          ID_Piece: "",
          Nom: "",
          Prix_unitaire_ht: "",
          ID_Categorie: "",
          ID_marque: "",
          Stock_disponible: "",
          ID_Fournisseur: "",
          TVA: "",
        });
        toggleModal();
      } catch (error) {
        alertError(error.message);
      }
    }
  };

  // Mise à jour d'une piece existant
  const updatePiece = async () => {
    if (
      !update.ID_Piece ||
      !update.Nom ||
      !update.Prix_unitaire_ht ||
      !update.ID_Categorie ||
      !update.ID_marque ||
      !update.Stock_disponible ||
      !update.ID_Fournisseur ||
      !update.TVA
    ) {
      alertError("Tous les champs sont obligatoires");
    } else {
      try {
        const res = await axios.put(
          "http://localhost:5000/piece/" + selectedRow.ID_Piece,
          update
        );
        const newPiece = [...data];
        const PieceIndex = data.findIndex((piece) => {
          return piece.ID_Piece === selectedRow.ID_Piece;
        });
        newPiece[PieceIndex] = update;
        setData(newPiece);
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
    postPiece();
  };

  // Gestion de la soumission du formulaire de mise à jour
  const handleSubmitFournisseurUpdating = (e) => {
    e.preventDefault();
    updatePiece();
  };

  console.log(selectedRow);

  return (
    <div>
      <ToastContainer autoClose={3000} />
      {(delayLoading || loading) && <Loader />}
      <p className="text-center">{error && <div>{error.message}</div>}</p>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <DropdownActions
          selectedRow={selectedRow}
          actions={[
            { label: "Nouvelle piece", disabled: false, dangerous: false },
            { label: "Mettre à jour", disabled: true, dangerous: false },
            { label: "Supprimer", disabled: true, dangerous: true },
          ]}
          icons={[<BsPersonAdd />, <BiEditAlt />, <HiOutlineTrash />]}
          callbacks={[
            toggleModal,
            toggleModalUpdate,
            () => deletePiece(selectedRow.ID_Piece),
          ]}
        />
        {data.length !== 0 && (
          <SearchInput
            searchString={searchString}
            placeholder="Chercher une piece ..."
            onSearchChange={handleSearchChange}
          />
        )}
      </div>
      {data.length !== 0 && (
        <div>
          <TablePiece
            filteredLibraries={currentItems}
            onRowSelect={onRowSelect}
            onRowDeselect={onRowDeselect}
            selectedRow={selectedRow}
            donnepur={data}
            status={"piece"}
          ></TablePiece>
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

      {/* Modal pour ajouter une nouvelle piece */}
      <ModalFournisseur
        modal={modal}
        toggleModal={toggleModal}
        formData={add}
        fields={fields}
        setFormData={setAdd}
        handleSubmit={handleSubmitFournisseur}
        title="Nouvelle Pièce"
      />

      {/* Modal pour mettre à jour une pièce existant */}
      {update && (
        <ModalFournisseur
          modal={modalupdate}
          toggleModal={toggleModalUpdate}
          formData={update}
          fields={fields}
          setFormData={setUpdate}
          handleSubmit={handleSubmitFournisseurUpdating}
          title="Mise à jour Fournisseur"
        />
      )}
    </div>
  );
};

export default Piece;
