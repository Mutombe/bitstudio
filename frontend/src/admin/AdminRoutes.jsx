import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./AuthContext.jsx";
import AdminLayout, { RequireAuth } from "./AdminLayout.jsx";
import Login from "./Login.jsx";
import Dashboard from "./Dashboard.jsx";
import Pipeline from "./Pipeline.jsx";
import LeadsList from "./LeadsList.jsx";
import LeadDetail from "./LeadDetail.jsx";

/**
 * The CRM, mounted at /admin. Loaded lazily by App so none of it ships in
 * the marketing bundle — a visitor reading /offers never downloads the
 * sales pipeline.
 */
export default function AdminRoutes() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <RequireAuth>
              <AdminLayout />
            </RequireAuth>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="pipeline" element={<Pipeline />} />
          <Route path="leads" element={<LeadsList />} />
          <Route path="leads/:id" element={<LeadDetail />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
