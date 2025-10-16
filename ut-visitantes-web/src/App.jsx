import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import DashboardAdmin from "./pages/DashboardAdmin";
import DashboardDependencia from "./pages/DashboardDependencia";
import DashboardVentanilla from "./pages/DashboardVentanilla";
import DashboardVigilancia from "./pages/DashboardVigilancia";
import DashboardProfesor from "./pages/DashboardProfesor";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

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
          <Route
            path="/dependencia"
            element={
              <ProtectedRoute allowedRoles={["dependencia"]}>
                <DashboardDependencia />
              </ProtectedRoute>
            }
          />
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
