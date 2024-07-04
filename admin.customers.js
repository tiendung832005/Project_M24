var customers = [];
var customerCount = 0;

// Hàm để lấy dữ liệu người dùng từ local storage
function getUsersFromLocalStorage() {
  var usersData = localStorage.getItem("users");
  if (usersData) {
    customers = JSON.parse(usersData);
    customerCount = customers.length;
    displayCustomers();
  }
}

// Gọi hàm này khi trang được tải
window.onload = getUsersFromLocalStorage;

// Thêm khách hàng
function addCustomer() {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var address = document.getElementById("address").value;

  if (name === "" || email === "" || address === "") {
    alert("Vui lòng điền đầy đủ thông tin của khách hàng.");
    return;
  }

  var customer = {
    id: ++customerCount,
    name: name,
    email: email,
    address: address,
    banned: false,
  };

  customers.push(customer);
  saveCustomersToLocalStorage(); // Lưu dữ liệu người dùng vào local storage
  displayCustomers();

  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("address").value = "";
}

// Ẩn hiện phần thêm khách hàng
function toggleAddCustomerSection() {
  var addCustomerSection = document.getElementById("addCustomerSection");
  if (addCustomerSection.style.display === "none") {
    addCustomerSection.style.display = "block";
  } else {
    addCustomerSection.style.display = "none";
  }
}

// Hàm để lưu dữ liệu người dùng vào local storage
function saveCustomersToLocalStorage() {
  localStorage.setItem("users", JSON.stringify(customers));
}

function displayCustomers() {
  var tableBody = document.getElementById("customerTable");
  tableBody.innerHTML = "";

  for (var i = 0; i < customers.length; i++) {
    var customer = customers[i];
    var row = "<tr>";
    row += "<td>" + (i + 1) + "</td>";
    row += "<td>" + customer.name + "</td>";
    row += "<td>" + customer.email + "</td>";
    row += "<td>" + customer.address + "</td>";
    row += "<td>" + (customer.banned ? "Đã khóa" : "Hoạt động") + "</td>";
    row +=
      "<td><button onclick='toggleBan(" +
      i +
      ")'>" +
      (customer.banned ? "Unban" : "Ban") +
      "</button></td>";
    row += "</tr>";
    tableBody.innerHTML += row;
  }
}

function toggleBan(index) {
  customers[index].banned = !customers[index].banned;
  saveCustomersToLocalStorage(); // Lưu dữ liệu sau khi thay đổi vào local storage
  displayCustomers();
}
