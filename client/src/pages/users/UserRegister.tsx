import React, { useState, useRef } from 'react';
import "../scss/UserRegister.scss";
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
    <div>
      <section className="container forms">
        <div className="form signup">
          <div className="form-content">
            <header>Đăng kí</header>
            <form id="formRegister" ref={formRegisterRef} onSubmit={handleSubmit}>
              <div className="field input-field">
                <input
                  type="text"
                  placeholder="Họ và tên"
                  className="input"
                  ref={userNameRef}
                />
                {userNameError && (
                  <div style={{ color: 'red' }}>{userNameError}</div>
                )}
              </div>

              <div className="field input-field">
                <input
                  type="email"
                  placeholder="Email"
                  className="input"
                  ref={emailRef}
                />
                {userEmailError && (
                  <div style={{ color: 'red' }}>{userEmailError}</div>
                )}
              </div>

              <div className="field input-field">
                <input
                  type="password"
                  placeholder="Nhập mật khẩu"
                  ref={passwordRef}
                  className="password"
                />
                {passwordError && (
                  <div style={{ color: 'red' }}>{passwordError}</div>
                )}
              </div>

              <div className="field input-field">
                <input
                  type="password"
                  placeholder="Nhập lại mật khẩu"
                  className="password"
                  ref={rePasswordRef}
                />
                {rePasswordError && (
                  <div style={{ color: 'red' }}>{rePasswordError}</div>
                )}
                <i className="bx bx-hide eye-icon" onClick={togglePasswordVisibility}></i>
              </div>

              <div className="field input-field">
                <input
                  type="text"
                  placeholder="Địa chỉ"
                  className="input"
                  ref={addressRef}
                />
              </div>

              <div className="field button-field">
                <button type="submit">Đăng kí</button>
              </div>
            </form>

            <div className="form-link">
              <span>
                Đã có tài khoản?
                <NavLink to={'/userLogin'}> Đăng nhập</NavLink>
              </span>
            </div>
          </div>

          <div className="line"></div>

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
