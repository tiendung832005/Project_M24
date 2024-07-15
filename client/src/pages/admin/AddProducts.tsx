import React, { useState } from 'react';
import "../scss/addProducts.scss";
import Sidebar from './Sidebar';
import { NavLink, useNavigate } from 'react-router-dom';

export default function AddProducts() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [product, setProduct] = useState({
    name: '',
    price: '',
    status: '',
    category: '',
    description: '',
    images: '', // Đổi từ 'image' thành 'images'
  });
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProduct(prevProduct => ({ ...prevProduct, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Xử lý file ảnh nếu cần thiết
    }
  };

  const handleImageUrl = (imageUrl: string) => {
    setProduct(prevProduct => ({ ...prevProduct, images: imageUrl })); // Sửa 'image' thành 'images'
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...product,
          date: new Date().toLocaleDateString(), // Thêm ngày hiện tại
        }),
      });
      if (response.ok) {
        navigate('/products');
      } else {
        console.error('Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className='container1'>
      <Sidebar openSidebarToggle={sidebarOpen} OpenSidebar={toggleSidebar} />
      <div className="add-product-page">
        <button className="back-button">
          <NavLink className="back-button" to={'/products'}>Back</NavLink>
        </button>
        <h1>Add Product</h1>
        <form className="add-product-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Product Name</label>
            <input type="text" name="name" value={product.name} onChange={handleChange} placeholder="Nhập tên sản phẩm" />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input type="text" name="price" value={product.price} onChange={handleChange} placeholder="Nhập giá" />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select name="category" value={product.category} onChange={handleChange}>
              <option value="">Chọn danh mục</option>
              <option value="Áo Tuyển Quốc Gia">Áo tuyển Quốc Gia</option>
              <option value="Áo CLB">Áo CLB</option>
              <option value="Áo Retro">Áo Retro</option>
            </select>
          </div>
          <div className="form-group">
            <label>Status</label>
            <select name="status" value={product.status} onChange={handleChange}>
              <option value="">Chọn trạng thái</option>
              <option value="Còn hàng">Còn hàng</option>
              <option value="Sắp hết hàng">Sắp hết hàng</option>
              <option value="Bán hết">Bán hết</option>
            </select>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={product.description} onChange={handleChange} placeholder="Type here"></textarea>
          </div>
          <div className="form-group">
            <label>Image</label>
            <input type="file" onChange={handleImageChange} />
            <div className="image-preview">
              {product.images && <img src={product.images} alt="Product" />}
            </div>
            <input type="text" value={product.images} onChange={(e) => handleImageUrl(e.target.value)} placeholder="Nhập link ảnh" />
          </div>
          <button type="submit" className="submit-button">Add Product</button>
        </form>
      </div>
    </div>
  );
}
