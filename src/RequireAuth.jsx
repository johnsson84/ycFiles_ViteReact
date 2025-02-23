import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import { Navigate } from "react-router-dom";
import axios from "axios";

function RequireAuth({ children, allowedRoles }) {
  const { authState, setAuthState } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in.
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/auth/check`,
          {
            withCredentials: true,
          }
        );
        setAuthState({
          isAuthenticated: true,
          user: response.data.email,
          roles: response.data.roles,
        });
        setLoading(false);
      } catch (error) {
        console.log("Catch error: " + error);
        setAuthState({
          isAuthenticated: false,
          user: null,
          roles: [],
        });
        setLoading(false);
      }
    };
    if (!authState.isAuthenticated) {
      checkAuth();
    } else {
      setLoading(false);
    }
  }, [authState.isAuthenticated, setAuthState]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!authState.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (
    allowedRoles &&
    !allowedRoles.some((role) => authState.roles.includes(role))
  ) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

export default RequireAuth;
