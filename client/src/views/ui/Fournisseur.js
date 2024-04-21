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
  const [modal, setModal] = useState(false);
  const [modalupdate, setModalUpdate] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [searchString, setSearchString] = useState("");
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const { donne, loading, error } = useFecth(
    "http://localhost:5000/fournisseur/"
  );
  const handleChange = (e) => {
    setSearchString(e.target.value);
  };

  const filteredLibraries = searchString.trim().toLowerCase()
    ? data.filter(
        (i) =>
          i.Nom.toLowerCase().includes(searchString.trim().toLowerCase()) ||
          i.Adresse.toLowerCase().includes(searchString.trim().toLowerCase()) || 
          i.ID_Fournisseur.toLowerCase().includes(searchString.trim().toLowerCase())
      )
    : data;

  const toggleModal = () => setModal(!modal);
  const toggleModalUpdate = () => setModalUpdate(!modalupdate);
  useEffect(() => {
    setData(donne);
  }, [donne]);

  useEffect(() => {
    setUpdate(selectedRow);
  }, [selectedRow]);

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
              <DropdownItem
                disabled={selectedRow ? false : true}
                onClick={toggleModalUpdate}
              >
                <BiEditAlt /> Mettre à jour
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
              value={searchString}
              onChange={handleChange}
            />
          </form>
        </div>
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
                    className="form-control"
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
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="nom">Nom</Label>
                  <Input
                    type="text"
                    className="form-control"
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
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="adresse">Adresse</Label>
                  <Input
                    type="text"
                    className="form-control"
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
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="tel">N° Téléphone</Label>
                  <Input
                    type="tel"
                    className="form-control"
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
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={toggleModal}>
              <BiXCircle /> Fermer
            </Button>
            <Button color="primary" type="submit">
              <BsPersonAdd /> Sauvergder
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
      {update && (
        <Modal isOpen={modalupdate} toggle={toggleModalUpdate} {...args}>
          <ModalHeader toggle={toggleModalUpdate}>
            Mise à jour Fournisseur
          </ModalHeader>
          <Form onSubmit={handleSubmitFournisseurUpdating}>
            <ModalBody className="bg-white">
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="identifiantupdate">Identifiant</Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="identifiantupdate"
                      name="identifiantupdate"
                      value={update.ID_Fournisseur}
                      onChange={(e) => {
                        setUpdate({
                          ...update,
                          ID_Fournisseur: e.target.value,
                        });
                      }}
                    ></Input>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="nomupdate">Nom</Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="nomupdate"
                      name="nomupdate"
                      value={update.Nom}
                      onChange={(e) => {
                        setUpdate({
                          ...update,
                          Nom: e.target.value,
                        });
                      }}
                    ></Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="adresseupdate">Adresse</Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="adresseupdate"
                      name="adresseupdate"
                      value={update.Adresse}
                      onChange={(e) => {
                        setUpdate({
                          ...update,
                          Adresse: e.target.value,
                        });
                      }}
                    ></Input>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="telupdate">N° Téléphone</Label>
                    <Input
                      type="tel"
                      className="form-control"
                      id="telupdate"
                      name="telupdate"
                      value={update.Tel}
                      onChange={(e) => {
                        setUpdate({
                          ...update,
                          Tel: e.target.value,
                        });
                      }}
                    ></Input>
                  </FormGroup>
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={toggleModalUpdate}>
                <BiXCircle /> Fermer
              </Button>
              <Button color="primary" type="submit">
                <BsPersonAdd /> Sauvergder
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      )}
    </div>
  );
};

export default Fournisseur;
