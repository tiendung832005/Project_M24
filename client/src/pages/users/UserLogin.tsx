import React, { useEffect, useState } from 'react';
import "../scss/userLogin.scss";
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
    <div>
            <section className="user-login-container forms-container">
                <div className="form login-form">
                    <div className="form-content">
                        <header>Đăng nhập</header>
                        <form action="#" id="formLogin" onSubmit={handleLogin}>
                            <div className="field input-field">
                                <input type="email" placeholder="Email" className="input" id="email" />
                            </div>

                            <div className="field input-field">
                                <input type="password" placeholder="Password" className="password-input" id="password" />
                                <i className="bx bx-hide eye-icon"></i>
                            </div>

                            <div className="form-link">
                                <a href="#" className="forgot-pass">Quên mật khẩu?</a>
                            </div>

                            <div className="field button-field">
                                <button type="submit">Đăng nhập</button>
                            </div>
                        </form>

                        <div className="form-link">
                            <span>Chưa có tài khoản? <NavLink to={'/userRegister'}> Đăng ký</NavLink></span>
                        </div>
                    </div>

                    <div className="line-divider"></div>

                    <div className="media-options">
                        <a href="#" className="field facebook">
                            <i><FaFacebook /></i>
                            <span>Login with Facebook</span>
                        </a>
                    </div>

                    <div className="media-options">
                        <a href="#" className="field google">
                            <i><FaGoogle /></i>
                            <span>Login with Google</span>
                        </a>
                    </div>
                </div>
            </section>
        </div>
  );
}
