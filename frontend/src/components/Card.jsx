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
          <div id="favoris">
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
          <p className="card-text">
            This is a wider card with supporting text below as a natural lead-in
            ...
          </p>
          <div className="d-flex justify-content-between align-items-center">
            <span style={{ color: "#ec4899", fontWeight: "bold" }}>$100</span>
            <small className="text-body-secondary" style={{ fontSize: "20px" }}>
              <AiOutlineShoppingCart />
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};
