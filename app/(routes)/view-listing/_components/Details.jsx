import React from "react";
import {
  MapPin,
  Share,
  Drill,
  LandPlot,
  BedDouble,
  Bath,
  CarFront,
  PhoneCall,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import LeafletMapSection from "@/app/_components/LeafletMapSection";
import LeafletMapClient from "@/app/_components/LeafletMapClient";
import AgentDetail from "./AgentDetail";

// 💰 Indian price formatter (UI only)
const formatPrice = (price) => {
  if (!price || isNaN(price)) return "";

  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(2)} Cr`;
  } else if (price >= 100000) {
    return `₹${(price / 100000).toFixed(1)} Lakh`;
  }

  return `₹${Number(price).toLocaleString("en-IN")}`;
};
function Details({ listingDetail }) {
  return (
    listingDetail && (
      <div className="my-6 flex gap-2 flex-col">
        {/* Price + Address + Share */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-bold text-3xl">
  {formatPrice(listingDetail?.price)}
</h2>{/* <h2 className="font-bold text-3xl">
              ₹ {listingDetail?.price}
            </h2> */}

            <h2 className="text-gray-500 text-lg flex gap-2 items-center">
              <MapPin />
              {listingDetail?.address}
            </h2>
          </div>

          {/* <Button className="flex gap-2  bg-blue-600 hover:bg-blue-700 text-white ">
            <Share /> Share
          </Button> */}
        </div>

        <hr />
        

        {/* Key Features */}
        <div className="mt-4 flex flex-col gap-3">
          <h2 className="font-bold text-2xl">Key Features</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <h2 className="flex gap-2 items-center justify-center bg-purple-100 rounded-lg p-3 text-primary">
              <Drill />
              Built In {listingDetail?.builtIn}
            </h2>

            <h2 className="flex gap-2 items-center justify-center bg-purple-100 rounded-lg p-3 text-primary">
              <LandPlot />
              {listingDetail?.area}
            </h2>

            <h2 className="flex gap-2 items-center justify-center bg-purple-100 rounded-lg p-3 text-primary">
              <BedDouble />
              {listingDetail?.bedroom} Bed
            </h2>

            <h2 className="flex gap-2 items-center justify-center bg-purple-100 rounded-lg p-3 text-primary">
              <Bath />
              {listingDetail?.bathroom} Bath
            </h2>

            <h2 className="flex gap-2 items-center justify-center bg-purple-100 rounded-lg p-3 text-primary">
              <CarFront />
              {listingDetail?.parking} Parking
            </h2>

            <h2 className="flex gap-2 items-center justify-center bg-purple-100 rounded-lg p-3 text-primary">
              <PhoneCall />
              {listingDetail?.contactNumber} 
            </h2>
          </div>
        </div>

        {/* What's Special */}
        <div className="mt-4">
          <h2 className="font-bold text-2xl">What&apos;s Special</h2>
          <p className="text-gray-600">
            {listingDetail?.description}
            gsadiugsbdukcigsidu
          </p>
        </div>

        {/* 🛡️ Safety Score */}
{listingDetail?.safety_score !== undefined && (
  <div className="mt-6 p-4 border rounded-lg bg-green-50">
    <h2 className="font-bold text-2xl mb-2">Safety Score</h2>

    <p className="text-gray-700 mb-2">
      This property has a safety score of
      <span className="font-bold"> {listingDetail.safety_score}%</span>
    </p>

    {/* Progress Bar */}
    <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
      <div
        className="h-3 rounded-full bg-green-600"
        style={{ width: `${listingDetail.safety_score}%` }}
      />
    </div>

    {/* Label */}
    <p className="font-medium">
      {listingDetail.safety_score >= 80 && "🟢 Very Safe Area"}
      {listingDetail.safety_score >= 50 &&
        listingDetail.safety_score < 80 &&
        "🟡 Moderately Safe Area"}
      {listingDetail.safety_score < 50 && "🔴 Less Safe Area"}
    </p>
  </div>
)}
        {/* Map Section (placeholder) */}
        {/* <div className="mt-4">
          <h2 className="font-bold text-2xl"> Find on Map</h2>
          <LeafletMapClient
            coordinates={listingDetail.coordinates}
            listing={[listingDetail]}
          />
        </div> */}
        <div>
             <h2 className="font-bold text-xl">Contact Agent</h2>
            <AgentDetail listingDetail={listingDetail}/>
        </div>
      </div>
    )
  );
}

export default Details;
