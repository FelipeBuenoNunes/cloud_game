import { Navigate } from "react-router-dom";
import { useUser } from "../providers/UserProvider";

function ProtectedRoute({children }) {
  const {user} = useUser()
  if(!user.name){
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
