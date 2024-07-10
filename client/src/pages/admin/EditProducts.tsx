import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { NavLink } from 'react-router-dom';

export default function EditProducts() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [product, setProduct] = useState({
    name: '',
    price: '',
    status: 'available',
    description: '',
    category: '',
  });
  const { id } = useParams<{ id: string }>(); // Lấy id từ URL
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    // Fetch sản phẩm dựa trên id từ server
    fetch(`http://localhost:8080/products/${id}`)
      .then(response => response.json())
      .then(data => setProduct(data))
      .catch(error => console.error('Error fetching product:', error));
  }, [id]); // Thay đổi id sẽ trigger useEffect này

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
          console.error('Error updating product');
        }
      })
      .catch(error => console.error('Error updating product:', error));
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
                <input type="text" name="category" value={product.category} onChange={handleChange} placeholder="Nhập danh mục sản phẩm" />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select name="status" value={product.status} onChange={handleChange}>
                <option value="available">Còn hàng</option>
                <option value="out_of_stock">Sắp hết hàng</option>
                <option value="preorder">Bán hết</option>
              </select>
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea name="description" value={product.description} onChange={handleChange} placeholder="Type here"></textarea>
            </div>
            <button type="submit" className="submit-button">Edit Product</button>
          </form>
        </div>
      </div>
    </div>
  );
}
