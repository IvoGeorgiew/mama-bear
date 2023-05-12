import React, { useState } from "react";
import styled from "styled-components";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 } from "uuid";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function NewProductForm() {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("Mama");
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleCategoryChange = (event) => {
    setProductCategory(event.target.value);
  };

  const uploadFile = () => {
    if (imageUpload) {
      const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
      return uploadBytes(imageRef, imageUpload).then((snapshot) => {
        return getDownloadURL(snapshot.ref).then((url) => {
          setImageUrl(url);
          return url;
        });
      });
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageUpload(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Checks for empty fields
    if (imageUpload === null) {
      window.alert("No image selected.");
      return;
    }
    let fields = [productName, productPrice, productCategory];
    for (let i = 0; i < fields.length; i++) {
      if (fields[i].length < 1) {
        window.alert("Fields cannot be empty.");
        return;
      }
    }

    // Upload image to Firebase Storage
    try {
      const imageUrl = await uploadFile();

      // Add product to Firestore
      const docRef = await addDoc(collection(db, "products"), {
        id: v4(),
        name: productName,
        price: productPrice,
        category: productCategory,
        imageUrl: imageUrl,
      });
      window.alert("Product Added!");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <FormStyle onSubmit={handleSubmit}>
      <h1>Add new Product here:</h1>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label>
          Name:
          <InputStyle
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </label>
        <label>
          Price:
          <InputStyle
            type="text"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
        </label>
        <label>
          Category:
          <SelectStyle value={productCategory} onChange={handleCategoryChange}>
            <option value="Mama">Mama</option>
            <option value="Bebe">Bebe</option>
            <option value="Bear">Bear</option>
          </SelectStyle>
        </label>
        <label>
          Image:
          <InputStyle type="file" onChange={handleImageChange} />
        </label>
        <ButtonStyle>Add</ButtonStyle>
      </div>
    </FormStyle>
  );
}

const FormStyle = styled.form`
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
  background-color: skyblue;
  padding-top: 5rem;
  padding-bottom: 5rem;
  padding-left: 2rem;
  padding-right: 2rem;
  border-radius: 10%;
  font-family: Courier New;
`;

const InputStyle = styled.input`
  height: 1.2rem;
  margin-bottom: 0.5rem;
  margin-left: 1rem;
  font-family: Courier New;
  font-size: 1.1rem;
`;

const ButtonStyle = styled.button`
  margin-top: 1rem;
  background: transparent;
  border: 1;
  color: black;
  cursor: pointer;
  font-family: Courier New;
  font-size: 1.5rem;
  font-weight: 500;
  padding: 1em 1em;
  position: relative;
`;

const SelectStyle = styled.select`
  height: 2rem;
  margin-top: 2rem;
  font-size: 1.5rem;
  font-family: Courier New;
`;

export default NewProductForm;
