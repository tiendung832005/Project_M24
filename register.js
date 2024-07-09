
const forms = document.querySelector(".forms"),
      pwShowHide = document.querySelectorAll(".eye-icon"),
      links = document.querySelectorAll(".link");

pwShowHide.forEach(eyeIcon => {
    eyeIcon.addEventListener("click", () => {
        let pwFields = eyeIcon.parentElement.parentElement.querySelectorAll(".password");
        
        pwFields.forEach(password => {
            if(password.type === "password"){
                password.type = "text";
                eyeIcon.classList.replace("bx-hide", "bx-show");
                return;
            }
            password.type = "password";
            eyeIcon.classList.replace("bx-show", "bx-hide");
        })
    })
})      

links.forEach(link => {
    link.addEventListener("click", e => {
       e.preventDefault(); //preventing form submit
       forms.classList.toggle("show-signup");
    })
});

//Lấy ra elements của trang
const formRegister = document.getElementById("formRegister");
const userNameElement = document.getElementById("name");
const emailElement = document.getElementById("email");
const passwordElement = document.getElementById("password");
const rePasswordElement = document.getElementById("rePassword");
const addressElement = document.getElementById("address");

//Element liên quan đến lỗi
const userNameError = document.getElementById("userNameError");
const userEmailError = document.getElementById("userEmailError");
const passwordError = document.getElementById("passwordError");
const rePasswordError = document.getElementById("rePasswordError");

//Lấy dữ liệu từ localStorage
let userLocal = JSON.parse(localStorage.getItem("users")) || [];


// Lắng nghe sự kiện submit form đăng kí tài khoản
formRegister.addEventListener("submit", function(e){
    //Ngăn chặn sự kiện load lại trang
    e.preventDefault();

    // Validate dữ liệu đầu vào
    if (!userNameElement.value){
       //HIển thị lỗi
       userNameError.style.display = "block";
    }else{
        //Ẩn lỗi
       userNameError.style.display = "none";

    }

    // Validate dữ liệu đầu vào
    if (!emailElement.value){
        //HIển thị lỗi
        userEmailError.style.display = "block";
     }else{
         //Ẩn lỗi
         userEmailError.style.display = "none";
 
     }
    // Validate dữ liệu đầu vào
    if (!emailElement.value){
        //HIển thị lỗi
        userEmailError.style.display = "block";
     }else{
         //Ẩn lỗi
         userEmailError.style.display = "none";
 
     }

    // Validate dữ liệu đầu vào
    if (!passwordElement.value){
        //HIển thị lỗi
        passwordError.style.display = "block";
     }else{
         //Ẩn lỗi
         passwordError.style.display = "none";
 
     }

    // Validate dữ liệu đầu vào
    if (!rePasswordElement.value){
        //HIển thị lỗi
        rePasswordError.style.display = "block";
     }else{
         //Ẩn lỗi
         rePasswordError.style.display = "none";
 
     }

     //Kiểm tra mật khẩu nhập lại
     if(passwordElement.value !== rePasswordElement.value){
        rePasswordError.style.display = "block";
        rePasswordError.innerHTML = "Mật khẩu không khớp";
     }

     //Gửi dữ liệu từ form lên localStorage
     if(userNameElement.value && emailElement.value && passwordElement.value && 
        rePasswordElement.value && 
        passwordElement.value === rePasswordElement.value 
        ){
        // Lấy dữ liệu từ form gộp thành đối tượng user
        const user={
            userId: Math.ceil(Math.random() * 1000000000),
            name: userNameElement.value,
            email: emailElement.value,
            password: passwordElement.value,
            address: addressElement.value,
            cart: []
        };

        // Lấy dữ liệu từ localStorage
        const userLocalString = localStorage.getItem("users");
        let userLocal = userLocalString ? JSON.parse(userLocalString) : [];

        // Kiểm tra và khởi tạo nếu cần
        if(!Array.isArray(userLocal)){
            userLocal = [];
        }

        //Pusu user vào trong mảng userLocal
        userLocal.push(user);

        //Lưu dữ liệu lên local
        localStorage.setItem("users", JSON.stringify(userLocal)) ;
        

    //Chuyển hướng về trang đăng nhập 
    setTimeout(function(){
        window.location.href = "login.html"
    }, 1000)
     }

});

