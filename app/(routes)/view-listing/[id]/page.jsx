"use client";

import React, { useEffect, useState, use } from "react";
import { supabase } from "@/utils/supabase/client";
import Details from "../_components/Details";
import { Sliders } from "lucide-react";
import Slider from "../_components/Slider";

function ViewListing({ params }) {

  const resolvedParams = use(params);
  const listingId = resolvedParams.id;

  const [listingDetail, setListingDetail] = useState();

  useEffect(() => {
    GetListingDetail();
  }, []);

  const GetListingDetail = async () => {
    const { data, error } = await supabase
      .from("listing")
      .select("*, listingImages(url, listing_id)")
      .eq("id", listingId)
      .eq("active", true);

    if (data) {
      setListingDetail(data[0]);
      console.log(data);
    }

    if (error) {
      console.error("Server side error", error);
    }
  };

  return (
    <div className="px-4 md:px-32 lg:px-56 my-3">
      <Slider imageList={listingDetail?.listingImages} />
       <Details listingDetail={listingDetail} />
    </div>
  );
}

export default ViewListing;
