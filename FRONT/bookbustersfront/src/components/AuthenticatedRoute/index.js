import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import authContext from "../../contexts/AuthContext";

const AuthenticatedRoute = ({ redirect, connectedOnly, children }) => {
  const { connected } = useContext(authContext);

  if (connectedOnly !== connected) {
    return <Navigate to={redirect} />;
  }
  return children ? children : <Outlet />;
};

export default AuthenticatedRoute;
