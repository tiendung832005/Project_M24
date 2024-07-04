const shopee = document.getElementsByClassName("shopee")[0];

// Gán sự kiện click cho thẻ div
shopee.addEventListener("click", load);
function load() {
  window.location.href = "../index.html";
}

//lấy dữ liệu về
let productADM = JSON.parse(localStorage.getItem("products")) || []; // Mặc định là mảng trống nếu không có sản phẩm nào

// Tạo biến lastProductId và gán giá trị là số thứ tự cuối cùng của sản phẩm (nếu có)
let lastProductId =
  productADM.length > 0 ? productADM[productADM.length - 1].id : 0;

// Lặp qua danh sách sản phẩm và hiển thị chúng
for (let i = 0; i < productADM.length; i++) {
  document.getElementById("ADMproduct").innerHTML += `
    <tr>
        <td>${productADM[i].id}</td>
        <td>${productADM[i].name}</td>
        <td><img src="${productADM[i].image}" alt="" width="150px"></td>
        <td>${productADM[i].price}</td>
        <td>${productADM[i].stock}</td>
        <td class="editAll"><button class="button edit" data-id="${productADM[i].id}">Sửa</button> <button class="button delete" data-id="${productADM[i].id}">Xóa</button></td>
    </tr>
    `;
}
// Ẩn hiện phần thêm sản phẩm
function toggleAddProductsSection() {
  var addCustomerSection = document.getElementById("addProductForm");
  if (addCustomerSection.style.display === "none") {
    addCustomerSection.style.display = "block";
  } else {
    addCustomerSection.style.display = "none";
  }
}
// Thêm mới sản phẩm
document
  .getElementById("addProductButton")
  .addEventListener("click", function () {
    let newProduct = {
      id: ++lastProductId,
      name: document.getElementById("productName").value,
      image: document.getElementById("productImage").value,
      price: document.getElementById("productPrice").value,
      stock: document.getElementById("productStock").value,
    };

    productADM.push(newProduct); // Thêm sản phẩm mới vào danh sách
    updateProductList(); // Cập nhật danh sách sản phẩm
    localStorage.setItem("products", JSON.stringify(productADM)); // Lưu danh sách vào local storage

    // Reset giá trị của các trường nhập liệu
    document.getElementById("productName").value = "";
    document.getElementById("productImage").value = "";
    document.getElementById("productPrice").value = "";
    document.getElementById("productStock").value = "";
  });

// Xóa sản phẩm
document
  .getElementById("ADMproduct")
  .addEventListener("click", function (event) {
    if (event.target.classList.contains("delete")) {
      let productId = parseInt(event.target.getAttribute("data-id")); // Chuyển đổi productId thành số
      productADM = productADM.filter((product) => product.id !== productId); // Lọc bỏ sản phẩm có ID tương ứng
      updateProductList(); // Cập nhật danh sách sản phẩm
      localStorage.setItem("products", JSON.stringify(productADM)); // Lưu danh sách vào local storage
    }
  });

// Cập nhật danh sách sản phẩm
function updateProductList() {
  let tableBody = document.getElementById("ADMproduct");
  tableBody.innerHTML = ""; // Xóa nội dung cũ

  for (let i = 0; i < productADM.length; i++) {
    tableBody.innerHTML += `
          <tr>
              <td>${productADM[i].id}</td>
              <td>${productADM[i].name}</td>
              <td><img src="${productADM[i].image}" alt="" width="150px"></td>
              <td>$${productADM[i].price}</td>
              <td>${productADM[i].stock}</td>
              <td class="editAll"><button class="button edit" data-id="${productADM[i].id}">Sửa</button> <button class="button delete" data-id="${productADM[i].id}">Xóa</button></td>
          </tr>
      `;
  }
}
// Sửa sản phẩm
document
  .getElementById("ADMproduct")
  .addEventListener("click", function (event) {
    if (event.target.classList.contains("edit")) {
      let productId = parseInt(event.target.getAttribute("data-id")); // Chuyển đổi productId thành số
      let productIndex = productADM.findIndex(
        (product) => product.id === productId
      ); // Tìm vị trí của sản phẩm trong danh sách

      // Hiển thị thông tin của sản phẩm trong các trường nhập liệu để sửa đổi
      document.getElementById("productName").value =
        productADM[productIndex].name;
      document.getElementById("productImage").value =
        productADM[productIndex].image;
      document.getElementById("productPrice").value =
        productADM[productIndex].price;
      document.getElementById("productStock").value =
        productADM[productIndex].stock;

      // Ẩn hiện phần nhập liệu và chuyển nút "Thêm" thành nút "Lưu"
      toggleAddProductsSection();

      // Gán một sự kiện click cho nút "Lưu" để cập nhật thông tin sản phẩm
      document.getElementById("addProductButton").onclick = function () {
        productADM[productIndex].name =
          document.getElementById("productName").value;
        productADM[productIndex].image =
          document.getElementById("productImage").value;
        productADM[productIndex].price =
          document.getElementById("productPrice").value;
        productADM[productIndex].stock =
          document.getElementById("productStock").value;

        updateProductList(); // Cập nhật danh sách sản phẩm
        localStorage.setItem("products", JSON.stringify(productADM)); // Lưu danh sách vào local storage

        // Chuyển nút "Lưu" thành nút "Thêm" và ẩn phần nhập liệu
        toggleAddProductsSection();
      };
    }
  });
