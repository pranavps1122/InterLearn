import { Outlet } from "react-router-dom";
import AdminHeader from "../common/Admin/AdminHeader";
import AdminSidebar from "../common/Admin/AdminSidebar";
import './AdminLayout.css'

export default function AdminLayout() {
  return (
    <div className="admin-layout-container">
      
      {/* Sidebar */}
      <AdminSidebar />

      {/* Right Side Content */}
      <div className="admin-main-content">
        <AdminHeader />

        <main className="admin-outlet">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
