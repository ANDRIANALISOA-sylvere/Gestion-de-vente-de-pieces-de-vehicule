import { CgEditBlackPoint } from "react-icons/cg";
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
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { TbBrandAlgolia } from "react-icons/tb";

const navigation = [
  {
    title: "Tableau de bord",
    href: "/vente/accueil",
    icon: <FaTachometerAlt />,
  },
  {
    title: "Fournisseurs",
    href: "/vente/fournisseurs",
    icon: <HiHome />,
  },
  {
    title: "Clients",
    href: "/vente/clients",
    icon: <FaUserAlt />,
  },
  {
    title: "Catégories",
    href: "/vente/categories",
    icon: <BsFillGridFill />,
  },
  {
    title: "Marques",
    href: "/vente/marques",
    icon: <AiFillFileMarkdown />,
  },
  {
    title: "Pièces",
    href: "/vente/pieces",
    icon: <CgShare />,
  },
  {
    title: "Stocks",
    href: "/vente/stocks",
    icon: <AiFillDatabase />,
  },
  {
    title: "Commandes",
    href: "/vente/commandes",
    icon: <BsFillCartFill />,
  },
  {
    title: "Employes",
    href: "/vente/employes",
    icon: <AiFillIdcard />,
  },
  {
    title: "Profile",
    href: "/vente/profile",
    icon: <MdManageAccounts />,
  },
];

const Sidebar = () => {
  const [showStockSubMenu, setShowStockSubMenu] = useState(false);
  const toggleStockSubMenu = (navi) => {
    if (navi.title === "Stocks") {
      setShowStockSubMenu(!showStockSubMenu);
    } else {
      setShowStockSubMenu(false);
    }
  };
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
      <div className="d-lg-block d-none ms-4 me-3 text-dark pe-3 text-center mt-4">
        <div className="d-flex align-items-center justify-content-between">
          <TbBrandAlgolia
            style={{ fontSize: "35px" }}
            className="text-primary"
          />
          <span
            className="font-bold text-gray-900"
            style={{ fontSize: "20px" }}
          >
            CarParts Central
          </span>
        </div>
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
        <div className="sidebar-content">
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
                  onClick={() => toggleStockSubMenu(navi)}
                >
                  <div className="icon-container">
                    <span>
                      <i>{navi.icon}</i>
                      <span className="ms-3 d-inline-block">{navi.title}</span>
                    </span>
                    {navi.title === "Stocks" && (
                      <i
                        className={`rotate-icon ${
                          showStockSubMenu ? "open" : ""
                        }`}
                      >
                        {showStockSubMenu ? <FaChevronUp /> : <FaChevronDown />}
                      </i>
                    )}
                  </div>
                </Link>
                {navi.title === "Stocks" && (
                  <TransitionGroup>
                    {showStockSubMenu && (
                      <CSSTransition
                        key="sub-menu"
                        timeout={200}
                        classNames="sub-menu-animation"
                        unmountOnExit
                      >
                        <div className="sub-menu">
                          <Link
                            to="/vente/stocks/entrees"
                            className="nav-link py-2"
                          >
                            <span className="ms-3 d-inline-block">
                              <CgEditBlackPoint /> Entrées
                            </span>
                          </Link>
                          <Link
                            to="/vente/stocks/sorties"
                            className="nav-link py-2"
                          >
                            <span className="ms-3 d-inline-block">
                              <CgEditBlackPoint /> Sorties
                            </span>
                          </Link>
                        </div>
                      </CSSTransition>
                    )}
                  </TransitionGroup>
                )}
              </NavItem>
            ))}
          </Nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
