import { Outlet } from "react-router-dom";
import { useState } from "react";
import ReviewerSidebar from "../common/Reviewer/Sidebar";
import ReviewerHeader from "../common/Reviewer/Header";

export default function ReviewerLayout() {

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  return (
    <div className="flex h-screen bg-black text-white overflow-y-auto">

      {/* Header */}
      <ReviewerHeader />

      {/* Sidebar */}
      <ReviewerSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <div
        className={`transition-all duration-0 w-full ${
          sidebarOpen ? "ml-64" : "ml-20"
        } mt-16`}
      >
        <main className="h-full overflow-y-auto">
          <Outlet />
        </main>
      </div>

    </div>
  );
}
