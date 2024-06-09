// Importation des dépendances nécessaires
import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
} from "reactstrap";
import { BiXCircle } from "react-icons/bi";
import { BsPersonAdd } from "react-icons/bs";

// Composant ModalFournisseur
const ModalFournisseur = ({
  modal,
  toggleModal,
  fields,
  formData,
  setFormData,
  handleSubmit,
  title,
}) => {
  // Fonction de gestion des changements des champs de formulaire
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Fonction de rendu des champs de formulaire
  const renderFields = () => {
    const rows = [];
    let cols = [];

    fields.forEach((field, index) => {
      cols.push(
        <Col key={field.name}>
          <FormGroup>
            <Label htmlFor={field.name}>{field.label}</Label>
            {field.type === "select" ? (
              // Rendu d'un champ de type select
              <Input
                type="select"
                className="form-control"
                id={field.name}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
              >
                <option value="">Sélectionnez une option</option>
                {field.options &&
                  field.options.map((option,index) => (
                    <option key={index} value={option.value}>
                      {option.label}
                    </option>
                  ))}
              </Input>
            ) : (
              // Rendu d'un champ de type standard
              <Input
                type={field.type}
                className="form-control"
                id={field.name}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
              />
            )}
          </FormGroup>
        </Col>
      );

      // Regroupement des champs dans une ligne après deux colonnes ou à la fin
      if ((index + 1) % 2 === 0 || index === fields.length - 1) {
        rows.push(<Row key={index}>{cols}</Row>);
        cols = [];
      }
    });

    return rows;
  };

  // Rendu du composant ModalFournisseur
  return (
    <Modal isOpen={modal} toggle={toggleModal}>
      <ModalHeader toggle={toggleModal}>{title}</ModalHeader>
      <Form onSubmit={handleSubmit}>
        <ModalBody className="bg-white">{fields && renderFields()}</ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={toggleModal}>
            <BiXCircle /> Fermer
          </Button>
          <Button color="primary" type="submit">
            <BsPersonAdd /> Sauvegarder
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default ModalFournisseur;
