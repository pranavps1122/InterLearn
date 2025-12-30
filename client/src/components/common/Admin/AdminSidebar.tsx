import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  BookOpen,
  BadgeDollarSign,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";
import "./AdminSidebar.css";

const navItems = [
  { to: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/admin/user-management", icon: Users, label: "Student Management" },
  {
    to: "/admin/reviewer-management",
    icon: ClipboardList,
    label: "Reviewer Management",
  },
  { to: "/admin/courses", icon: BookOpen, label: "Course Management" },
  {
    to: "/admin/pending-applications",
    icon: ClipboardList,
    label: "Applications",
  },
  { to: "/admin/bookings", icon: ClipboardList, label: "Bookings" },
  { to: "/admin/payments", icon: BadgeDollarSign, label: "Payments" },
  { to: "/admin/reports", icon: BarChart3, label: "Reports" },
  { to: "/admin/settings", icon: Settings, label: "Settings" },
];

export default function AdminSidebar() {
  const location = useLocation();

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    // Add your logout logic here
    console.log("Logging out...");
  };

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">I</div>
        <span className="sidebar-title">InterLearn</span>
      </div>

      <nav className="sidebar-nav">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
            title={label}
          >
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}

        <button
          onClick={handleLogout}
          className="nav-item logout"
          title="Logout"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </nav>
    </aside>
  );
}
