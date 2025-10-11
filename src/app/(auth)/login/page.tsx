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
import Cookies from 'js-cookie';
import { authController } from "@/api/authController";
import NextLink from "next/link";
import Image from "next/image";
import { COLORS } from "@/utils/colors";
import { Formik, Form } from "formik";
import { LoginSchema } from "@/utils/validationSchema";
import { useRouter } from "next/navigation";
import { useDispatch, UseDispatch } from "react-redux";
import { showToast } from "@/redux/slices/toastSlice";



export default function Login(){

  const router=useRouter();
  const dispatch=useDispatch();


const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      const response = await authController.loginUser(values);
      console.log('response:', response);

      // Adjust this depending on your API response structure
     const token = response.data.token;

      if (token) {
        // Save token in cookie (expires in 7 days)
        Cookies.set('auth_token', token, {
          expires: 1,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'Lax',
          path: '/',
        });

        console.log('Token saved in cookie');
        dispatch(showToast({message:"Logged In Successfully!",type:"success"}));

        // Redirect to dashboard or home page after login
        router.push('/');
      } else {
        console.error('Login failed: no token received');
        dispatch(showToast({message:"Error in Logging In!",type:"error"}));
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };



  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        px: 2,
      }}
    >
      <Grid container spacing={4} sx={{ maxWidth: 1000 }}>
        {/* Left side image */}
        <Grid
        size={{xs:12,md:6}}
         
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            src="/images/login/chef.jpg"
            alt="Login"
            width={400}
            height={400}
            style={{ maxWidth: "100%", height: "auto", borderRadius: 8 }}
          />
        </Grid>

        {/* Right side form */}
        <Grid
        
          size={{xs:12,md:6}}
       
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box sx={{ width: "100%", maxWidth: 400 }}>
            <Typography variant="h5" component="h1" align="center" gutterBottom>
              Halwai Admin Login
            </Typography>

            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={LoginSchema}
              onSubmit={handleSubmit}
            >
              {({ handleChange, values, touched, errors }) => (
                <Form noValidate>
                  <TextField
                    label="Username"
                    name="email"
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
                    Login
                  </Button>
                </Form>
              )}
            </Formik>

            <Box mt={2} textAlign="center">
              <Typography variant="body2">
                Not registered yet?{" "}
                <MuiLink
                component={NextLink}
                  href="/register"
                  underline="hover"
                  sx={{ color: COLORS.primary, fontWeight: "bold" }}
                >
                  Create an account
                </MuiLink>
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
