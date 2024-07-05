import React, { useState } from 'react';
import Header from './Header';
import Home from './Home';
import Sidebar from './Sidebar';
import "../scss/adminCustomer.scss";
import { Route, Routes } from 'react-router-dom';
import ProductsAdmin from './ProductsAdmin';
import AddProducts from './AddProducts';

export default function Dashboard(): JSX.Element {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="grid-container">
      <Sidebar openSidebarToggle={sidebarOpen} OpenSidebar={toggleSidebar} />
      <Header OpenSidebar={toggleSidebar} />
      <Home />
    </div>
  );
}
