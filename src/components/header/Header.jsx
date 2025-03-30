import "./Header.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

const Header = () => {
  const navigate = useNavigate();
  const {setAuthState} = useContext(AuthContext);

  const logout = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      localStorage.clear();
      setAuthState({
        isAuthenticated: false,
        user: null,
        roles: [],
      });
      navigate("/");
    } catch (error) {
      console.log("Logout error: " + error);
    }
  };

  return (
    <div className="header">
      <div className="header-appname">
        <h1>ycFiles </h1>
        <h2>&nbsp;- your cloud files</h2>
      </div>
      <div className="header-user">
        <p>Logged in as: {localStorage.getItem("user")}</p>
        <button className="header-logout" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
