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
import { Formik, Form, FormikHelpers } from "formik";
import { RegisterSchema } from "@/utils/validationSchema";
import { useRouter } from "next/navigation";
import { authController } from "@/api/authController";
import { IRegisterUser } from "@/utils/typeDef";
import { useDispatch, UseDispatch } from "react-redux";
import { showToast } from "@/redux/slices/toastSlice";

export default function CreateHalwai() {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (values: IRegisterUser,{resetForm}:FormikHelpers<IRegisterUser>) => {
    try {
      let response = await authController.registerUser(values);
      console.log("response:", response);

      // Adjust this depending on your API response structure
      const token = response.data.token;
      const username=response.data.user.username.toUpperCase();

      if (token) {

         dispatch(
          showToast({
            message: `${username} Added Successfully!`,
            type: "success",
          })
        );
       
    
      }
    } catch (error: any) {
      console.error("Registration error:", error.message);
      dispatch(
        showToast({ message: "Error In Adding New Halwai!", type: "error" })
      );
    }
    finally{
        resetForm();
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
            Create New Halwai
          </Typography>

          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
              role: "halwai",
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
                  Add Halwai
                </Button>
              </Form>
            )}
          </Formik>

         
        </Box>
      </Grid>
    </Grid>
  );
}
