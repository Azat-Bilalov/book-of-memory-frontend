import { Navigate, Outlet } from "react-router-dom";
import { useIsAuth } from "../model";

export const PrivateRoute = () => {
  const isAuth = useIsAuth();
  return isAuth ? <Outlet /> : <Navigate to="/book-of-memory-frontend/login" />;
};
