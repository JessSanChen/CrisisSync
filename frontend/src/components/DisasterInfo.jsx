import React from "react";

export default function DisasterInfo({ disaster }) {
  if (!disaster) return <p className="text-center text-gray-500">Loading disaster details...</p>;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 max-w-4xl mx-auto">
      {/* Disaster Name */}
      <h2 className="text-2xl font-bold text-red-600">{disaster.disaster_name}</h2>
      <p className="text-gray-600 mt-2">{disaster.description}</p>

      {/* Location */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-900">Location</h3>
        <p className="text-gray-700">{disaster.location}</p>
      </div>

      {/* Severity */}
      <div className="mt-4 flex items-center space-x-2">
        <h3 className="text-lg font-semibold text-gray-900">Severity:</h3>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold text-white"
          style={{ backgroundColor: disaster.severity.includes("Extreme") ? "#DC2626" : "#F59E0B" }}>
          {disaster.severity}
        </span>
      </div>

      {/* Action Plan */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-900">Recommended Action Plan</h3>
        <ul className="list-decimal list-inside text-gray-700 mt-2 space-y-2">
          {disaster.action_plan.split(". ").map((step, index) => (
            <li key={index}>{step.trim()}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
