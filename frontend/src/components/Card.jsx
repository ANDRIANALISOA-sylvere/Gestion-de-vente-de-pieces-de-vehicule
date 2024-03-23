import { AiOutlineHeart } from "react-icons/ai";
import React from "react";
import Sary from "../assets/Images/sky.jpeg";
import { AiOutlineShoppingCart } from "react-icons/ai";

export default function Card() {
  return (
    <div className="card mb-3 col-md-2 m-2">
      <div className="card-img">
        <img src={Sary} alt="" />
        <span className="card_favoris">
          <AiOutlineHeart />
        </span>
      </div>
      <div className="card-body">
        <span style={{ color:'red' }}>Categorie</span>
        <h5 className="card-text">LENOVO L540</h5>
        <div className="card-text d-flex justify-content-between">
          <div>
            <span>$100</span>
          </div>
          <div>
            <AiOutlineShoppingCart></AiOutlineShoppingCart>
          </div>
        </div>
      </div>
    </div>
  );
}
