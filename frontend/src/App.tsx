import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import { Role } from "@/types";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Developer Routes */}
          <Route
            path="/developer/dashboard"
            element={
              <ProtectedRoute allowedRoles={[Role.DEVELOPER]}>
                <h1 className="p-8 text-2xl font-bold">
                  Developer Dashboard 👨‍💻
                </h1>
              </ProtectedRoute>
            }
          />

          {/* Company Routes */}
          <Route
            path="/company/dashboard"
            element={
              <ProtectedRoute allowedRoles={[Role.COMPANY]}>
                <h1 className="p-8 text-2xl font-bold">Company Dashboard 🏢</h1>
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={[Role.ADMIN]}>
                <h1 className="p-8 text-2xl font-bold">Admin Dashboard 👑</h1>
              </ProtectedRoute>
            }
          />

          {/* Unauthorized */}
          <Route
            path="/unauthorized"
            element={
              <div className="p-8 text-center">
                <h1 className="text-2xl font-bold text-red-500">
                  403 — Unauthorized
                </h1>
                <p className="text-slate-500 mt-2">
                  You don't have access to this page
                </p>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
