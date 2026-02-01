import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

function AgentDetail({ listingDetail }) {
  return (
    <div className="mt-4 flex flex-col gap-2">
      
      {/* <div>
        <Image
          src={listingDetail?.profileImage}
          alt="profileImage"
          width={60}
          height={60}
          className="rounded-full"
        />
      </div>
      */}

      {listingDetail && (
        <div className="flex gap-5 items-center justify-between p-5 rounded-lg shadow-md border my-6">
           
          <h2 className="text-lg font-bold">
            {listingDetail.fullName}
          </h2>

          <h2 className="text-gray-500">
            {listingDetail.createdBy}
          </h2>

          {/* Send Message Button */}
          {/* <Button className="flex gap-2 mt-2  bg-blue-600 hover:bg-blue-700 text-white">
           
            Send Message
          </Button>
           */}
        </div>
      )}
    </div>
  );
}

export default AgentDetail;
