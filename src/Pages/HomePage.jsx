import React from "react";
import { db, storage } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { ref, getDownloadURL } from "firebase/storage";

function HomePage() {
  const getProducts = async () => {
    const querySnapshot = await db.collection("products").get();
    const products = querySnapshot.docs.map((doc) => doc.data());
    console.log("@@@@");
    return console.log(products);
  };

  const addProduct = async () => {
    try {
      const docRef = await addDoc(collection(db, "products"), {
        name: "Ada",
        price: "20.00",
        img: "12345123",
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const imageRef = ref(storage, "images/first");
    getDownloadURL(imageRef)
      .then((url) => {
        setImageUrl(url);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <div>Helloooo</div>
      <button onClick={getProducts}>Click me for data</button>
      <button onClick={addProduct}>Click me to add</button>
      {imageUrl ? <img src={imageUrl} alt="A description" /> : null}
    </div>
  );
}

export default HomePage;
