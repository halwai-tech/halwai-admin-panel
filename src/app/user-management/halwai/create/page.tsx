"use client";
import React from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Link as MuiLink,
} from "@mui/material";
import Cookies from "js-cookie";
import NextLink from "next/link";
import Image from "next/image";
import { COLORS } from "@/utils/colors";
import { Formik, Form } from "formik";
import { RegisterSchema } from "@/utils/validationSchema";
import { useRouter } from "next/navigation";
import { authController } from "@/api/authController";
import { IRegisterUser } from "@/utils/typeDef";
import { useDispatch, UseDispatch } from "react-redux";
import { showToast } from "@/redux/slices/toastSlice";

export default function CreateHalwai() {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (values: IRegisterUser) => {
    try {
      values.role = "halwai";
      let response = await authController.registerUser(values);
      console.log("response:", response);

      // Adjust this depending on your API response structure
      const token = response.data.token;

      if (token) {
        // Save token in cookie (expires in 7 days)
        // Cookies.set("auth_token", token, {
        //   expires: 7,
        //   secure: process.env.NODE_ENV === "production",
        //   sameSite: "Lax",
        //   path: "/",
        // });

        // console.log("Token saved in cookie");
        dispatch(
          showToast({
            message: "New Halwai Added Successfull!",
            type: "success",
          })
        );

        // Redirect to dashboard or home page after login
        // router.push("/");
      }
    } catch (error: any) {
      console.error("Error in Adding the New Halwai: ", error.message);
      dispatch(
        showToast({ message: "Error in Adding the New Halwai!", type: "error" })
      );
    }
  };

  return (
    <Grid container sx={{ height: "100vh" }}>
      {/* Left side image */}
      <Grid
        size={{ xs: 12, md: 6 }}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
        }}
      >
        <Image
          src="/images/login/chef.jpg"
          alt="Register"
          width={400}
          height={400}
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </Grid>

      {/* Right side form */}
      <Grid
        size={{ xs: 12, md: 6 }}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          px: 4,
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 400 }}>
          <Typography variant="h5" component="h1" align="center" gutterBottom>
            Add New Halwai
          </Typography>

          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
              phone: "",
              role: "halwai",
            }}
            validationSchema={RegisterSchema}
            onSubmit={handleSubmit}
            validateOnChange={true}
            validateOnBlur={true}
          >
            {({
              handleChange,
              values,
              touched,
              errors,
              setFieldTouched,
              validateField,
            }) => (
              <Form noValidate>
                <TextField
                  label="Halwai Username"
                  name="username"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  value={values.username}
                  onChange={(e) => {
                    handleChange(e);
                    if (!touched.username)
                      setFieldTouched("username", true, false);
                    validateField("username");
                  }}
                  error={!!errors.username}
                  helperText={errors.username}
                />

                <TextField
                  label="Halwai Email"
                  name="email"
                  type="email"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  value={values.email}
                  onChange={(e) => {
                    handleChange(e);
                    if (!touched.email) setFieldTouched("email", true, false);
                    validateField("email");
                  }}
                  error={!!errors.email}
                  helperText={errors.email}
                />

                <TextField
                  label="Halwai Password"
                  name="password"
                  type="password"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  value={values.password}
                  onChange={(e) => {
                    handleChange(e);
                    if (!touched.password)
                      setFieldTouched("password", true, false);
                    validateField("password");
                  }}
                  error={!!errors.password}
                  helperText={errors.password}
                />

                <TextField
                  label="Halwai Phone Number"
                  name="phone"
                  type="text"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  value={values.phone}
                  onChange={(e) => {
                    handleChange(e);
                    if (!touched.phone) setFieldTouched("phone", true, false);
                    validateField("phone");
                  }}
                  error={!!errors.phone}
                  helperText={errors.phone}
                />

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ mt: 2, backgroundColor: COLORS.primary }}
                >
                  Add
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Grid>
    </Grid>
  );
}
