import { Button, Col, Input, Row } from "reactstrap";

const Acceuil = () => {
  return (
    <div>
      <Row>
        <Col>
          <Input
            type="text"
            className="form-control"
            placeholder="Entrer votre nom ..."
          ></Input>
        </Col>
        <Col>
          <Input
            type="text"
            className="form-control"
            placeholder="Entrer votre prenom ..."
          ></Input>
        </Col>
      </Row>
      <Button className="btn mt-2" color="primary">
        Sauvegarder
      </Button>
    </div>
  );
};

export default Acceuil;
