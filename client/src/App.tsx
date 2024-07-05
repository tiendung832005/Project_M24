import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductsAdmin from './pages/admin/ProductsAdmin';
import AddProducts from './pages/admin/AddProducts';
import Order from './pages/admin/Order';
import Setting from './pages/admin/Setting';
import Customer from './pages/admin/Customer';
import Dashboard from './pages/admin/Dashboard';
import LoginAdmin from './pages/admin/LoginAdmin';
export default function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  return (
    <div>
          {/* <Routes>
        
            <Route path='/' element={<Dashboard/>}></Route>
            <Route path='/Dashboard' element={<Dashboard/>}></Route>
            <Route path='/Products' element={<ProductsAdmin/>}></Route>
            <Route path='/AddProducts' element={<AddProducts/>}></Route>
            <Route path='/Customer' element={<Customer/>}></Route>
            <Route path='/Order' element={<Order/>}></Route>
            <Route path='/Setting' element={<Setting/>}></Route>
          </Routes>  */}
          
          <Routes>
            <Route path="/loginAdmin" element={<LoginAdmin />} />
            <Route path='/Dashboard' element={<Dashboard/>}></Route>
            <Route path='/Products' element={<ProductsAdmin/>}></Route>
            <Route path='/AddProducts' element={<AddProducts/>}></Route>
            <Route path='/Customer' element={<Customer/>}></Route>
            <Route path='/Order' element={<Order/>}></Route>
            <Route path='/Setting' element={<Setting/>}></Route>
          </Routes>
    </div>
  )
}