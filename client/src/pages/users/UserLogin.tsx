import React from 'react'

export default function UserLogin() {
  return (
    <div>
        <section className="container forms">
      <div className="form login">
        <div className="form-content">
          <header>Đăng nhập</header>
          <form action="#" id="formLogin">
            <div className="field input-field">
              <input type="email" placeholder="Email" className="input" id="email" />
            </div>

            <div className="field input-field">
              <input type="password" placeholder="Password" className="password" id="password" />
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
            <span>
              Chưa có tài khoản?
              <a href="../pages/register.html" className="">Đăng kí</a>
            </span>
          </div>
        </div>

        <div className="line"></div>

        <div className="media-options">
          <a href="#" className="field facebook">
            <i className="bx bxl-facebook facebook-icon"></i>
            <span>Đăng nhập với Facebook</span>
          </a>
        </div>

        <div className="media-options">
          <a href="#" className="field google">
            <img src="bx bxl-google google-icon" alt="" className="google-img" />
            <span>Đăng nhập với Google</span>
          </a>
        </div>
      </div>
    </section>
    </div>
  )
}
