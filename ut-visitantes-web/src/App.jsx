import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import DashboardAdmin from "./pages/DashboardAdmin";
import DashboardDependencia from "./pages/DashboardDependencia";
import DashboardVentanilla from "./pages/DashboardVentanilla";
import DashboardVigilancia from "./pages/DashboardVigilancia";
import DashboardProfesor from "./pages/DashboardProfesor";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PreRegistro from "./pages/PreRegistro";
import ExitoRegistro from "./pages/ExitoRegistro";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Ventanilla from "./pages/Ventanilla";
import QRScanner from "./pages/QRScanner";



export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["superadmin"]}>
                <DashboardAdmin />
              </ProtectedRoute>
            }
          />
         <Router>
           <Routes>
            <Route path="/ventanilla" element={<Ventanilla />} />
            <Route path="/escaner" element={<QRScanner />} />
        </Routes>
         </Router>
          <Route
            path="/dependencia"
            element={
              <ProtectedRoute allowedRoles={["dependencia"]}>
                <DashboardDependencia />
              </ProtectedRoute>
            }
          />
          <Router>
           <Routes>
              <Route path="/" element={<PreRegistro />} />
              <Route path="/exito" element={<ExitoRegistro />} />
            </Routes>
          </Router>
          <Route
            path="/ventanilla"
            element={
              <ProtectedRoute allowedRoles={["ventanilla"]}>
                <DashboardVentanilla />
              </ProtectedRoute>
            }
          />
          <Route
            path="/vigilancia"
            element={
              <ProtectedRoute allowedRoles={["vigilancia"]}>
                <DashboardVigilancia />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profesor"
            element={
              <ProtectedRoute allowedRoles={["profesor"]}>
                <DashboardProfesor />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
