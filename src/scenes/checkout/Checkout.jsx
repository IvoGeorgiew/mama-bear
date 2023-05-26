import React from "react";
import { useSelector } from "react-redux";
import { Formik, Field, Form } from "formik";
import {
  FormControlLabel,
  Checkbox,
  Box,
  Typography,
  Button,
} from "@mui/material";
import CartMenu from "../global/CartMenu";

const CheckoutPage = () => {
  const cart = useSelector((state) => state.cart.cart);

  const handleSubmit = (values) => {
    // Handle form submission
    console.log(values);
  };

  return (
    <div style={{ margin: "50px", display: "flex" }}>
      <div style={{ flex: "1", marginRight: "20px" }}>
        <CartMenu />
      </div>

      <div style={{ flex: "1" }}>
        <Typography
          variant="h1"
          style={{ marginBottom: "20px", fontSize: "36px" }}
        >
          Checkout
        </Typography>

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
            <Form style={{ width: "100%", padding: "0 50px" }}>
              <Box my={2}>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Name"
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
                  placeholder="Surname"
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
                  placeholder="City"
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
                  placeholder="Address"
                  style={{
                    width: "100%",
                    padding: "15px",
                    marginBottom: "10px",
                  }}
                />
              </Box>

              <Box my={2}>
                <Field name="toOffice">
                  {({ field }) => (
                    <FormControlLabel
                      control={<Checkbox {...field} />}
                      label="Deliver to office"
                    />
                  )}
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
                  Back
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
                  Place Order
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CheckoutPage;
