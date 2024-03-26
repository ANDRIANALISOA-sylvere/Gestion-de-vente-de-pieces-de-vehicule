import { FaRegComment } from "react-icons/fa";
import { BsSend } from "react-icons/bs";
import React from "react";
import Sary from "../assets/Images/magicpattern-mesh-gradient-1711367366397.png";
import { Card } from "../components/Card";
import { IoIosStarOutline } from "react-icons/io";
import { IoIosStarHalf } from "react-icons/io";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";

export default function ProductDetails() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 text-center border border-dark" style={{ height: "500px" }}>
          <img src={Sary} alt="" style={{ height: "90%", width: "100%" }} />
        </div>
        <div className="col-md-6">
          <div className="info">
            <h3 className="border-bottom">Lenovo L540</h3>
            <div className="rating">
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <IoIosStarHalf />
              <IoIosStarOutline />
            </div>
            <br />
            <div className="row">
              <h5 className="col">$100.00</h5>
              <p className="col">
                <AiOutlineHeart className="icon_favoris me-1" /> Ajouter au
                favoris
              </p>
            </div>
            <div className="mt-5">
              <p>
                <strong>Type</strong> : Ordinateur
              </p>
              <p>
                <strong>Brand</strong> : Lenovo
              </p>
              <p>
                <strong>Categorie</strong>:<span> PC</span>
              </p>
              <p>
                <strong>Stock</strong> : 24 en stock
              </p>
              <p>
                <strong>Evaluation</strong> : 2
              </p>
              <strong>Quantité :</strong>
              <br />
              <div className="d-flex gap-2">
                <div>
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    style={{ width: "60px" }}
                    min="1"
                    defaultValue={1}
                  />
                </div>
                <div>
                  <button className="btn btn-dark btn-sm">
                    Ajouter au panier
                  </button>
                </div>
                <div>
                  <button className="btn btn-warning btn-sm">
                    Passer au payement
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <strong>Description :</strong>
        <p className="p-2 bg-light rounded">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, nisi id
          ipsam aperiam cupiditate dolore iste dolor tempora? Sequi error quam
          ab odio eius recusandae! nisi id ipsam aperiam cupiditate dolore iste
          dolor tempora? Sequi error quam ab odio eius recusandae! nisi id ipsam
          aperiam cupiditate dolore iste dolor tempora? Sequi error quam ab odio
          eius recusandae!
        </p>
      </div>

      <div>
        <strong>Commentaires :</strong>
        <div className="p-2 bg-light rounded">
          <p>
            <strong>
              <span>Joséphin Sylvère</span>
            </strong>
            <small style={{ float: "right" }}>20-04-2024</small>
          </p>
          <div>
            Lorem ipsum, dolor sit amet Lorem ipsum dolor sit amet.
            <br />
            <p className="rating">
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <IoIosStarHalf />
              <IoIosStarOutline />
            </p>
          </div>
        </div>
        <div>
          <div className="mt-3">
            <strong>Ajouter un commentaire :</strong>
            <br />
            <label htmlFor="Note">Note :</label>
            <input
              type="range"
              name=""
              id=""
              min="0"
              max="5"
              step="1"
              className="form-range"
            />
          </div>
          <label htmlFor="Note">Commentaire :</label>
          <textarea
            name=""
            id=""
            cols="30"
            rows="3"
            className="form-control"
          ></textarea>
          <button
            className="btn btn-warning btn-sm mt-2"
            style={{ float: "right" }}
          >
            <FaRegComment /> Commenter
          </button>
        </div>
      </div>

      <div className="mt-5">
        <h3>Produits que tu pourrais aimé :</h3>
        <hr />
        <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 g-3">
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
        </div>
      </div>
    </div>
  );
}
