import React, { useEffect, useRef, useState } from "react";
import {
  Bell,
  ChevronDown,
  LogOut,
  Settings,
  HelpCircle,
} from "lucide-react";
import { useAuthStatus } from "@/core/hooks/useAuthStatus";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { logoutThunk } from "@/store/authSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store/hooks";

export default function ReviewerHeader() {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  
  const reviewer = useSelector((state: RootState) => state.auth.user);
  
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const profileRef = useRef<HTMLDivElement | null>(null);
  const notifRef = useRef<HTMLDivElement | null>(null);

  const notifications = [
    { id: 1, title: "Interview scheduled", time: "5 min ago" },
    { id: 2, title: "New candidate application", time: "1 hour ago" },
    { id: 3, title: "Interview reminder", time: "2 hours ago" },
  ];

  const handleLogout=()=>{
    dispatch(logoutThunk())
    navigate('/reviewer/login')
  }

  useEffect(() => {
    const clickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false);
      }
    };

    const escClose = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsNotificationOpen(false);
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", clickOutside);
    document.addEventListener("keydown", escClose);

    return () => {
      document.removeEventListener("mousedown", clickOutside);
      document.removeEventListener("keydown", escClose);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-gradient-to-r from-gray-950/80 via-gray-950/60 to-black/80 backdrop-blur border-b border-gray-800/50 z-50">
      <div className="h-full flex items-center justify-between px-6">

        {/* ---------- LEFT: PORTAL NAME ---------- */}
        <h2 className="text-lg font-semibold text-white tracking-wide">
          Reviewer Portal
        </h2>

        {/* ---------- RIGHT ACTIONS ---------- */}
        <div className="flex items-center space-x-4">

          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => {
                setIsNotificationOpen(!isNotificationOpen);
                setIsProfileMenuOpen(false);
              }}
              className="relative text-gray-400 hover:text-white transition p-2 hover:bg-gray-800/50 rounded-lg"
            >
              <Bell size={20} />

              {notifications.length > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
              )}
            </button>

            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-gray-900/95 border border-gray-800/50 rounded-xl shadow-2xl overflow-hidden">
                <div className="p-4 border-b border-gray-800/50">
                  <h3 className="text-sm font-semibold text-white">Notifications</h3>
                </div>

                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className="px-4 py-3 border-b border-gray-800/30 hover:bg-gray-800/20 cursor-pointer"
                    >
                      <p className="text-sm text-white">{n.title}</p>
                      <p className="text-xs text-gray-500">{n.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="w-px h-6 bg-gray-800/50" />

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => {
                setIsProfileMenuOpen(!isProfileMenuOpen);
                setIsNotificationOpen(false);
              }}
              className="flex items-center space-x-3 hover:bg-gray-800/50 px-3 py-2 rounded-lg transition"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-sm font-semibold text-white">
                JR
              </div>

              <div className="hidden md:block text-left">
                <p className="text-sm font-medium">{reviewer.name}</p>
                <p className="text-xs text-gray-500">Reviewer</p>
              </div>

              <ChevronDown
                size={16}
                className={`transition ${isProfileMenuOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-gray-900/95 border border-gray-800/50 rounded-xl shadow-2xl overflow-hidden">

                <div className="p-4 border-b border-gray-800/50">
                  <p className="text-sm font-semibold text-white">{reviewer.name}</p>
                  <p className="text-xs text-gray-500">Reviewer</p>
                </div>

                <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-800/50 flex items-center space-x-3">
                  <Settings size={16} />
                  <span>Settings</span>
                </button>

                <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-800/50 flex items-center space-x-3">
                  <HelpCircle size={16} />
                  <span>Help & Support</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-900/20 flex items-center space-x-3 border-t border-gray-800/50"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}
