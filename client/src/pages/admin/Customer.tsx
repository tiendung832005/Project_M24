import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "../scss/adminCustomers.scss";

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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Hàm để lấy dữ liệu người dùng từ server
  useEffect(() => {
    fetch("http://localhost:8080/users")
      .then((response) => response.json())
      .then((data) => {
        const users: Customer[] = data;
        setCustomers(users);
        setCustomerCount(users.length);
      })
      .catch((error) => console.error("Error fetching customers:", error));
  }, []);

  // Hàm để lưu dữ liệu người dùng vào server
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

    fetch("http://localhost:8080/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCustomer),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedCustomers = [...customers, data];
        setCustomers(updatedCustomers);
        setCustomerCount(updatedCustomers.length);
      })
      .catch((error) => console.error("Error adding customer:", error));

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

    const updatedCustomer = updatedCustomers[index];
    fetch(`http://localhost:8080/users/${updatedCustomer.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedCustomer),
    }).catch((error) => console.error("Error updating customer:", error));
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = customers.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber:any) => setCurrentPage(pageNumber);

  return (
    <div className="container1">
      <Sidebar openSidebarToggle={sidebarOpen} OpenSidebar={toggleSidebar} />
      <div className="customer-list">
        <button className="toggle-btn" onClick={toggleAddCustomerSection}>
          Ẩn/Hiện
        </button>
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
              <th>Trạng thái</th>
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
        <div className="pagination">
          {Array.from({ length: Math.ceil(customers.length / itemsPerPage) }, (_, index) => (
            <button key={index + 1} onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
