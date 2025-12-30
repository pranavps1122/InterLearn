import React from "react";
import { Clock, MoreVertical } from "lucide-react";

export interface Interview {
  id: string;
  candidate: string;
  position: string;
  date: string;
  time: string;
  status: string;
}

interface InterviewTableProps {
  title?: string;
  interviews: Interview[];
}

const getStatusStyles = (status: string) => {
  switch (status) {
    case "scheduled":
      return "bg-blue-900/40 text-blue-300 border border-blue-700/50";
    case "completed":
      return "bg-green-900/40 text-green-300 border border-green-700/50";
    case "pending":
      return "bg-yellow-900/40 text-yellow-300 border border-yellow-700/50";
    default:
      return "bg-gray-700/40 text-gray-300 border border-gray-600/50";
  }
};

const InterviewTable: React.FC<InterviewTableProps> = ({
  title = "Assigned Interviews",
  interviews,
}) => {
  return (
    <div className="bg-gray-900/40 backdrop-blur border border-gray-800/50 rounded-xl overflow-hidden hover:border-gray-700/50 transition">
      <div className="p-6 border-b border-gray-800/50 flex items-center justify-between">
        <h3 className="text-lg font-bold flex items-center space-x-2">
          <Clock size={20} className="text-blue-400" />
          <span>{title}</span>
        </h3>

        {/* Reviewer cannot create interviews */}
        <p className="text-xs text-gray-500">Read-only · Assigned to you</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-800/30 border-b border-gray-800/50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                Candidate
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                Position
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                Date
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                Time
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                Status
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {interviews.map((interview) => (
              <tr
                key={interview.id}
                className="border-b border-gray-800/30 hover:bg-gray-800/20 transition"
              >
                <td className="px-6 py-4 text-sm font-medium">
                  {interview.candidate}
                </td>
                <td className="px-6 py-4 text-sm text-gray-300">
                  {interview.position}
                </td>
                <td className="px-6 py-4 text-sm text-gray-300">
                  {interview.date}
                </td>
                <td className="px-6 py-4 text-sm text-gray-300">
                  {interview.time}
                </td>

                <td className="px-6 py-4 text-sm">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyles(
                      interview.status
                    )}`}
                  >
                    {interview.status.charAt(0).toUpperCase() +
                      interview.status.slice(1)}
                  </span>
                </td>

                <td className="px-6 py-4 text-center">
                  {/* reviewer actions only, no create */}
                  <button className="text-gray-400 hover:text-white transition hover:bg-gray-800/50 p-2 rounded-lg">
                    <MoreVertical size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InterviewTable;
