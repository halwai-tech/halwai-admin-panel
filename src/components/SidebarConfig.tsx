// sidebarConfig.ts
import DashboardIcon from "@mui/icons-material/Dashboard";
import EventIcon from "@mui/icons-material/Event";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";

export const sidebarConfig = [
  {
    label: "Dashboard",
    path: "/",
    icon: <DashboardIcon fontSize="small" />,
  },
  {
    label: "Services",
    icon: <EventIcon fontSize="small" />,
    children: [
      { label: "Add Event", path: "/event/add" },
      { label: "Show All Events", path: "/event/events" },
      { label: "Manage Category", path: "/event/category" },
    ],
  },
  {
    label: "Manage Halwai",
    icon: <RestaurantMenuIcon fontSize="small" />,
    children: [
      {
        label: "Listing & Profiles",
        children: [
          { label: "Halwai List", path: "/halwais/list" },
          { label: "Add Halwai", path: "/halwais/create" },
        ],
      },
    ],
  },
];
