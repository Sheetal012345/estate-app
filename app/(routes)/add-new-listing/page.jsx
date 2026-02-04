"use client";

import FreeAddressSearch from "@/app/_components/FreeAddressSearch";
import { Button } from "@/components/ui/button";
import { supabase } from "@/utils/supabase/client";
import { useUser } from "@clerk/nextjs";
import React, { useState } from "react";
import { toast } from "sonner";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

// ✅ FIX: import the CORRECT map component
const LeafletMap = dynamic(
  () => import("@/app/_components/LeafletMapSection"),
  { ssr: false }
);

function AddNewListing() {
  const [selectedAddress, setSelecetedAddress] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const { user } = useUser();
  const router = useRouter();

  const nextHandler = async () => {
    if (!user) {
    toast("Please login to post a listing");
    router.push("/sign-in");
    return; // ⛔ STOP execution
  }
    if (
      !selectedAddress ||
      !coordinates ||
      typeof coordinates.lat !== "number" ||
      typeof coordinates.lng !== "number"
    ) {
      toast("Please select a location from the map");
      return;
    }

    const { data, error } = await supabase
      .from("listing")
      .insert([
        {
          address: selectedAddress,
          coordinates: {
            lat: coordinates.lat,
            lng: coordinates.lng,
          },
          createdBy: user?.primaryEmailAddress?.emailAddress,
          active: false,
        },
      ])
      .select();

    if (data) {
      toast("New Address added for listing");
      router.replace("/edit-listing/" + data[0].id);
    }

    if (error) {
      toast("Server side error");
    }
  };

  return (
    <div className="mt-10 md:mx-56 lg:mx-80">
      <div className="p-10 flex flex-col gap-5 items-center justify-center">
        <h2 className="font-bold text-2xl">Add New Listing</h2>

        <div className="p-10 rounded-lg border shadow-md flex flex-col gap-5 w-[500px]">
          <h2 className="text-gray-500">
            Enter Address which you want to list
          </h2>

          <FreeAddressSearch
            selectedAddress={(value) => setSelecetedAddress(value)}
            setCoordinates={(value) => setCoordinates(value)}
          />

          {/* ✅ MAP NOW RENDERS
          <LeafletMap coordinates={coordinates} height={500} /> */}
          <LeafletMap
  coordinates={coordinates}
  setCoordinates={setCoordinates}
  height={500}
/>

          <Button
            disabled={
              !selectedAddress ||
              !coordinates ||
              !coordinates.lat ||
              !coordinates.lng
            }
            onClick={nextHandler}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddNewListing;
