import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductsAdmin from './pages/admin/ProductsAdmin';
import Order from './pages/admin/Order';
import Setting from './pages/admin/Setting';
import Customer from './pages/admin/Customer';
import Dashboard from './pages/admin/Dashboard';
import LoginAdmin from './pages/admin/LoginAdmin';
import UserLogin from './pages/users/UserLogin';
import AddProducts from './pages/admin/AddProducts';
import EditProducts from './pages/admin/EditProducts';
import UserRegister from './pages/users/UserRegister';
import UserHome from './pages/users/UserHome';
import ProductDetail from './pages/users/ProductDetail';

export default function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    
      <Routes>
        <Route path="/" element={<LoginAdmin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<ProductsAdmin />} />
        <Route path="/addProducts" element={<AddProducts />} />
        <Route path="/editProducts/:id" element={<EditProducts />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/order" element={<Order />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/userLogin" element={<UserLogin />} />
        <Route path="/userRegister" element={<UserRegister />} />
        <Route path="/home" element={<UserHome />} />
        <Route path="/card/:productId" element={<ProductDetail />} />
      </Routes>
  );
}
