import React, { FormEventHandler, useState } from 'react'
import "../scss/loginAdmin.scss"
import { useNavigate } from 'react-router-dom';
export default function LoginAdmin() {
    const [username, setUsername] = useState('admin1');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
   const navigate = useNavigate();

  const handleLogin: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (username === 'admin1' && password === 'admin123') {
        navigate('/Dashboard');
      } else {
        setError('Sai tên đăng nhập hoặc mật khẩu');
      }
    console.log(`Username: ${username}, Password: ${password}`);
  };
  return (
    <div className='containerr'>
    <h1 className="title1">Xin chào Admin</h1>
    <div className="min-h-screen flex-center bg-gray-100">
      <div className="bg-white shadow rounded-lg flex-container">
        <div className="hidden md-block w-half img-container">
          <img
            src="https://gcs.tripi.vn/public-tripi/tripi-feed/img/474063BWt/anh-binh-minh-dep-me-hon-tren-dinh-ta-chi-nhu-yen-bai_093052267.jpg"
            alt="Scenic Canyon"
            className="img"
          />
        </div>
        <div className="p-8 w-full md-half form-container">
          <h2 className="title">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="label">Username</label>
              <input
                type="text"
                placeholder="Nhập tên đăng nhập"
                className="input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="label">Password</label>
              <input
                type="password"
                placeholder="Nhập mật khẩu"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="error">{error}</p>}
            <button type="submit" className="submit-button">Login</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  )
}
