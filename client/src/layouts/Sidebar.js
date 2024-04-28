import { CgEditBlackPoint } from "react-icons/cg";
import { BiSearchAlt } from "react-icons/bi";
import { Button, Input, Nav, NavItem } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { TbBrandAlgolia } from "react-icons/tb";
import { UserContext } from "../context/checkauth";
import { navigation } from "../components/Navigation";

const Sidebar = () => {
  const { user } = useContext(UserContext);
  const [showStockSubMenu, setShowStockSubMenu] = useState(false);
  const [localUser, setLocalUser] = useState("");

  useEffect(() => {
    const utilisateur = localStorage.getItem("user");
    setLocalUser(JSON.parse(utilisateur));
  }, []);
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
    <div style={{position:'fixed'}}>
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
                  {navi.title === "Employes" ? (
                    localUser.role === "Administrateur" ? (
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
                            <span className="ms-3 d-inline-block">
                              {navi.title}
                            </span>
                          </span>
                        </div>
                      </Link>
                    ) : null
                  ) : (
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
                          <span className="ms-3 d-inline-block">
                            {navi.title}
                          </span>
                        </span>
                        {navi.title === "Stocks" && (
                          <i
                            className={`rotate-icon ${
                              showStockSubMenu ? "open" : ""
                            }`}
                          >
                            {showStockSubMenu ? (
                              <FaChevronUp />
                            ) : (
                              <FaChevronDown />
                            )}
                          </i>
                        )}
                      </div>
                    </Link>
                  )}

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
    </div>
  );
};

export default Sidebar;
