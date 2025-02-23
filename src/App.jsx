import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";

import "./App.css";
import Startpage from "./pages/startpage/Startpage.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import RequireAuth from "./RequireAuth.jsx";

function App() {
  

  
  return (
    <div className="ycFiles">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            
            <Route path="/" element={<Startpage />} />
            <Route path="/login" element={<Startpage />}></Route>
            <Route
              path="/dashboard"
              element={
                <RequireAuth AllowedRoles={"USER"}>
                  <Dashboard />
                </RequireAuth>
              }
            ></Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
