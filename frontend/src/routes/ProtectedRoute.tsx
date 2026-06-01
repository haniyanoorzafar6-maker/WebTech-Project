import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export function ProtectedRoute() {
  const { user, loading } = useAuth();
  if (loading) return <div className="p-10 text-center font-bold">Loading BrewPoint...</div>;
  return user ? <Outlet /> : <Navigate to="/login" replace />;
}

export function AdminRoute() {
  const { user, loading } = useAuth();
  if (loading) return <div className="p-10 text-center font-bold">Loading BrewPoint...</div>;
  return user?.role === "Admin" ? <Outlet /> : <Navigate to="/dashboard" replace />;
}
