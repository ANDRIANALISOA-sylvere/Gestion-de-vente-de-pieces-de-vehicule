import { HiOutlineTrash } from "react-icons/hi";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "../../hooks/Toast/useToast";
import { ToastContainer } from "react-toastify";
import { useFecth } from "../../hooks/Fetch/useFetch";
import SearchInput from "../../components/searchInput/searchInput";
import TableFournisseur from "../../components/TableFournisseur";
import Loader from "../../layouts/loader/Loader";
import DropdownActions from "../../components/DropdownActions/DropdownActions";
import ModalFournisseur from "../../components/ModalForm/ModalFournisseur";
import "react-toastify/dist/ReactToastify.css";
import { useSweetAlert } from "../../hooks/SweetAlert/useSweetAlert";
import { BsPersonAdd } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";

const Fournisseur = () => {
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
  const [add, setAdd] = useState({
    ID_Fournisseur: "",
    Nom: "",
    Adresse: "",
    Tel: "",
  });
  const [update, setUpdate] = useState({
    ID_Fournisseur: "",
    Nom: "",
    Adresse: "",
    Tel: "",
  });
  const fields = [
    { name: "ID_Fournisseur", label: "Identifiant", type: "text" },
    { name: "Nom", label: "Nom", type: "text" },
    { name: "Adresse", label: "Adresse", type: "text" },
    { name: "Tel", label: "N° Téléphone", type: "tel" },
  ];

  // const fields = [
  //   { name: "ID_Fournisseur", label: "Identifiant", type: "text" },
  //   { name: "Nom", label: "Nom", type: "text" },
  //   { name: "Adresse", label: "Adresse", type: "text" },
  //   { name: "Tel", label: "N° Téléphone", type: "tel" },
  //   { name: "Categorie", label: "Catégorie", type: "select", options: [
  //     { value: "option1", label: "Option 1" },
  //     { value: "option2", label: "Option 2" },
  //     { value: "option3", label: "Option 3" }
  //   ]}
  // ];
  // const { donne: categories, loading: loadingCategories, error: errorCategories } = useFetch('http://localhost:5000/categories');

  // const fields = [
  //   { name: 'ID_Fournisseur', label: 'Identifiant', type: 'text' },
  //   { name: 'Nom', label: 'Nom', type: 'text' },
  //   { name: 'Adresse', label: 'Adresse', type: 'text' },
  //   { name: 'Tel', label: 'N° Téléphone', type: 'tel' },
  //   { name: 'Categorie', label: 'Catégorie', type: 'select', options: categories },
  // ];

  const { donne, loading, error } = useFecth(
    "http://localhost:5000/fournisseur/"
  );

  const filteredLibraries = searchString.trim().toLowerCase()
    ? data.filter(
        (i) =>
          i.Nom.toLowerCase().includes(searchString.trim().toLowerCase()) ||
          i.Adresse.toLowerCase().includes(searchString.trim().toLowerCase()) ||
          i.ID_Fournisseur.toLowerCase().includes(
            searchString.trim().toLowerCase()
          )
      )
    : data;

  useEffect(() => {
    setData(donne);
  }, [donne]);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setDelayLoading(false);
    }, 1000);

    return () => clearTimeout(loadingTimeout);
  }, []);

  useEffect(() => {
    setUpdate(selectedRow);
  }, [selectedRow]);

  const onRowSelect = (row) => {
    setSelectedRow(row);
  };

  const onRowDeselect = () => {
    setSelectedRow(null);
  };

  const handleSearchChange = (newValue) => {
    setSearchString(newValue);
  };

  const deleteFournisseur = (id) => {
    try {
      showConfirmationAlert(async () => {
        const res = await axios.delete(
          "http://localhost:5000/fournisseur/" + id
        );
        setData(
          [...data].filter((prev) => {
            return prev.ID_Fournisseur !== id;
          })
        );
        notify(res.data.message);
        setSelectedRow(null);
      });
    } catch (error) {
      alertError(error.message);
    }
  };
  const postFournisseur = async () => {
    if (!add.ID_Fournisseur || !add.Nom || !add.Adresse || !add.Tel) {
      alertError("Tous les champs sont obligatoires");
    } else {
      try {
        const res = await axios.post("http://localhost:5000/fournisseur/", add);
        setData([...data, add]);
        notify("Ajout avec succès");
        setAdd({
          ID_Fournisseur: "",
          Nom: "",
          Adresse: "",
          Tel: "",
        });
        toggleModal();
      } catch (error) {
        alertError(error.message);
      }
    }
  };
  const updateFournisseur = async () => {
    if (
      !update.ID_Fournisseur ||
      !update.Nom ||
      !update.Adresse ||
      !update.Tel
    ) {
      alertError("Tous les champs sont obligatoires");
    } else {
      try {
        const res = await axios.put(
          "http://localhost:5000/fournisseur/" + selectedRow.ID_Fournisseur,
          update
        );
        const newFournisseur = [...data];
        const FournisseurIndex = data.findIndex((fournisseur) => {
          return fournisseur.ID_Fournisseur === selectedRow.ID_Fournisseur;
        });
        newFournisseur[FournisseurIndex] = update;
        setData(newFournisseur);
        notify("Modification avec succès");
        toggleModalUpdate();
        setSelectedRow(null);
      } catch (error) {
        alertError(error.message);
      }
    }
  };
  const handleSubmitFournisseur = (e) => {
    e.preventDefault();
    postFournisseur();
  };
  const handleSubmitFournisseurUpdating = (e) => {
    e.preventDefault();
    updateFournisseur();
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
            { label: "Nouveau fournisseur", disabled: false, dangerous: false },
            { label: "Mettre à jour", disabled: true, dangerous: false },
            { label: "Supprimer", disabled: true, dangerous: true },
          ]}
          icons={[<BsPersonAdd />, <BiEditAlt />, <HiOutlineTrash />]}
          callbacks={[
            toggleModal,
            toggleModalUpdate,
            () => deleteFournisseur(selectedRow.ID_Fournisseur),
          ]}
        />
        <SearchInput
          searchString={searchString}
          placeholder="Chercher un fournisseur ..."
          onSearchChange={handleSearchChange}
        />
      </div>
      {data.length !== 0 && (
        <div>
          <TableFournisseur
            filteredLibraries={filteredLibraries}
            onRowSelect={onRowSelect}
            onRowDeselect={onRowDeselect}
            selectedRow={selectedRow}
          ></TableFournisseur>
        </div>
      )}
      <ModalFournisseur
        modal={modal}
        toggleModal={toggleModal}
        formData={add}
        fields={fields}
        setFormData={setAdd}
        handleSubmit={handleSubmitFournisseur}
        title="Nouveau Fournisseur"
      />
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

export default Fournisseur;
