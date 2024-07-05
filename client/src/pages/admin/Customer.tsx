import { useState } from "react";
import Sidebar from "./Sidebar";


export default function Customer() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <div>Customer
      <Sidebar openSidebarToggle={sidebarOpen} OpenSidebar={toggleSidebar} />
    </div>
  )
}
