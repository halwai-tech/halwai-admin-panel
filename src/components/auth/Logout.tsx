"use client";

import React from "react";
import { Button } from "@mui/material";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { showToast } from "@/redux/slices/toastSlice";

const Logout: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const token = Cookies.get("auth_token"); 
  const isLoggedIn = !!token;

  const handleLogout = () => {
    Cookies.remove("auth_token", { path: "/" });
    dispatch(showToast({ message: "Logged out successfully!", type: "success" }));
    router.push("/login");
  };

  if (!isLoggedIn) return null; // hide if not logged in

  return (
    <Button variant="contained" color="secondary" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default Logout;
