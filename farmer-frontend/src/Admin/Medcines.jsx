import React, { useState, useEffect } from "react";
import { db } from "../Firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";

const Medicines = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [products, setProducts] = useState([]);

  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    manufacturer: "",
    expiryDate: "",
    imageUrl: "",
  });

  // ✅ Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Fetch all products
  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsArray);
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("Failed to load products data.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newProduct = {
        ...product,
        price: Number(product.price),
        stock: Number(product.stock),
        status: "active",
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "products"), newProduct);

      alert("✅ Product added successfully!");
      setShowAddForm(false);
      setProduct({
        name: "",
        category: "",
        price: "",
        stock: "",
        manufacturer: "",
        expiryDate: "",
        imageUrl: "",
      });
      fetchProducts(); // auto refresh
    } catch (error) {
      console.error("Error adding product:", error);
      alert("❌ Failed to add product");
    }
  };

  // ✅ Filter products based on search
  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.manufacturer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Products Management</h1>
        <p className="text-gray-600">Manage all product data</p>
      </div>

      {/* Search + Add Button */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-green-800 text-white px-4 py-2 rounded-lg hover:bg-green-900"
        >
          {showAddForm ? "Close Form" : "Add Product"}
        </button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow border mb-6">
          <h2 className="text-xl font-bold mb-4">Add New Product</h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input
              type="text"
              placeholder="Product Name"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="text"
              placeholder="Category"
              name="category"
              value={product.category}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="number"
              placeholder="Price (₹)"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="number"
              placeholder="Stock Quantity"
              name="stock"
              value={product.stock}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="text"
              placeholder="Manufacturer"
              name="manufacturer"
              value={product.manufacturer}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="date"
              name="expiryDate"
              value={product.expiryDate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="text"
              placeholder="Image URL"
              name="imageUrl"
              value={product.imageUrl}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg md:col-span-2"
              required
            />

            <div className="md:col-span-2 flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-800 text-white px-4 py-2 rounded-lg hover:bg-green-900"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow border mt-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left text-sm font-medium text-gray-700">Image</th>
                <th className="p-3 text-left text-sm font-medium text-gray-700">Name</th>
                <th className="p-3 text-left text-sm font-medium text-gray-700">Category</th>
                <th className="p-3 text-left text-sm font-medium text-gray-700">Price</th>
                <th className="p-3 text-left text-sm font-medium text-gray-700">Stock</th>
                <th className="p-3 text-left text-sm font-medium text-gray-700">Manufacturer</th>
                <th className="p-3 text-left text-sm font-medium text-gray-700">Expiry Date</th>
                <th className="p-3 text-left text-sm font-medium text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="border-t hover:bg-gray-50">
                    <td className="p-3">
                      {product.imageUrl ? (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="h-12 w-12 object-cover rounded"
                        />
                      ) : (
                        <span className="text-gray-400">No Image</span>
                      )}
                    </td>
                    <td className="p-3">{product.name}</td>
                    <td className="p-3 text-gray-600">{product.category}</td>
                    <td className="p-3 text-gray-600">₹{product.price}</td>
                    <td className="p-3 text-gray-600">{product.stock}</td>
                    <td className="p-3 text-gray-600">{product.manufacturer}</td>
                    <td className="p-3 text-gray-600">{product.expiryDate}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          product.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="p-3 text-center text-gray-500">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Medicines;
