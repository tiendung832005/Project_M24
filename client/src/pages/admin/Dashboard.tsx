import React, { useState } from 'react';
import Header from './Header';
import Home from './Home';
import Sidebar from './Sidebar';
import "../scss/adminDashboard.scss";


export default function Dashboard(): JSX.Element {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="grid-container1">
      <Sidebar openSidebarToggle={sidebarOpen} OpenSidebar={toggleSidebar} />
      <Header OpenSidebar={toggleSidebar} />
      <Home />
    </div>
  );
}
