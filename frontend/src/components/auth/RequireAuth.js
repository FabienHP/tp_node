import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./authState";

export default function RequireAuth({ children }) {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.user) {
    return <Navigate to="/sign/in" state={{ from: location }} replace />
  }

  return children
}
