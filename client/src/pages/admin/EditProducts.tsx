import React, { useState } from 'react'
import Sidebar from './Sidebar';
import { NavLink } from 'react-router-dom';

export default function EditProducts() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
      setSidebarOpen(!sidebarOpen);
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
            <form className="add-product-form">
                <div className="form-group">
                    <label>Product Name</label>
                    <input type="text" placeholder="Nhập tên sản phẩm" />
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input type="text" placeholder="Nhập giá" />
                </div>
                <div className="form-group">
                    <label>Mã sản phẩm</label>
                    <select>
                        {/* <option value="available">Available</option>
                        <option value="out_of_stock">Out of Stock</option>
                        <option value="preorder">Preorder</option> */}
                    </select>
                </div>
                <div className="form-group">
                    <label>Status</label>
                    <select>
                        <option value="available">Available</option>
                        <option value="out_of_stock">Out of Stock</option>
                        <option value="preorder">Preorder</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Image</label>
                    <input type="file" />
                    <div className="image-preview">
                        <div className="image-placeholder"></div>
                        <div className="image-placeholder"></div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea placeholder="Type here"></textarea>
                </div>
                <button type="submit" className="submit-button">Edit Product</button>
            </form>
        </div>
    </div>
    </div>
  )
}
