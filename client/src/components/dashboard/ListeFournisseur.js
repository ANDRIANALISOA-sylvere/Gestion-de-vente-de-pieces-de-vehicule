import { BiSearch } from "react-icons/bi";
import { BsPersonFillAdd } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import {
  Card,
  Table,
  Button,
  Row,
  Col,
  Input,
} from "reactstrap";
import user1 from "../../assets/images/users/user1.jpg";
import user2 from "../../assets/images/users/user2.jpg";
import user3 from "../../assets/images/users/user3.jpg";
import user4 from "../../assets/images/users/user4.jpg";
import user5 from "../../assets/images/users/user5.jpg";

const tableData = [
  {
    avatar: user1,
    name: "Hanna Gover",
    email: "hgover@gmail.com",
    project: "Flexy React",
    status: "pending",
    weeks: "35",
    budget: "95K",
  },
  {
    avatar: user2,
    name: "Hanna Gover",
    email: "hgover@gmail.com",
    project: "Lading pro React",
    status: "done",
    weeks: "35",
    budget: "95K",
  },
  {
    avatar: user3,
    name: "Hanna Gover",
    email: "hgover@gmail.com",
    project: "Elite React",
    status: "holt",
    weeks: "35",
    budget: "95K",
  },
  {
    avatar: user4,
    name: "Hanna Gover",
    email: "hgover@gmail.com",
    project: "Flexy React",
    status: "pending",
    weeks: "35",
    budget: "95K",
  },
  {
    avatar: user5,
    name: "Hanna Gover",
    email: "hgover@gmail.com",
    project: "Ample React",
    status: "done",
    weeks: "35",
    budget: "95K",
  },
];

const ListeFournisseur = () => {
  return (
    <div>
      <Card body>
        <Row>
          <Col>Founisseur</Col>
          <Col>
            <Button color="success" style={{ float: "right" }}>
              <BsPersonFillAdd /> Nouveau
            </Button>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <div>
              <Input
                type="search"
                className="form-control"
                placeholder="Reacherche"
              ></Input>
            </div>
          </Col>
          <Col>
            <Button>
              <BiSearch /> Chercher
            </Button>
          </Col>
        </Row>
      </Card>

      <Table
        className="no-wrap align-middle text-center table-striped"
        responsive
      >
        <thead>
          <tr>
            <th>Identifiant</th>
            <th>Nom</th>
            <th>Adresse</th>
            <th>N° Téléphone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((tdata, index) => (
            <tr key={index} className="border-top">
              <td>
                <div className="text-center p-2">
                  <div className="ms-3">
                    <h6 className="mb-0">{tdata.name}</h6>
                  </div>
                </div>
              </td>
              <td>{tdata.project}</td>
              <td>ok</td>
              <td>{tdata.weeks}</td>
              <td>
                <div className="d-flex align-items-center gap-2">
                  <div>
                    <Button color="primary">
                      <BiEdit />
                    </Button>
                  </div>
                  <div>
                    <Button color="danger">
                      <MdDelete />
                    </Button>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ListeFournisseur;
