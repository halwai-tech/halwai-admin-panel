"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { grotesk } from "@/utils/fonts";
import { COLORS } from "@/utils/colors";

type SidebarItem = {
  label: string;
  path?: string;
  icon?: React.ReactNode;
  children?: SidebarItem[];
};

interface SidebarProps {
  items: SidebarItem[];
  level?: number;
}

export default function SidebarMenu({ items, level = 0 }: SidebarProps) {
  const router = useRouter();
  const [open, setOpen] = useState<{ [key: string]: boolean }>({});

  const toggle = (key: string) => {
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <List component="div" disablePadding>
      {items.map((item, idx) => {
        const key = `${level}-${idx}-${item.label}`;

        if (item.children) {
          return (
            <div key={key}>
              <ListItem disablePadding>
                <ListItemButton onClick={() => toggle(key)} sx={{ pl: 2 + level * 2 }}>
                  {item.icon && (
                    <ListItemIcon sx={{ color: COLORS.white }}>
                      {item.icon}
                    </ListItemIcon>
                  )}
                  <ListItemText
                    primary={item.label}
                    sx={{ fontFamily: grotesk.style }}
                  />
                  {open[key] ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </ListItem>

              <Collapse in={open[key]} timeout="auto" unmountOnExit>
                <SidebarMenu items={item.children} level={level + 1} />
              </Collapse>
            </div>
          );
        }

        return (
          <ListItem key={key} disablePadding>
            <ListItemButton
              onClick={() => item.path && router.push(item.path)}
              sx={{ pl: 2 + level * 2 }}
            >
              {item.icon && (
                <ListItemIcon sx={{ color: COLORS.white }}>
                  {item.icon}
                </ListItemIcon>
              )}
              <ListItemText
                primary={item.label}
                sx={{ fontFamily: grotesk.style }}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
