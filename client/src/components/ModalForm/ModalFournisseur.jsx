import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { BiXCircle } from 'react-icons/bi';
import { BsPersonAdd } from 'react-icons/bs';

const ModalFournisseur = ({ modal, toggleModal, fields, formData, setFormData, handleSubmit, title }) => {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const renderFields = () => {
    const rows = [];
    let cols = [];

    fields.forEach((field, index) => {
      cols.push(
        <Col key={field.name}>
          <FormGroup>
            <Label htmlFor={field.name}>{field.label}</Label>
            {field.type === 'select' ? (
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
                  field.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
              </Input>
            ) : (
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

      if ((index + 1) % 2 === 0 || index === fields.length - 1) {
        rows.push(<Row key={index}>{cols}</Row>);
        cols = [];
      }
    });

    return rows;
  };

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