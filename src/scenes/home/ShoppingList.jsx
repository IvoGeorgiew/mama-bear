import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../../state";
import Item from "../../components/Item";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

// Call this function to get all the products
const ShoppingList = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("all");
  const items = useSelector((state) => state.cart.items);
  const breakPoint = useMediaQuery("(min-width:600px)");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  //   const getItems = async () => {
  //     const querySnapshot = await getDocs(collection(db, "products"));
  //     const products = [];
  //     querySnapshot.forEach((doc) => {
  //       products.push(doc.data());
  //     });
  //     const itemsJson = await items.json();
  //     dispatch(setItems(itemsJson.data));
  //   };
  const getItems = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    const products = [];
    querySnapshot.forEach((doc) => {
      const product = doc.data();
      product.id = doc.id; // add document ID to product object
      products.push(product);
    });
    dispatch(setItems(products));
    console.log(products);
  };

  useEffect(() => {
    getItems();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const mama = items.filter((item) => item.category === "Mama");
  const bebe = items.filter((item) => item.category === "Bebe");

  return (
    <Box width="80%" margin="80px auto">
      <Typography variant="h3" textAlign="center">
        Нашите избрани <b>Продукти</b>
      </Typography>
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        value={value}
        onChange={handleChange}
        centered
        TabIndicatorProps={{ sx: { display: breakPoint ? "block" : "none" } }}
        sx={{
          m: "25px",
          "& .MuiTabs-flexContainer": {
            flexWrap: "wrap",
          },
        }}
      >
        <Tab label="ВСИЧКИ" value="all" />
        <Tab label="МАЙКА" value="mama" />
        <Tab label="БЕБЕ" value="bebe" />
      </Tabs>
      <Box
        margin="0 auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 300px)"
        justifyContent="space-around"
        rowGap="20px"
        columnGap="1.33%"
      >
        {value === "all" &&
          items.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "mama" &&
          mama.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "bebe" &&
          bebe.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
      </Box>
    </Box>
  );
};

export default ShoppingList;
