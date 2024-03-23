import { AiOutlineUser } from "react-icons/ai"; 
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { BiSearchAlt } from "react-icons/bi";
import React from "react";

export default function Navbarwebsite() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            E-vendre
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor01"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarColor01">
            <form className="d-flex col-md-8 ms-5">
              <input
                className="form-control btn_search_input"
                type="search"
                placeholder="Chercher un produit ici ..."
              />
              <button
                className="btn my-2 my-sm-0 btn_search"
                type="submit"
              >
                <BiSearchAlt />
              </button>
            </form>
            <div className="d-flex ms-5 text-light gap-4">
              <div className="nav_item">
                <a href="#" className="login">
                  <AiOutlineUser /> Log In
                </a>
              </div>
              <div className="nav_item">
                <a href="#" className="login">
                  <MdOutlineFavoriteBorder /> Favoris
                </a>
              </div>
              <div className="nav_item">
                <a href="#" className="login">
                  <AiOutlineShoppingCart /> Panier
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <nav
        className="navbar navbar-expand-lg"
        id="sous_nav"
        data-bs-theme="light"
      >
        <div className="container-fluid">
          <div className="nav-item text-light me-5 dropdown">
            <a
              className="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
              href="#"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Tous les catégories
            </a>
            <div className="dropdown-menu all_categories">
              <a className="dropdown-item text-dark" href="#">
                Action
              </a>
              <a className="dropdown-item text-dark" href="#">
                Another action
              </a>
              <a className="dropdown-item text-dark" href="#">
                Something else here
              </a>
              <div className="dropdown-divider" />
              <a className="dropdown-item text-dark" href="#">
                Separated link
              </a>
            </div>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor01"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav me-auto">
              <li className="nav-item navbar_item">
                <a className="nav-link text-light active" href="#">
                  Acceuil
                  <span className="visually-hidden">(current)</span>
                </a>
              </li>
              <li className="nav-item navbar_item">
                <a className="nav-link text-light" href="#">
                  Produits
                </a>
              </li>
              <li className="nav-item navbar_item">
                <a className="nav-link text-light" href="#">
                  Blogs
                </a>
              </li>
              <li className="nav-item navbar_item">
                <a className="nav-link text-light" href="#">
                  A propos
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
