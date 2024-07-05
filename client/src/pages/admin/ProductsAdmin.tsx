import React, { useState } from 'react'
import  "../scss/adminProducts.scss"
import Sidebar from './Sidebar';
export default function ProductsAdmin() {
        const products = [
          { id: '39842-231', name: 'Macbook Pro 15"', status: 'Available', category: 'Laptops', price: '$ 2,999.00', date: '20 Jan, 2022' },
          { id: '39842-231', name: 'Macbook Pro 13"', status: 'In Review', category: 'Laptops', price: '$ 2,999.00', date: '22 Feb, 2022' },
          { id: '39842-231', name: 'iPhone 13 Mini', status: 'Sold Out', category: 'Phones', price: '$ 2,999.00', date: '22 Feb, 2022' },
          { id: '39842-231', name: 'iPhone 14', status: 'Preorder', category: 'Phones', price: '$ 2,999.00', date: '22 Feb, 2022' },
          { id: '39842-231', name: 'AirPods 2', status: 'Available', category: 'Electronics', price: '$ 2,999.00', date: '22 Feb, 2022' }
        ];
        const [sidebarOpen, setSidebarOpen] = useState(false);

        const toggleSidebar = () => {
          setSidebarOpen(!sidebarOpen);
        };
  //       const history = unstable_HistoryRouter();

  // const handleAddProduct = () => {
  //   history.push('/add-product');
  // };
  return (
  <div className='container'>
      <Sidebar openSidebarToggle={sidebarOpen} OpenSidebar={toggleSidebar} />
    <div className="product-table">
      <div className="header">
        <h1>Products</h1>
        <button className="add-product" >+ Add Product</button>
      </div>
      <div className="product-table-select">sắp xếp theo:
                <select className="product-table-select-option" name="" id="">
                    <option value="">Id</option>
                    <option value="">Name</option>
                    <option value="">Price</option>
                </select>
            </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Category</th>
            <th>Price</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.status}</td>
              <td>{product.category}</td>
              <td>{product.price}</td>
              <td>{product.date}</td>
              <td>
                <button className="view-btn">View</button>
                <button className="edit-btn">Edit</button>
                <button className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>4</button>
        <button>5</button>
        <span>...</span>
        <button>20</button>
      </div>
    </div>
  </div>
  )
}
