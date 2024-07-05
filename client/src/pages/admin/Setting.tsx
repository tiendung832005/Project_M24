import { useState } from "react";
import Sidebar from "./Sidebar";


export default function Setting() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <div>Setting
      <Sidebar openSidebarToggle={sidebarOpen} OpenSidebar={toggleSidebar} />

    </div>
  )
}
