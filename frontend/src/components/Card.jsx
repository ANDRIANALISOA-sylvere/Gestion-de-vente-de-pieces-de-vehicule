import { IoIosStarOutline } from "react-icons/io"; 
import { IoIosStarHalf } from "react-icons/io"; 
import { AiFillStar } from "react-icons/ai"; 
import { AiOutlineHeart } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import React from "react";
import Sary from "../assets/Images/sky.jpeg";

export const Card = () => {
  return (
    <div className="col">
      <div className="card border-0 shadow-sm product_card">
        <div className="img_header">
          <img
            src={Sary}
            alt=""
            style={{ width: "100%", height: "200px", objectFit: "cover" }}
          />
          <div className="favoris">
            <AiOutlineHeart />
          </div>
          <div
            id="brand"
            className="badge bg-danger-subtle  rounded-pill"
          >
            Nature
          </div>
        </div>
        <div className="card-body">
          <span style={{ fontWeight: "bold" }}>Lenovo L540</span>
          <br />
          <span className="card-text" style={{ opacity:'0.7' }}>
            This is a wider card with supporting text below as a natural lead-in
            ...
          </span>
          <div className="rating">
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <IoIosStarHalf />
            <IoIosStarOutline />
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <span style={{ fontWeight: "bold",opacity:'0.5' }}>$100</span>
            <small className="text-body-secondary" style={{ fontSize: "20px" }}>
              <AiOutlineShoppingCart className="icon_panier" />
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};
