import React, { useState } from "react";
import {
  DollarSign,
  Calendar,
  CheckCircle,
  TrendingUp,
  Clock,
  Users,
  BookOpen,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ReviewerDashboard() {
  const [timeRange, setTimeRange] = useState("month");

  // Earnings over time data
  const earningsData = [
    { month: "Jul", earnings: 850 },
    { month: "Aug", earnings: 1200 },
    { month: "Sep", earnings: 1100 },
    { month: "Oct", earnings: 1500 },
    { month: "Nov", earnings: 1800 },
    { month: "Dec", earnings: 2100 },
  ];

  // Interviews by status
  const interviewStatusData = [
    { name: "Completed", value: 52, color: "#10b981" },
    { name: "Scheduled", value: 15, color: "#3b82f6" },
    { name: "Pending Review", value: 8, color: "#f59e0b" },
  ];

  // Interviews by subject/domain
  const subjectData = [
    { subject: "Web Dev", count: 22 },
    { subject: "Data Science", count: 15 },
    { subject: "Mobile Dev", count: 12 },
    { subject: "UI/UX", count: 14 },
    { subject: "DevOps", count: 12 },
  ];

  // Recent interviews
  const recentInterviews = [
    {
      student: "Priya Sharma",
      course: "Full Stack Web Dev",
      amount: 120,
      time: "2 hours ago",
    },
    {
      student: "Rahul Verma",
      course: "React Native",
      amount: 100,
      time: "4 hours ago",
    },
    {
      student: "Ananya Singh",
      course: "Python & ML",
      amount: 130,
      time: "1 day ago",
    },
    {
      student: "Arjun Patel",
      course: "UI/UX Design",
      amount: 110,
      time: "1 day ago",
    },
  ];

  const stats = [
    {
      label: "Total Earnings",
      value: "₹8,550",
      change: "+24%",
      icon: DollarSign,
      color: "from-green-600 to-green-400",
      trend: "up",
    },
    {
      label: "Total Interviews",
      value: "75",
      change: "+18%",
      icon: Calendar,
      color: "from-blue-600 to-blue-400",
      trend: "up",
    },
    {
      label: "Students Reviewed",
      value: "52",
      change: "69%",
      icon: Users,
      color: "from-purple-600 to-purple-400",
      trend: "neutral",
    },
    {
      label: "Avg. Per Interview",
      value: "₹114",
      change: "+5%",
      icon: TrendingUp,
      color: "from-yellow-600 to-yellow-400",
      trend: "up",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black text-white">
      <div className="h-10" />

      {/* HEADER */}
      <div className="border-b border-gray-800/50 bg-gray-950/50 backdrop-blur p-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Reviewer Dashboard
            </h2>
            <p className="text-gray-400 text-xs mt-0.5">
              Track your student interview earnings and performance
            </p>
          </div>

          <div className="flex gap-1.5">
            {["week", "month", "year"].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  timeRange === range
                    ? "bg-blue-600 text-white"
                    : "bg-gray-900/50 text-gray-400 hover:bg-gray-800/50"
                }`}
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="p-4 space-y-4">
        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-gray-900/40 border border-gray-800/50 rounded-lg p-4 hover:border-gray-700/50 transition-all"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-400 text-xs">{stat.label}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    <div className="flex items-center mt-1 gap-1">
                      <span
                        className={`text-xs ${
                          stat.trend === "up"
                            ? "text-green-400"
                            : "text-gray-400"
                        }`}
                      >
                        {stat.change}
                      </span>
                      <span className="text-gray-500 text-[10px]">
                        vs last month
                      </span>
                    </div>
                  </div>
                  <div
                    className={`bg-gradient-to-br ${stat.color} p-2 rounded-lg`}
                  >
                    <Icon size={18} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CHARTS ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* EARNINGS CHART */}
          <div className="bg-gray-900/40 border border-gray-800/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold">Earnings Over Time</h3>
              <TrendingUp size={16} className="text-green-400" />
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={earningsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis
                  dataKey="month"
                  stroke="#9ca3af"
                  style={{ fontSize: "12px" }}
                />
                <YAxis stroke="#9ca3af" style={{ fontSize: "12px" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="earnings"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: "#3b82f6", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* INTERVIEW STATUS PIE */}
          <div className="bg-gray-900/40 border border-gray-800/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold">Interview Status</h3>
              <CheckCircle size={16} className="text-purple-400" />
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={interviewStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  style={{ fontSize: "11px" }}
                >
                  {interviewStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* SUBJECT/COURSE BAR CHART & RECENT ACTIVITY */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* BAR CHART */}
          <div className="lg:col-span-2 bg-gray-900/40 border border-gray-800/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold">
                Interviews by Course/Subject
              </h3>
              <BookOpen size={16} className="text-yellow-400" />
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={subjectData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis
                  dataKey="subject"
                  stroke="#9ca3af"
                  style={{ fontSize: "11px" }}
                />
                <YAxis stroke="#9ca3af" style={{ fontSize: "12px" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="count" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* RECENT INTERVIEWS */}
          <div className="bg-gray-900/40 border border-gray-800/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold">Recent Interviews</h3>
              <Clock size={16} className="text-blue-400" />
            </div>
            <div className="space-y-3">
              {recentInterviews.map((interview, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 pb-3 border-b border-gray-800/50 last:border-0"
                >
                  <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-1.5 rounded-lg">
                    <Users size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">
                      {interview.student}
                    </p>
                    <p className="text-[10px] text-gray-400">
                      {interview.course}
                    </p>
                    <p className="text-[10px] text-gray-500 mt-0.5">
                      {interview.time}
                    </p>
                  </div>
                  <div className="text-green-400 font-semibold text-xs">
                    ₹{interview.amount}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
