import { BiSearchAlt } from "react-icons/bi";
import { MdManageAccounts } from "react-icons/md";
import { AiFillIdcard } from "react-icons/ai";
import { BsFillCartFill } from "react-icons/bs";
import { AiFillDatabase } from "react-icons/ai";
import { CgShare } from "react-icons/cg";
import { AiFillFileMarkdown } from "react-icons/ai";
import { BsFillGridFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { FaTachometerAlt } from "react-icons/fa";
import { HiHome } from "react-icons/hi";
import { Button, Input, Nav, NavItem } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";

const navigation = [
  {
    title: "Tableau de bord",
    href: "/accueil",
    icon: <FaTachometerAlt />,
  },
  {
    title: "Fournisseurs",
    href: "/fournisseurs",
    icon: <HiHome />,
  },
  {
    title: "Clients",
    href: "/clients",
    icon: <FaUserAlt />,
  },
  {
    title: "Catégories",
    href: "/categories",
    icon: <BsFillGridFill />,
  },
  {
    title: "Marques",
    href: "/marques",
    icon: <AiFillFileMarkdown />,
  },
  {
    title: "Pièces",
    href: "/pieces",
    icon: <CgShare />,
  },
  {
    title: "Stocks",
    href: "/stocks",
    icon: <AiFillDatabase />,
  },
  {
    title: "Commandes",
    href: "/commandes",
    icon: <BsFillCartFill />,
  },
  {
    title: "Employes",
    href: "/employes",
    icon: <AiFillIdcard />,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: <MdManageAccounts />,
  },
];

const Sidebar = () => {
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();

  return (
    <div style={{ background: "white" }}>
      <div className="d-flex">
        <Button
          color="white"
          className="ms-auto text-white d-lg-none"
          onClick={() => showMobilemenu()}
        >
          <i className="bi bi-x"></i>
        </Button>
      </div>
      <div className="d-lg-block d-none me-5 ms-4 text-white pe-3 text-center mt-4">
        <Logo></Logo>
      </div>
      <div className="p-3 mt-4">
        <div className="sidebar_search">
          <Input
            type="search"
            className="form-control custom-radius bg-white"
            placeholder="Chercher ici ..."
          ></Input>
          <i className="form-control-icon">
            <BiSearchAlt />
          </i>
        </div>
        <Nav vertical className="sidebarNav mt-2">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg mt-2">
              <Link
                to={navi.href}
                className={
                  location.pathname === navi.href
                    ? "active nav-link py-2"
                    : "nav-link py-2"
                }
              >
                <i>{navi.icon}</i>
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
