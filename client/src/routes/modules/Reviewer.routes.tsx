import { Route } from "react-router-dom";
import ReviewerLayout from "../../components/common/ReviewerLayout/reviewerLayout";

import ReviewerLogin from "../../pages/ReviewerLogin/ReviewerLogin";

export default function ReviewerRoutes() {
  return (
    <>
    
      <Route path="reviewer/login" element={<ReviewerLogin />} />

      <Route element={<ReviewerLayout />}>
        <Route path="reviewer/dashboard" element={<div>Reviewer Dashboard</div>} />
        <Route path="reviewer/submissions" element={<div>Submissions</div>} />
        <Route path="reviewer/reviews" element={<div>My Reviews</div>} />
        <Route path="reviewer/reports" element={<div>Reports</div>} />
      </Route>
    </>
  );
}
