import React, { useState, useRef } from 'react';

import { FaFacebook, FaGoogle } from "react-icons/fa";
import { NavLink } from 'react-router-dom';

export default function UserRegister() {
  const formRegisterRef = useRef<HTMLFormElement | null>(null);
  const userNameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const rePasswordRef = useRef<HTMLInputElement | null>(null);
  const addressRef = useRef<HTMLInputElement | null>(null);

  const [userNameError, setUserNameError] = useState<string>('');
  const [userEmailError, setUserEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [rePasswordError, setRePasswordError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let hasError = false;

    if (!userNameRef.current?.value) {
      setUserNameError('Tên không được để trống');
      hasError = true;
    } else {
      setUserNameError('');
    }

    if (!emailRef.current?.value) {
      setUserEmailError('Email không được để trống');
      hasError = true;
    } else {
      setUserEmailError('');
    }

    if (!passwordRef.current?.value) {
      setPasswordError('Mật khẩu không được để trống');
      hasError = true;
    } else {
      setPasswordError('');
    }

    if (!rePasswordRef.current?.value) {
      setRePasswordError('Mật khẩu không được để trống');
      hasError = true;
    } else if (passwordRef.current?.value !== rePasswordRef.current?.value) {
      setRePasswordError('Mật khẩu không khớp');
      hasError = true;
    } else {
      setRePasswordError('');
    }

    if (!hasError) {
      const newUser = {
        id: Math.ceil(Math.random() * 1000000000),
        name: userNameRef.current?.value,
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
        address: addressRef.current?.value,
        status: false,
        phone: '',
        created_at: new Date().toLocaleDateString(),
        updated_at: new Date().toLocaleDateString(),
      };

      try {
        const response = await fetch('http://localhost:8080/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUser),
        });

        if (response.ok) {
          setTimeout(() => {
            window.location.href = "http://localhost:5173/userLogin";
          }, 1000);
        } else {
          console.error('Failed to save user');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const togglePasswordVisibility = (e: React.MouseEvent) => {
    const eyeIcon = e.currentTarget as HTMLElement;
    const passwordFields = eyeIcon.closest('.field')?.querySelectorAll('.password');

    passwordFields?.forEach(password => {
      if (password.getAttribute('type') === 'password') {
        password.setAttribute('type', 'text');
        eyeIcon.classList.replace("bx-hide", "bx-show");
      } else {
        password.setAttribute('type', 'password');
        eyeIcon.classList.replace("bx-show", "bx-hide");
      }
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1d2634]">
  <section className="max-w-lg w-full p-8 rounded-lg bg-gray-700">
    <div className="form-content">
      <header className="text-2xl font-semibold text-gray-100 text-center mb-6">Đăng kí</header>
      <form id="formRegister" ref={formRegisterRef} onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Họ và tên"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            ref={userNameRef}
          />
          {userNameError && (
            <div className="text-red-500">{userNameError}</div>
          )}
        </div>

        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            ref={emailRef}
          />
          {userEmailError && (
            <div className="text-red-500">{userEmailError}</div>
          )}
        </div>

        <div className="mb-4">
          <input
            type="password"
            placeholder="Nhập mật khẩu"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            ref={passwordRef}
          />
          {passwordError && (
            <div className="text-red-500">{passwordError}</div>
          )}
        </div>

        <div className="mb-4 relative">
          <input
            type="password"
            placeholder="Nhập lại mật khẩu"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            ref={rePasswordRef}
          />
          {rePasswordError && (
            <div className="text-red-500">{rePasswordError}</div>
          )}
          <i className="absolute top-1/2 right-3 transform -translate-y-1/2 text-white cursor-pointer" onClick={togglePasswordVisibility}></i>
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Địa chỉ"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            ref={addressRef}
          />
        </div>

        <div className="mb-6">
          <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Đăng kí</button>
        </div>
      </form>

      <div className="text-center mb-4">
        <span className="text-gray-100">
          Đã có tài khoản?
          <NavLink to={'/userLogin'} className="text-blue-400 hover:underline"> Đăng nhập</NavLink>
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
