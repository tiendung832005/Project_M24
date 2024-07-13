import React, { useEffect, useState } from "react";
import "../scss/Home.scss";
import {
  FaChevronDown,
  FaPhoneAlt,
  FaSearch,
  FaShoppingCart,
} from "react-icons/fa";
import axios from "axios";
import logo from "../../images/logoHome.png";
import carousel1 from "../../images/slide_1_img.webp";
import carousel2 from "../../images/slide_2_img.webp";
import carousel3 from "../../images/slide_3_img.webp";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { NavLink } from "react-router-dom";

type Product = {
  id: number;
  name: string;
  images: string;
  status: string;
  category: string;
  price: string;
  date: string;
};

export default function UserHome() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  const nationalTeamProducts = products.filter(
    (product) => product.category.trim() === "Áo tuyển Quốc Gia"
  );
  const clubProducts = products.filter(
    (product) => product.category.trim() === "Áo CLB"
  );
  const retroProducts = products.filter(
    (product) => product.category.trim() === "Áo Retro"
  );

  return (
    <div>
      <div className="header-home">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="nav">
          <a href="#">Trang chủ</a>
          <a
            href="#"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            Sản phẩm{" "}
            <i className="icon-down">
              <FaChevronDown />
            </i>
            {showDropdown && (
              <div className="dropdown">
                <a href="#">Áo tuyển Quốc Gia</a>
                <a href="#">Áo CLB</a>
                <a href="#">Áo Retro</a>
              </div>
            )}
          </a>
          <a href="#">Dịch vụ</a>
          <a href="#">Đặt áo đội</a>
        </div>
        <div className="contact">
          <i className="cart-search">
            <FaSearch />
          </i>
          <span>
            <i>
              <FaPhoneAlt />
            </i>{" "}
            0985842468
          </span>
          <div className="cart">
            <i className="cart-icon">
              <FaShoppingCart />
            </i>
            <div className="cart-count">0</div>
          </div>
        </div>
      </div>

      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={carousel1} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={carousel2} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={carousel3} className="d-block w-100" alt="..." />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <section className="services" id="services">
        <div className="heading">
          <h2>Áo bóng đá bản tuyển Quốc Gia</h2>
        </div>
        <div id="products" className="services-container">
          {nationalTeamProducts.map((product) => (
            <NavLink
              to={`/card/${product.id}`}
              key={`national-${product.id}`}
              className="box"
            >
              <div className="box-img">
                <img
                  className="img-products"
                  src={product.images}
                  alt={product.name}
                />
              </div>
              <h3 className="h3">{product.name}</h3>
              <h2 className="h2">{product.price}</h2>
            </NavLink>
          ))}
        </div>
      </section>

      <section className="services" id="services">
        <div className="heading">
          <h2>Áo bóng đá bản CLB</h2>
        </div>
        <div id="products" className="services-container">
          {clubProducts.map((product) => (
            <NavLink
              to={`/card/${product.id}`}
              key={`club-${product.id}`}
              className="box"
            >
              <div className="box-img">
                <img
                  className="img-products"
                  src={product.images}
                  alt={product.name}
                />
              </div>
              <h3 className="h3">{product.name}</h3>
              <h2 className="h2">{product.price}</h2>
            </NavLink>
          ))}
        </div>
      </section>

      <section className="services" id="services">
        <div className="heading">
          <h2>Áo bóng đá bản Retro</h2>
        </div>
        <div id="products" className="services-container">
          {retroProducts.map((product) => (
            <NavLink
              to={`/card/${product.id}`}
              key={`retro-${product.id}`}
              className="box"
            >
              <div className="box-img">
                <img
                  className="img-products"
                  src={product.images}
                  alt={product.name}
                />
              </div>
              <h3 className="h3">{product.name}</h3>
              <h2 className="h2">{product.price}</h2>
            </NavLink>
          ))}
        </div>
      </section>
    </div>
  );
}
