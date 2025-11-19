import React from 'react'
import { db } from './Firebase'
import { collection, addDoc } from 'firebase/firestore'

function Pp() {
 
    const addProduct=async()=>{
        try {
            const docRef = await addDoc(collection(db, "test"), {
                name: "Sample Product",
                price: 29.99,
                description: "This is a sample product description."
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

  return (
    <div>
      <button onClick={addProduct} >Add Product</button>
    </div>
  )
}

export default Pp
