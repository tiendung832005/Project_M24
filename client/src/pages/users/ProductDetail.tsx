import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaChevronDown, FaFacebookMessenger, FaPhoneAlt, FaSearch, FaShoppingCart, FaTruck } from 'react-icons/fa';
import "../scss/ProductDetail.scss";
import logo from "../../images/logoHome.png";

export default function ProductDetail() {
  const { productId } = useParams<{ productId: string }>();
  const [showDropdown, setShowDropdown] = useState(false);

  const [product, setProduct] = useState<{

    images: string;
    name: string;
    price: string;
    status: string;
    description: string;
  } | null>(null);

  useEffect(() => {
    console.log('productId:', productId); 

    if (!productId) {
      console.error('No productId found in URL');
      return;
    }

    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8080/products/${productId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const productData = await response.json();
        setProduct(productData);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

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
          <i className="cart-search"><FaSearch /></i>
          <span><i><FaPhoneAlt /></i>{" "}0985842468</span>
          <div className="cart"> <i className="cart-icon"> <FaShoppingCart /></i>
            <div className="cart-count">0</div>
          </div>
        </div>
      </div>
    <div className="product-detail">
      <div className="product-detail__image">
        <img src={product.images} alt={product.name} />
      </div>
      <div className="product-detail__info">
        <h1>{product.name}</h1>
        <span className="product-detail__price">{product.price}</span>
        <div className="product-detail__status">
          <span>{product.status}</span>
        </div>
        <button className="product-detail__button" disabled={product.status !== 'Còn hàng'}>
          {product.status !== 'Còn hàng' ? 'HẾT HÀNG' : 'MUA NGAY'}
        </button>
        <br />
        <br />
        <button className="product-detail__button2" disabled={product.status !== 'Còn hàng'}>
          Thêm vào giỏ
        </button>
        <div className="product-detail__contact">
          <a href="https://m.me/yourpage">
            <FaFacebookMessenger /> Nhắn tin tư vấn ngay
          </a>
          <p>In áo: Mua hàng kèm in áo liên hệ ngay qua messenger của shop trên web hoặc qua fanpage Facebook</p>
          <p><FaTruck /> Giao hàng dự kiến: Thứ 2 - Thứ 6 từ 9h00 - 17h00</p>
          <p><FaPhoneAlt /> Hỗ trợ, tư vấn ngay qua messenger FB hoặc qua sdt 0985842468</p>
        </div>
      <div className="product-detail__description">
        <h2>THÔNG TIN SẢN PHẨM</h2>
        <img src="https://file.hstatic.net/200000580329/file/bang_sz_284e0ac587cd4464b8277527545ae682_grande.png" alt="" />
        <p>{product.description}</p>
      </div>
      </div>
    </div>
    </div>
  );
}
