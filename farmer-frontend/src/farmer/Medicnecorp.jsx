import React, { useEffect, useState } from 'react'
import { db } from '../Firebase';
import { addDoc,getDocs,collection } from 'firebase/firestore';

function Medicnecorp() {

  const [products, setProducts] = useState([]);

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
  
  return (
    <div>
      <div className="min-h-screen bg-gray-50 text-gray-900 shadow-md">
        <header className="text-green-600 py-6 ">
        <h1 className="text-4xl font-bold text-center">Medicine and crops</h1>
        </header>

        {/* Cards with medicine price image and description and add to cart btn*/}
        <div className="max-w-6xl mx-auto py-14 px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          {products.map((m, i) => (
        
          <div className="bg-white shadow-md hover:shadow-lg p-5 transition transform hover:-translate-y-1">
            <img
              src={m.imageUrl}
              alt="Medicine 1"
              className="w-full h-auto object-cover mb-4"
            />
            <h3 className="text-lg font-semibold text-green-700">{m.price}₹</h3>
            <p className="mt-1 text-gray-700 text-sm leading-relaxed">
              {m.desc}
            </p>
            <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Add to Cart
            </button>
          </div> ))}
          

        </div>
        
      </div>
    </div>
  )
}

export default Medicnecorp
