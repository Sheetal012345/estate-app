import React from "react";

function AgentDetail({ listingDetail }) {
  if (!listingDetail?.createdBy) return null;

  return (
    <div className="p-3 border rounded-lg bg-green-50 flex items-center gap-4">
      <h2 className="font-bold text-lg whitespace-nowrap">
        Contact Owner
      </h2>

      <span className="text-gray-400">—</span>

      <a
        href={`mailto:${listingDetail.createdBy}`}
        className="text-blue-600 hover:underline font-medium break-all"
      >
        {listingDetail.createdBy}
      </a>
    </div>
  );
}

export default AgentDetail;