import { Route } from "react-router-dom";
import AdminPublicRoute from "../guards/AdminPublicRoute";
import AdminPrivateRoute from "../guards/AdminPrivateRoute";
import AdminLayout from "../../components/layouts/AdminLayout";

// ADMIN PAGES
import AdminLogin from "../../pages/Admin/adminLogin";
import ReviewerManagement from "../../pages/Admin/Dashboard/ReviewerManagement";

export default function AdminRoutes() {
  return (
    <>
      {/* Public admin route */}
      <Route
        path="admin/login"
        element={
          <AdminPublicRoute>
            <AdminLogin />
          </AdminPublicRoute>
        }
      />

      {/* Private admin routes */}
      <Route
        path="admin/*"
        element={
          <AdminPrivateRoute>
            <AdminLayout />
          </AdminPrivateRoute>
        }
      >
        <Route index element={<ReviewerManagement />} />
        <Route path="reviewer-management" element={<ReviewerManagement />} />
      </Route>
    </>
  );
}
