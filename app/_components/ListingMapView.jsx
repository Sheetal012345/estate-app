"use client";

import { supabase } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import Listing from "./Listing";
import { toast } from "sonner";
import dynamic from "next/dynamic";

// ✅ import ONLY ONCE
const LeafletMapSection = dynamic(
  () => import("./LeafletMapSection"),
  { ssr: false }
);

export default function ListingMapView({ type }) {
  const [listing, setListing] = useState([]);
  const [searchedAddress, setSearchedAddress] = useState();
  const [bedCount, setBedCount] = useState(0);
  const [bathCount, setBathCount] = useState(0);
  const [parkingCount, setParkingCount] = useState(0);
  const [homeType, setHomeType] = useState();
  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    getLatestListing();
    console.log(type)
  }, []);

  const getLatestListing = async () => {
      let query = supabase
    .from("listing")
    .select(`*, listingImages(url, listing_id)`)
    .eq("active", true)
    .order("id", { ascending: false });
    // const { data, error } = await supabase
    //   .from("listing")
    //   .select(`*, listingImages(url, listing_id)`)
    //   .eq("active", true)
    //   // .eq("type",type)
    //   .order("id", { ascending: false });
       if (type !== null && type !== undefined) {
    query = query.eq("type", type);
  }
  const { data, error } = await query;


    if (data) setListing(data);
    if (error) toast("Server side error");
  };

  const handleSearchClick = async () => {
    const searchTerm = searchedAddress?.split(",")[0]?.trim();

    let query = supabase
      .from("listing")
      .select(`*, listingImages(url, listing_id)`)
      .eq("active", true)
      .gte("bedroom", bedCount)
      .gte("bathroom", bathCount)
      .gte("parking", parkingCount)
      
      .ilike("address", `%${searchTerm}%`)
      .order("id", { ascending: false });

    if (homeType) query = query.eq("propertyType", homeType);

    const { data } = await query;
    if (data) setListing(data);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      {/* LEFT: LISTINGS */}
      <div>
        <Listing
          listing={listing}
          handleSearchClick={handleSearchClick}
          searchedAddress={(v) => setSearchedAddress(v)}
          setBathCount={setBathCount}
          setBedCount={setBedCount}
          setParkingCount={setParkingCount}
          setHomeType={setHomeType}
          setCoordinates={setCoordinates}
        />
      </div>

      {/* RIGHT: MAP */}
      
      <div className="h-[100vh] w-full md:sticky md:top-[140px]">
        <LeafletMapSection
          // listin={listing}
          coordinates={coordinates}
          listing={listing}  
        />
      </div>
      
    </div>
  );
}
