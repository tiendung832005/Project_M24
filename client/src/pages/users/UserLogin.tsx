import React, { useEffect, useState } from 'react';

import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import axios from 'axios';


export default function UserLogin() {
  const [users, setUsers] = useState([]);

    useEffect(() => {
        // Gửi yêu cầu GET để lấy dữ liệu người dùng từ db.json
        axios.get('http://localhost:8080/users')
            .then(response => {
                setUsers(response.data); // Lưu dữ liệu người dùng vào state
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []); // Chỉ gửi yêu cầu khi component được mount lần đầu tiên

    // Xử lý sự kiện submit form
    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      const email = (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value;
      const password = (e.currentTarget.elements.namedItem('password') as HTMLInputElement).value;
  
      const findUser = users.find((user: { email: string, password: string }) => 
          user.email === email && user.password === password
      );
  
      if (!findUser) {
          alert("Email hoặc mật khẩu không đúng");
      } else {
          localStorage.setItem("userLogin", JSON.stringify(findUser));
          window.location.href = "http://localhost:5173/home";
      }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1d2634]">
  <section className="max-w-lg w-full p-8 rounded-lg bg-gray-700">
    <div className="form-content">
      <header className="text-2xl font-semibold text-gray-100 text-center mb-6">Đăng nhập</header>
      <form action="#" id="formLogin" onSubmit={handleLogin}>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="email"
          />
        </div>

        <div className="mb-4 relative">
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="password"
          />
          <i className="absolute top-1/2 right-3 transform -translate-y-1/2 text-white cursor-pointer"></i>
        </div>

        <div className="text-center mb-4">
          <a href="#" className="text-blue-400 hover:underline">Quên mật khẩu?</a>
        </div>

        <div className="mb-6">
          <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Đăng nhập</button>
        </div>
      </form>

      <div className="text-center mb-4">
        <span className="text-gray-100">
          Chưa có tài khoản?
          <NavLink to={'/userRegister'} className="text-blue-400 hover:underline"> Đăng ký</NavLink>
        </span>
      </div>
    </div>

    <div className="relative h-1 bg-gray-400 mb-6">
      <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-700 text-gray-300 px-3">Or</span>
    </div>

    <div className="flex flex-col gap-4">
      <a href="#" className="flex items-center justify-center gap-4 bg-blue-600 text-white py-2 rounded">
        <FaFacebook className="text-2xl" />
        <span>Login with Facebook</span>
      </a>

      <a href="#" className="flex items-center justify-center gap-4 border border-gray-300 bg-white py-2 rounded">
        <FaGoogle className="text-2xl text-red-500" />
        <span className="text-gray-700">Login with Google</span>
      </a>
    </div>
  </section>
</div>

  );
}
