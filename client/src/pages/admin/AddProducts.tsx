
import "../scss/addProducts.scss"
export default function AddProducts() {
  return (
    <div className="add-product-container">
      <div className="add-product-header">
        <h1>Products</h1>
      </div>
      <div className="add-product-form">
        <div className="form-group">
          <label>Product Name</label>
          <input type="text" name="productName" />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input type="text" name="price" />
        </div>
        <div className="form-group">
          <label>Mã sản phẩm</label>
          <input type="text" name="productCode" />
        </div>
        <div className="form-group">
          <label>Status</label>
          <select name="status">
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>
        </div>
        <div className="form-group">
          <label>Image</label>
          <input type="file" name="image" />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea name="description"></textarea>
        </div>
        <button type="submit">Add Product</button>
      </div>
    </div>
  )
}
