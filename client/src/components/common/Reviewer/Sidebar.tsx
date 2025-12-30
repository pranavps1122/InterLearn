import React from "react";
import {
  Users,
  Calendar,
  Settings,
  Bell,
  User,
  Wallet,
  ChevronLeft,
  Menu
} from "lucide-react";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (val: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  sidebarOpen,
  setSidebarOpen
}) => {

  const NavItem = ({ icon: Icon, label, to }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `
        flex items-center rounded-xl transition-all
        ${sidebarOpen ? "px-4 py-3 space-x-3" : "p-3 justify-center"}
        ${
          isActive
            ? "bg-blue-600 text-white shadow-lg"
            : "text-gray-400 hover:text-white hover:bg-gray-800/60"
        }`
      }
      title={!sidebarOpen ? label : ""}
    >
      <Icon size={20} />
      {sidebarOpen && <span className="font-medium">{label}</span>}
    </NavLink>
  );

  return (
    <div
      className={`
        fixed top-16 h-[calc(100vh-4rem)]
        bg-gradient-to-b from-gray-950 to-black
        border-r border-gray-800/50 shadow-2xl
        transition-all duration-300
        overflow-hidden

        ${sidebarOpen ? "w-64" : "w-20"}   
      `}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-800/50 flex justify-between items-center">
        {sidebarOpen && (
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center font-bold text-lg">
              ID
            </div>

            <div>
              <h1 className="font-bold text-lg">Interviewer</h1>
              <p className="text-xs text-gray-500">Dashboard</p>
            </div>
          </div>
        )}

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-gray-800/60"
        >
          {sidebarOpen ? <ChevronLeft size={18} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Menu */}
      <nav className="mt-4 p-2 space-y-2 text-sm font-semibold">
        <NavItem icon={Users} label="Dashboard" to="/reviewer/dashboard" />
        <NavItem icon={User} label="Profile" to="/reviewer/profile" />
        <NavItem icon={Calendar} label="Upcoming" to="/reviewer/upcoming" />
        <NavItem icon={Wallet} label="Earnings" to="/reviewer/earnings" />
      </nav>

      <div className="mx-3 h-px bg-gray-800/50" />

      <nav className="p-2 space-y-2 text-sm font-semibold">
        <NavItem icon={Bell} label="Notifications" to="/reviewer/notifications" />
        <NavItem icon={Settings} label="Settings" to="/reviewer/settings" />
      </nav>
    </div>
  );
};

export default Sidebar;
