import { useState } from 'react'
import Header from './pages/admin/Header'
import Sidebar from './pages/admin/Sidebar'
import Home from './pages/admin/Home'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ProductsAdmin from './pages/admin/ProductsAdmin';
import ".//pages/scss/adminProducts.scss"
export default function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  return (
    // <div style={{
    //   display: 'grid',
    //   gridTemplateColumns: '260px 1fr 1fr 1fr',
    //   gridTemplateRows: '0.2fr 3fr',
    //   gridTemplateAreas: `
    //     'sidebar header header header'
    //     'sidebar main main main'
    //   `,
    //   height: '100vh'
    // }}>
    //   <Header OpenSidebar={OpenSidebar}></Header>
    //   <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}></Sidebar>
    //   <Home></Home>
    // </div>
    <div>
      <div className="app">
      <aside className="sidebar">
        <h2>Rikkei Academy</h2>
        <nav>
          <ul>
            <li>Dashboard</li>
            <li>Products</li>
            <li>Orders</li>
            <li>Customers</li>
            <li>Settings</li>
          </ul>
        </nav>
        <div className="footer">
          <p>Help</p>
          <p>Contact us</p>
          <p>Log out</p>
        </div>
      </aside>
      <main>
        <ProductsAdmin />
      </main>
    </div>
    </div>
  )
}