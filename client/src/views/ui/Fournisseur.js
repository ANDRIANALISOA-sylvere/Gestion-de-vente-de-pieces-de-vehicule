import { AiFillEye } from "react-icons/ai";
import { BsPersonAdd } from "react-icons/bs";
import { BiEditAlt, BiXCircle } from "react-icons/bi";
import { BsFillTrashFill } from "react-icons/bs";
import { AiFillSetting } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  CardSubtitle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormFeedback,
} from "reactstrap";
import TableFournisseur from "../../components/TableFournisseur";
import { useFecth } from "../../hooks/useFetch";
import Loader from "../../layouts/loader/Loader";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Fournisseur = ({ direction, ...args }) => {
  const [data, setData] = useState([]);
  const [identifiantError, setIdentifiantError] = useState("");
  const [nomError, setNomError] = useState("");
  const [adressError, setAdresseError] = useState("");
  const [telError, setTelError] = useState("");
  const [add, setAdd] = useState({
    ID_Fournisseur: "",
    Nom: "",
    Adresse: "",
    Tel: "",
  });
  const [modal, setModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const { donne, loading, error } = useFecth(
    "http://localhost:5000/fournisseur/"
  );
  const toggleModal = () => setModal(!modal);
  useEffect(() => {
    setData(donne);
  }, [donne]);
  const onRowSelect = (row) => {
    setSelectedRow(row);
  };

  const onRowDeselect = () => {
    setSelectedRow(null);
  };

  const notify = (message) => {
    toast.success(message, {
      position: "top-center",
    });
  };
  const alertError = (message) => {
    toast.error(message, {
      position: "top-center",
    });
  };

  const deleteFournisseur = async (id) => {
    try {
      const res = await axios.delete("http://localhost:5000/fournisseur/" + id);
      setData(
        [...data].filter((prev) => {
          return prev.ID_Fournisseur !== id;
        })
      );
      notify(res.data.message);
      setSelectedRow(null);
    } catch (error) {
      alertError(error.message);
    }
  };
  const postFournisseur = async () => {
    let identifiantErreur = "";
    let nomErreur = "";
    let adresseErreur = "";
    let telErreur = "";

    if (!add.ID_Fournisseur) {
      identifiantErreur = "Identifiant requis";
    }

    if (!add.Nom) {
      nomErreur = "Nom requis";
    }

    if (!add.Adresse) {
      adresseErreur = "Adresse requis";
    }

    if (!add.Tel) {
      telErreur = "Numéro téléphone requis";
    }

    if (identifiantErreur || nomErreur || adresseErreur || telErreur) {
      setIdentifiantError(identifiantErreur);
      setNomError(nomErreur);
      setAdresseError(adresseErreur);
      setTelError(telErreur);
    } else {
      try {
        const res = await axios.post("http://localhost:5000/fournisseur/", add);
        setData([...data, add]);
        notify("Ajout avec succès");
        setIdentifiantError("");
        setNomError("");
        setAdresseError("");
        setTelError("");
        setAdd({
          ID_Fournisseur: "",
          Nom: "",
          Adresse: "",
          Tel: "",
        });
      } catch (error) {
        alertError(error.message);
      }
    }
  };
  const handleSubmitFournisseur = (e) => {
    e.preventDefault();
    postFournisseur();
  };
  return (
    <div>
      <ToastContainer autoClose={3000} />
      {loading && <Loader></Loader>}
      <p className="text-center">{error && <div>{error.message}</div>}</p>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex justify-content-around align-items-center gap-2">
          <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={direction}>
            <DropdownToggle caret>
              <AiFillSetting /> Action
            </DropdownToggle>
            <DropdownMenu {...args}>
              <DropdownItem onClick={toggleModal}>
                <BsPersonAdd /> Nouveau fournisseur
              </DropdownItem>
              <DropdownItem disabled={selectedRow ? false : true}>
                <AiFillEye /> Voir en détails
              </DropdownItem>
              <DropdownItem disabled={selectedRow ? false : true}>
                <BiEditAlt /> Modifier
              </DropdownItem>
              <DropdownItem
                disabled={selectedRow ? false : true}
                className={selectedRow ? `text-danger` : "text-muted"}
                onClick={(e) => deleteFournisseur(selectedRow.ID_Fournisseur)}
              >
                <BsFillTrashFill /> Supprimer
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div>
          <form>
            <input
              type="search"
              className="form-control"
              placeholder="Chercher un fournisseur ..."
            />
          </form>
        </div>
      </div>
      {data.length !== 0 && (
        <div>
          <TableFournisseur
            data={data}
            onRowSelect={onRowSelect}
            onRowDeselect={onRowDeselect}
            selectedRow={selectedRow}
          ></TableFournisseur>
        </div>
      )}
      <Modal isOpen={modal} toggle={toggleModal} {...args}>
        <ModalHeader toggle={toggleModal}>Nouveau Fournisseur</ModalHeader>
        <Form onSubmit={handleSubmitFournisseur}>
          <ModalBody className="bg-white">
            <Row>
              <Col>
                <FormGroup>
                  <Label for="identifiant">Identifiant</Label>
                  <Input
                    type="text"
                    className={`form-control ${
                      identifiantError ? "is-invalid input-error" : ""
                    }`}
                    id="identifiant"
                    name="identifiant"
                    value={add.ID_Fournisseur}
                    onChange={(e) => {
                      setAdd({
                        ...add,
                        ID_Fournisseur: e.target.value,
                      });
                    }}
                  ></Input>
                  {identifiantError && (
                    <FormFeedback>{identifiantError}</FormFeedback>
                  )}
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="nom">Nom</Label>
                  <Input
                    type="text"
                    className={`form-control ${
                      nomError ? "is-invalid input-error" : ""
                    }`}
                    id="nom"
                    name="nom"
                    value={add.Nom}
                    onChange={(e) => {
                      setAdd({
                        ...add,
                        Nom: e.target.value,
                      });
                    }}
                  ></Input>
                  {nomError && <FormFeedback>{nomError}</FormFeedback>}
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="adresse">Adresse</Label>
                  <Input
                    type="text"
                    className={`form-control ${
                      adressError ? "is-invalid input-error" : ""
                    }`}
                    id="adresse"
                    name="adresse"
                    value={add.Adresse}
                    onChange={(e) => {
                      setAdd({
                        ...add,
                        Adresse: e.target.value,
                      });
                    }}
                  ></Input>
                  {adressError && <FormFeedback>{adressError}</FormFeedback>}
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="tel">N° Téléphone</Label>
                  <Input
                    type="tel"
                    className={`form-control ${
                      telError ? "is-invalid input-error" : ""
                    }`}
                    id="tel"
                    name="tel"
                    value={add.Tel}
                    onChange={(e) => {
                      setAdd({
                        ...add,
                        Tel: e.target.value,
                      });
                    }}
                  ></Input>
                  {telError && <FormFeedback>{telError}</FormFeedback>}
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={toggleModal}>
              <BiXCircle /> Fermer
            </Button>
            <Button
              color="primary"
              type="submit"
              onClick={
                identifiantError || nomError || adressError || telError === ""
                  ? ""
                  : toggleModal
              }
            >
              <BsPersonAdd /> Sauvergder
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
};

export default Fournisseur;
