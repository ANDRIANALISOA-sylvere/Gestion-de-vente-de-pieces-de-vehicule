import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { IoLogoBuffer } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import { BiGridAlt } from "react-icons/bi";
import { BiMenu } from "react-icons/bi";
import React from "react";
import Sary from "../../assets/Images/magicpattern-mesh-gradient-1711489894773.jpeg";
import "../../assets/css/admin.css";
import { NavLink } from "react-router-dom";
import "../../assets/js/sidebar.js";

function Home() {
  return (
    <div className="body">
      <div className="sidebar">
        <div className="logo_content">
          <div className="logo">
            <i>
              <IoLogoBuffer />
            </i>
            <div className="logo_name">E-vendre</div>
          </div>
          <i id="btn">
            <BiMenu />
          </i>
        </div>
        <ul className="nav_list">
          <li>
            <NavLink href="#">
              <i>
                <BiGridAlt />
              </i>
              <span className="links_span">Tableau de bord</span>
            </NavLink>
            <span className="tooltip">Tableaud de bord</span>
          </li>
          <li>
            <NavLink href="#">
              <i>
                <AiOutlineUser />
              </i>
              <span className="links_span">Utilisateurs</span>
            </NavLink>
            <span className="tooltip">Utilisateurs</span>
          </li>
          <li>
            <NavLink href="#">
              <i>
                <AiOutlineShoppingCart />
              </i>
              <span className="links_span">Commandes</span>
            </NavLink>
            <span className="tooltip">Commandes</span>
          </li>
          <li>
            <NavLink href="#">
              <i>
                <MdOutlineProductionQuantityLimits />
              </i>
              <span className="links_span">Produits</span>
            </NavLink>
            <span className="tooltip">Produits</span>
          </li>
        </ul>
        <div className="profile_content">
          <div className="profile">
            <div className="profile_details">
              <img src={Sary} alt="" />
              <div className="name_job">
                <div className="name">Joséphin Sylvère</div>
                <div className="job">Administrateur</div>
              </div>
            </div>
          </div>
          <i id="log_out">
            <BiLogOut />
          </i>
        </div>
      </div>
      <div className="home_content">
        <div className="text">Home content</div>
      </div>
    </div>
  );
}

export default Home;
