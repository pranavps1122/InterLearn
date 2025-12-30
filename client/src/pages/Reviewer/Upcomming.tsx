import React from "react";
import InterviewTable from "@/components/common/Reviewer/ReviewerTable";

const Upcoming = () => {
    const interviews = [
    {
      id: "1",
      candidate: "Rahul M",
      position: "MERN Developer",
      date: "2025-01-05",
      time: "10:00 AM",
      status: "Scheduled"
    },
    {
      id: "2",
      candidate: "Aditi N",
      position: "Frontend Developer",
      date: "2025-01-08",
      time: "2:30 PM",
      status: "Scheduled"
    }
  ];

  return (
    <div className="p-6 mt-12">
      
  
      <h1 className="text-2xl font-semibold mb-8">
        Upcoming Interviews
      </h1>

    
      <div className="
      
      ">
        <InterviewTable interviews={interviews} />
      </div>

    </div>
  );
};

export default Upcoming;
