import { Outlet } from "react-router-dom";
import AdminHeader from "../common/AdminHeader/AdminHeader";
import AdminSidebar from "../common/AdminHeader/AdminSidebar";
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
