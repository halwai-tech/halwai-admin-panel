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
    label: "User Management",
    icon: <RestaurantMenuIcon fontSize="small" />,
    children: [
      { label: "All Users", path: "/user-management/all-users" },
      { label: "All Halwais", path: "/user-management/halwai-list" },
      { label: "User Enquiries", path: "/user-management/enquiry" },
      { label: "Add New Halwai", path: "/user-management/halwai/create" },
    ],
  },
];
