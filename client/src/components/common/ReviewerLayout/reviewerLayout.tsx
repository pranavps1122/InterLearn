import { Outlet } from "react-router-dom";

const ReviewerLayout = () => {
  return (
    <div className="reviewer-layout-container">

      <header className="reviewer-header">
        Reviewer Header
      </header>

      <main className="reviewer-main">
        <Outlet />   {/* IMPORTANT */}
      </main>

    </div>
  );
};

export default ReviewerLayout;
