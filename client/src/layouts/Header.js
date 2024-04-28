import { BiLogOut } from "react-icons/bi";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  Collapse,
  Nav,
  NavbarBrand,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from "reactstrap";
import { ReactComponent as LogoWhite } from "../assets/images/logos/adminprowhite.svg";
import user1 from "../assets/images/users/user-1.jpg";
import { UserContext } from "../context/checkauth";

// Composant Header
const Header = () => {
  const { user } = useContext(UserContext);
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [localUser, setLocalUser] = useState("");

  useEffect(() => {
    const utilisateur = localStorage.getItem("user");
    setLocalUser(JSON.parse(utilisateur));
  }, []);

  // Fonction pour basculer l'état du menu déroulant
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  // Fonction pour basculer l'état du menu de navigation
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };

  // Fonction pour afficher/masquer le menu latéral
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };

  const navigate = useNavigate();

  // Fonction pour gérer la déconnexion
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <Navbar
      light
      expand="md"
      className="fix-header mb-4 mb-5"
      style={{ borderBottom: "1px solid #edf2f9" }}
    >
      <div className="d-flex align-items-center">
        <NavbarBrand href="/">
          <LogoWhite className="d-lg-none" />
        </NavbarBrand>
        <Button
          color="primary"
          className=" d-lg-none"
          onClick={() => showMobilemenu()}
        >
          <i className="bi bi-list"></i>
        </Button>
      </div>
      <div className="hstack gap-2">
        <Button
          color="primary"
          size="sm"
          className="d-sm-block d-md-none"
          onClick={Handletoggle}
        >
          {isOpen ? (
            <i className="bi bi-x"></i>
          ) : (
            <i className="bi bi-three-dots-vertical"></i>
          )}
        </Button>
      </div>
      <Collapse navbar isOpen={isOpen}>
        <Nav className="me-auto" navbar>
          <span
            style={{ color: "#78909C", fontWeight: "400", fontSize: "20px" }}
          >
            {" "}
            Tableau de bord{" "}
          </span>
        </Nav>
        <Dropdown isOpen={dropdownOpen} toggle={toggle} className="shadow-none">
          <DropdownToggle color="transparent" className="shadow-none">
            {localUser.nom} {localUser.prenom}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Info</DropdownItem>
            <Link to="/vente/profile" style={{textDecoration:'none'}}>
              <DropdownItem>Profile</DropdownItem>
            </Link>
            <DropdownItem divider />
            <DropdownItem
              onClick={handleLogout}
              className="text-danger hover_logout"
            >
              <BiLogOut /> Se déconnecter
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Collapse>
    </Navbar>
  );
};

export default Header;
