import React from "react";

export default function DisasterInfo({ disaster }) {
  if (!disaster) return <p className="text-center text-gray-500">Loading disaster details...</p>;

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="px-4 sm:px-0">
        <h3 className="text-lg font-semibold text-gray-900">Disaster Information</h3>
        <p className="mt-1 text-sm text-gray-500">
          Current disaster details and recommended action plan.
        </p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium text-gray-900">Disaster Category</dt>
            <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{disaster.category}</dd>
          </div>
          <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium text-gray-900">Severity Level</dt>
            <dd
              className={`mt-1 text-sm font-bold sm:col-span-2 sm:mt-0 
                ${
                  disaster.severity === "Severe"
                    ? "text-red-600"
                    : disaster.severity === "Moderate"
                    ? "text-orange-500"
                    : "text-green-600"
                }`}
            >
              {disaster.severity}
            </dd>
          </div>
          <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium text-gray-900">Recommended Action</dt>
            <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
              {disaster.actionPlan}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
