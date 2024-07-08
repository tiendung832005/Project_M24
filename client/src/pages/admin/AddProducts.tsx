import React, { useState } from 'react'
import "../scss/addProducts.scss"
import Sidebar from './Sidebar';
import { NavLink } from 'react-router-dom';
export default function AddProducts() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <div className='container'>
      <Sidebar openSidebarToggle={sidebarOpen} OpenSidebar={toggleSidebar} />
    <div className="add-product-page">
            <button className="back-button">
          <NavLink className="back-button" to={'/Products'}>Back</NavLink>
            </button>
            <h1>Add Product</h1>
            <form className="add-product-form">
                <div className="form-group">
                    <label>Product Name</label>
                    <input type="text" placeholder="Iphone 15 pro max" />
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input type="text" placeholder="$ 899.00" />
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
                <button type="submit" className="submit-button">Add Product</button>
            </form>
        </div>
    </div>
  )
}
