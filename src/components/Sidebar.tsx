"use client";

import { Drawer, Toolbar, Divider } from "@mui/material";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import { sidebarConfig } from "./SidebarConfig";
import SidebarMenu from "./SidebarMenu";
import { grotesk } from "@/utils/fonts";
import { COLORS } from "@/utils/colors";

const drawerWidth = 240;

export default function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          bgcolor: COLORS.primary,
          color: COLORS.white,
        },
      }}
      open
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          bgcolor: COLORS.primary,
          gap: 1,
        }}
      >
        <RestaurantMenuIcon sx={{ color: "white", fontSize: 24 }} />
        <span
          style={{
            fontFamily: grotesk.style.fontFamily,
            fontSize: 18,
            fontWeight: 600,
            color: "white",
          }}
        >
          Halwai Admin
        </span>
      </Toolbar>

      <Divider />
      <SidebarMenu items={sidebarConfig} />
    </Drawer>
  );
}
