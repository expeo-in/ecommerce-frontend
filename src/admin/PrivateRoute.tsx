import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "./auth-store";

const PrivateRoute = () => {
  const { user } = useAuthStore();

  if (!user) return <Navigate to="/adminLogin"></Navigate>;

  return <Outlet />;
};

export default PrivateRoute;
