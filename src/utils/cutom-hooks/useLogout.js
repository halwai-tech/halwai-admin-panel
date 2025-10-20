import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { showToast } from "@/redux/slices/toastSlice";

export const useLogout = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const logout = () => {
    // Remove the auth token cookie
    Cookies.remove("auth_token", { path: "/" });

    // Clear any Redux state if needed
    // dispatch(logoutUser()); // optional, if you store user in Redux

    // Show a logout message
    dispatch(showToast({ message: "Logged out successfully!", type: "success" }));

    // Redirect to login page
    router.push("/login");
  };

  return logout;
};
