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

export default function Register() {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (values: IRegisterUser) => {
    try {
      let response = await authController.registerUser(values);
      console.log("response:", response);

      // Adjust this depending on your API response structure
      const token = response.data.token;

      if (token) {
        // Save token in cookie (expires in 7 days)
        Cookies.set("auth_token", token, {
          expires: 7,
          secure: process.env.NODE_ENV === "production",
          sameSite: "Lax",
          path: "/",
        });

        console.log("Token saved in cookie");
        dispatch(
          showToast({
            message: "User Registration Successfull!",
            type: "success",
          })
        );

        // Redirect to dashboard or home page after login
        router.push("/");
      }
    } catch (error: any) {
      console.error("Registration error:", error.message);
      dispatch(
        showToast({ message: "Error in Registering the User!", type: "error" })
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
            Halwai Admin Register
          </Typography>

          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
              role: "admin",
            }}
            validationSchema={RegisterSchema}
            onSubmit={handleSubmit}
          >
            {({ handleChange, values, touched, errors }) => (
              <Form noValidate>
                <TextField
                  label="Username"
                  name="username"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  value={values.username}
                  onChange={handleChange}
                  error={touched.username && Boolean(errors.username)}
                  helperText={touched.username && errors.username}
                />

                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  value={values.email}
                  onChange={handleChange}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />

                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  value={values.password}
                  onChange={handleChange}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 2,
                    backgroundColor: COLORS.primary,
                    "&:hover": { backgroundColor: COLORS.primary },
                  }}
                >
                  Register
                </Button>
              </Form>
            )}
          </Formik>

          <Box mt={2} textAlign="center">
            <Typography variant="body2">
              Already registered?{" "}
              <MuiLink
                component={NextLink}
                href="/login"
                underline="hover"
                sx={{ color: COLORS.primary, fontWeight: "bold" }}
              >
                Login here
              </MuiLink>
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
