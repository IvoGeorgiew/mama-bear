import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Field, Form } from "formik";
import { Box, Typography, Button } from "@mui/material";
import { decreaseCount, increaseCount, removeFromCart } from "../../state";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Divider, IconButton, Select, MenuItem } from "@mui/material";
import styled from "@emotion/styled";
import { shades } from "../../theme";

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CheckoutPage = () => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const totalPrice = cart.reduce((total, item) => {
    return total + item.count * item.price;
  }, 0);

  const form = useRef();
  const handleSubmit = (values) => {
    //e.preventDefault();
    emailjs
      .sendForm(
        "service_c0pvbsv",
        "template_sbunqa9",
        form.current,
        "sbfdxGjjrHq18KY-k"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <Box>
      <Box
        style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
      >
        <Typography
          variant="h1"
          style={{ marginBottom: "20px", fontSize: "36px" }}
        >
          Изпращане на поръчка
        </Typography>
      </Box>
      <Box style={{ margin: "10px", display: "flex" }}>
        <Box style={{ flex: "1", marginRight: "20px" }}>
          <Box>
            {cart.map((item) => (
              <Box key={`${item.name}-${item.id}`}>
                <FlexBox p="15px 0">
                  <Box flex="1 1 40%">
                    <img
                      alt={item?.name}
                      width="123px"
                      height="164px"
                      src={item.imageUrl}
                    />
                  </Box>
                  {/* NAME */}
                  <Box flex="1 1 60%">
                    <FlexBox mb="5px">
                      <Typography fontWeight="bold">{item.name}</Typography>
                      {/* REMOVE ITEM */}
                      <IconButton
                        onClick={() =>
                          dispatch(removeFromCart({ id: item.id }))
                        }
                      >
                        <CloseIcon />
                      </IconButton>
                    </FlexBox>

                    <FlexBox m="15px 0">
                      {/* ITEM COUNT */}
                      <Box
                        display="flex"
                        alignItems="center"
                        border={`1.5px solid ${shades.neutral[500]}`}
                      >
                        <IconButton
                          onClick={() =>
                            dispatch(decreaseCount({ id: item.id }))
                          }
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography>{item.count}</Typography>
                        <IconButton
                          onClick={() =>
                            dispatch(increaseCount({ id: item.id }))
                          }
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>
                      {/* PRICE */}
                      <Typography fontWeight="bold">{item.price}лв</Typography>
                    </FlexBox>
                  </Box>
                </FlexBox>
                <Divider />
              </Box>
            ))}
          </Box>
        </Box>

        <Box style={{ flex: "2" }}>
          <Formik
            initialValues={{
              name: "",
              surname: "",
              address: "",
              city: "",
              toOffice: false,
            }}
            onSubmit={handleSubmit}
          >
            {({ values }) => (
              <Form style={{ width: "100%", padding: "0 50px" }} ref={form}>
                <Box my={2}>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Име"
                    style={{
                      width: "100%",
                      padding: "15px",
                      marginBottom: "10px",
                    }}
                  />
                </Box>

                <Box my={2}>
                  <Field
                    type="text"
                    id="surname"
                    name="surname"
                    required
                    placeholder="Фамилия"
                    style={{
                      width: "100%",
                      padding: "15px",
                      marginBottom: "10px",
                    }}
                  />
                </Box>

                <Box my={2}>
                  <Field
                    type="text"
                    id="city"
                    name="city"
                    required
                    placeholder="Град"
                    style={{
                      width: "100%",
                      padding: "15px",
                      marginBottom: "10px",
                    }}
                  />
                </Box>

                <Box my={2}>
                  <Field
                    type="text"
                    id="address"
                    name="address"
                    required
                    placeholder="Адрес"
                    style={{
                      width: "100%",
                      padding: "15px",
                      marginBottom: "10px",
                    }}
                  />
                </Box>
                <Box my={2}>
                  <Field
                    type="text"
                    id="number"
                    name="number"
                    required
                    placeholder="Телефон за връзка"
                    style={{
                      width: "100%",
                      padding: "15px",
                      marginBottom: "10px",
                    }}
                  />
                </Box>

                <Box my={2}>
                  <Field
                    name="toOffice"
                    as={Select}
                    style={{
                      width: "100%",
                      padding: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    <MenuItem value={true}>Доставка до Офис</MenuItem>
                    <MenuItem value={false}>Доставка до Адрес</MenuItem>
                  </Field>
                </Box>

                <Box
                  display="flex"
                  justifyContent="space-between"
                  width="100%"
                  mt={4}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    style={{
                      width: "40%",
                      padding: "15px",
                      height: "80px",
                      fontSize: "24px",
                    }}
                    onClick={() => {
                      // Handle back button action, e.g., redirecting to Home
                    }}
                  >
                    Назад
                  </Button>

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{
                      width: "40%",
                      padding: "15px",
                      height: "80px",
                      fontSize: "24px",
                    }}
                  >
                    Поръчай
                  </Button>
                </Box>
                <FlexBox m="20px 0">
                  <Typography fontWeight="bold" fontSize={30}>
                    ОБЩО
                  </Typography>
                  <Typography fontWeight="bold" fontSize={30}>
                    {totalPrice}лв
                  </Typography>
                </FlexBox>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Box>
  );
};

export default CheckoutPage;
