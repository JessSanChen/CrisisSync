import React from "react";
import { PaperClipIcon } from "@heroicons/react/20/solid";

export default function DisasterInfo({ disaster }) {
  if (!disaster) {
    return <p className="text-center text-gray-500">Loading disaster details...</p>;
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 max-w-4xl mx-auto">
      {/* Header */}
      <div className="px-4 sm:px-0">
        <h3 className="text-xl font-semibold text-red-600">{disaster.disaster_name}</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">{disaster.description}</p>
      </div>

      {/* Information Section */}
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          {/* Location */}
          <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium text-gray-900">Location</dt>
            <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{disaster.location}</dd>
          </div>

          {/* Severity */}
          <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium text-gray-900">Severity</dt>
            <dd className="mt-1 text-sm font-bold sm:col-span-2 sm:mt-0">
              <span
                className={`inline-flex px-3 py-1 rounded-full text-white text-xs font-semibold ${
                  disaster?.severity?.includes("Extreme")
                    ? "bg-red-600"
                    : disaster?.severity?.includes("High")
                    ? "bg-orange-500"
                    : "bg-yellow-400"
                }`}
              >
                {disaster.severity}
              </span>
            </dd>
          </div>

          {/* Action Plan */}
          <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium text-gray-900">Recommended Action</dt>
            <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
              {disaster.action_plan}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
