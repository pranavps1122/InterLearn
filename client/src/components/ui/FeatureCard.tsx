import React from "react";

export interface FeatureCardProps {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  color?: string;
}

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  color = "bg-blue-500",
}: FeatureCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-10 border border-gray-100 h-full flex flex-col hover:shadow-lg transition-all">
      
      <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${color} bg-opacity-90`}>
        <Icon size={26} className="text-white" />
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>

      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}
