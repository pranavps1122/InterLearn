import { Routes, Route, Navigate } from "react-router-dom";

import { UserRoutes, AdminRoutes, ReviewerRoutes } from "@/routes"

export default function AppRoutes() {
  return (
    <Routes>
      {UserRoutes()}
      {ReviewerRoutes()}
      {AdminRoutes()}

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
