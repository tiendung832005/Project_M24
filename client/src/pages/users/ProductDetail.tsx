import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  FaChevronDown,
  FaFacebookMessenger,
  FaPhoneAlt,
  FaSearch,
  FaShoppingCart,
  FaTruck,
} from "react-icons/fa";

import logo from "../../images/logoHome.png";
import { useCart } from "./CartContext";

type Product = {
  id: number;
  images: string;
  name: string;
  price: number;
  status: string;
  description: string;
  quantity: number;
};

export default function ProductDetail() {
  const { productId } = useParams<{ productId: string }>();
  const [showDropdown, setShowDropdown] = useState(false);
  const { addToCart } = useCart();
  const { getTotalItems } = useCart();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    console.log("productId:", productId);

    if (!productId) {
      console.error("No productId found in URL");
      return;
    }

    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/products/${productId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const productData: Product = await response.json();
        setProduct(productData);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const productWithQuantity = { ...product, quantity: 1 };

  return (
    <div>
      <div className="header-home">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="nav">
          <a href="http://localhost:5173/home">Trang chủ</a>
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
            <a href="http://localhost:5173/cart" className="cart-icon">
              <FaShoppingCart />
            </a>
            <div className="cart-count">{getTotalItems()}</div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-8 p-12">
  <div className="w-96 xl:w-3/6">
    <img src={product.images} alt={product.name} className="w-full border rounded-lg border-gray-300" />
  </div>
  <div className="flex-1 min-w-0">
    <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
    <span className="text-red-600 text-xl mb-4">
      {product.price.toLocaleString("vi-VN")}₫
    </span>
    <div className="mb-4">
      <span className="text-orange-500 font-bold">{product.status}</span>
    </div>

    <button
      className="bg-red-500 text-white px-4 py-2 rounded-md cursor-not-allowed mb-8"
      disabled={product.status !== "Còn hàng"}
      onClick={() => addToCart(productWithQuantity)}
    >
      Thêm vào giỏ
    </button>
    <div className="mb-8">
      <a href="https://m.me/yourpage" className="flex items-center text-blue-500">
        <FaFacebookMessenger className="mr-2" /> Nhắn tin tư vấn ngay
      </a>
      <p className="mt-2">
        In áo: Mua hàng kèm in áo liên hệ ngay qua messenger của shop trên web
        hoặc qua fanpage Facebook
      </p>
      <p className="mt-2">
        <FaTruck className="mr-2" /> Giao hàng dự kiến: Thứ 2 - Thứ 6 từ 9h00 - 17h00
      </p>
      <p className="mt-2">
        <FaPhoneAlt className="mr-2" /> Hỗ trợ, tư vấn ngay qua messenger FB hoặc qua sdt
        0985842468
      </p>
    </div>
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">THÔNG TIN SẢN PHẨM</h2>
      <img
        src="https://file.hstatic.net/200000580329/file/bang_sz_284e0ac587cd4464b8277527545ae682_grande.png"
        alt=""
        className="mb-4"
      />
      <p>{product.description}</p>
    </div>
  </div>
</div>

    </div>
  );
}
