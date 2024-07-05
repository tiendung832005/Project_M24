import { useState } from "react";
import Sidebar from "./Sidebar";


export default function Order() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <div>Order
      <Sidebar openSidebarToggle={sidebarOpen} OpenSidebar={toggleSidebar} />
    </div>
  )
}
