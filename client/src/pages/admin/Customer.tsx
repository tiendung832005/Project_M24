import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "../scss/adminCustomers.scss"
interface Customer {
  id: number;
  name: string;
  email: string;
  address: string;
  banned: boolean;
}

export default function Customer() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [customerCount, setCustomerCount] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [showAddCustomerSection, setShowAddCustomerSection] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Hàm để lấy dữ liệu người dùng từ local storage
  useEffect(() => {
    const usersData = localStorage.getItem('users');
    if (usersData) {
      const users: Customer[] = JSON.parse(usersData);
      setCustomers(users);
      setCustomerCount(users.length);
    }
  }, []);

  // Hàm để lưu dữ liệu người dùng vào local storage
  const saveCustomersToLocalStorage = (customers: Customer[]) => {
    localStorage.setItem('users', JSON.stringify(customers));
  };

  const addCustomer = () => {
    if (name === '' || email === '' || address === '') {
      alert('Vui lòng điền đầy đủ thông tin của khách hàng.');
      return;
    }

    const newCustomer: Customer = {
      id: customerCount + 1,
      name,
      email,
      address,
      banned: false,
    };

    const updatedCustomers = [...customers, newCustomer];
    setCustomers(updatedCustomers);
    setCustomerCount(updatedCustomers.length);
    saveCustomersToLocalStorage(updatedCustomers);

    setName('');
    setEmail('');
    setAddress('');
  };

  const toggleAddCustomerSection = () => {
    setShowAddCustomerSection(!showAddCustomerSection);
  };

  const toggleBan = (index: number) => {
    const updatedCustomers = customers.map((customer, i) =>
      i === index ? { ...customer, banned: !customer.banned } : customer
    );
    setCustomers(updatedCustomers);
    saveCustomersToLocalStorage(updatedCustomers);
  };

  return (
    
    <div className="container1">
        <Sidebar openSidebarToggle={sidebarOpen} OpenSidebar={toggleSidebar} />
        <div className="customer-list">
        <button className="toggle-btn" onClick={toggleAddCustomerSection}>Ẩn/Hiện</button>
          {showAddCustomerSection && (
            <div className="add-customer" id="addCustomerSection">
              <h2>Thêm Khách hàng mới</h2>
              <input
                type="text"
                id="name"
                placeholder="Tên"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                id="address"
                placeholder="Địa chỉ"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <button onClick={addCustomer}>Thêm</button>
            </div>
          )}
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên</th>
                <th>Email</th>
                <th>Địa chỉ</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody id="customerTable">
              {customers.map((customer, index) => (
                <tr key={customer.id}>
                  <td>{index + 1}</td>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.address}</td>
                  <td>{customer.banned ? 'Đã khóa' : 'Hoạt động'}</td>
                  <td>
                    <button onClick={() => toggleBan(index)}>
                      {customer.banned ? 'Unban' : 'Ban'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    
  );
}
