import React, { useState, useEffect } from 'react';
import "../scss/adminProducts.scss";
import Sidebar from './Sidebar';
import { NavLink } from 'react-router-dom';
import { Product } from "../../interfaces/productsAdmin";

export default function ProductsAdmin() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const fetchProducts = () => {
    fetch('http://localhost:8080/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = (id: number) => {
    fetch(`http://localhost:8080/products/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          fetchProducts();
        } else {
          console.error('Error deleting product');
        }
      })
      .catch(error => console.error('Error deleting product:', error));
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);

  return (
    <div className='container1'>
      <Sidebar openSidebarToggle={sidebarOpen} OpenSidebar={toggleSidebar} />
      <div className="product-table">
        <div className="header">
          <h1>Sản phẩm</h1>
          <button className="add-product">
            <NavLink className="add-product" to={'/addProducts'}>+ Thêm sản phẩm</NavLink>
          </button>
        </div>
        <div className="product-table-select">Sắp xếp theo:
          <select className="product-table-select-option" name="" id="">
            <option value="">ID</option>
            <option value="">Tên</option>
            <option value="">Giá</option>
          </select>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên</th>
              <th>Trạng thái</th>
              <th>Danh mục</th>
              <th>Giá</th>
              <th>Ngày</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(currentItems) && currentItems.length > 0 ? (
              currentItems.map((product, index) => (
                <tr key={index}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.status ? 'Còn hàng' : 'Hết hàng'}</td>
                  <td>{product.category}</td>
                  <td>{product.price}</td>
                  <td>{product.date}</td>
                  <td>
                    <button className="view-btn">Xem</button>
                    <button className="edit-btn">
                      <NavLink className="edit-btn" to={`/editProducts/${product.id}`}>Chỉnh sửa</NavLink>
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(product.id)}>Xóa</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7}>Không có sản phẩm nào</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="pagination">
          {Array.from({ length: Math.ceil(products.length / itemsPerPage) }, (_, index) => (
            <button key={index + 1} onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
