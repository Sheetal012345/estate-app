"use client";

import React, { useEffect, useState, use } from "react";

import { supabase } from "@/utils/supabase/client";
import Details from "../_components/Details";


function ViewListing({ params }) {

  // ✅ unwrap params Promise
  const resolvedParams = use(params);
  const listingId = resolvedParams.id;
 
  const [listingDetail, setListingDetail]=useState();
  useEffect(() => {
    GetListingDetail();
  }, []);

  const GetListingDetail = async () => {
    const { data, error } = await supabase
      .from("listing")
      .select("*, listingImages(url, listing_id)")
      .eq("id", listingId)
      .eq('active',true);

    if (data) {
      setListingDetail(data[0]);
      console.log(data)
    }

    if (error) {
      toast('Server side error')
    }
  };

  return (
    <div className='px-4 md:px-32 lg:px-56 my-3 '>
      //slider
      <Details listingDetail={listingDetail}/>
    </div>
  );
}

export default ViewListing;
