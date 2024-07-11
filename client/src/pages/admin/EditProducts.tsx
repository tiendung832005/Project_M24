import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { NavLink } from 'react-router-dom';

export default function EditProducts() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [product, setProduct] = useState({
    name: '',
    price: '',
    status: '',
    description: '',
    category: '',
    images: '',

  });
  const { id } = useParams<{ id: string }>(); // Lấy id từ URL
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Xử lý file ảnh nếu cần thiết
    }
  };

  const handleImageUrl = (imageUrl: string) => {
    setProduct(prevProduct => ({ ...prevProduct, images: imageUrl }));
  };

  useEffect(() => {
    // Fetch sản phẩm dựa trên id từ server
    fetch(`http://localhost:8080/products/${id}`)
      .then(response => response.json())
      .then(data => setProduct(data))
      .catch(error => console.error('Lỗi khi tìm nạp sản phẩm:', error));
  }, [id]); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProduct(prevProduct => ({ ...prevProduct, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch(`http://localhost:8080/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })
      .then(response => {
        if (response.ok) {
          navigate('/products');
        } else {
          console.error('Lỗi cập nhật sản phẩm');
        }
      })
      .catch(error => console.error('Lỗi cập nhật sản phẩm:', error));
  };

  return (
    <div>
      <div className='container1'>
        <Sidebar openSidebarToggle={sidebarOpen} OpenSidebar={toggleSidebar} />
        <div className="add-product-page">
          <button className="back-button">
            <NavLink className="back-button" to={'/products'}>Back</NavLink>
          </button>
          <h1>Edit Product</h1>
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
              <option value="available">Còn hàng</option>
              <option value="out_of_stock">Sắp hết hàng</option>
              <option value="preorder">Bán hết</option>
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
            <div>
              <input type="text" value={product.images} onChange={(e) => handleImageUrl(e.target.value)} placeholder="Nhập link ảnh" />
            </div>
          </div>
            <button type="submit" className="submit-button">Edit Product</button>
          </form>
        </div>
      </div>
    </div>
  );
}
