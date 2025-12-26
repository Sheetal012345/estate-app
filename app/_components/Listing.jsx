"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Bath,
  BedDouble,
  MapPin,
  Ruler,
  Search,
} from "lucide-react";

import FreeAddressSearch from "./FreeAddressSearch";
import { Button } from "@/components/ui/button";
import FilterSection from "./FilterSection";

function Listing({
  listing = [],
  handleSearchClick,
  searchedAddress,
  setBathCount,
  setBedCount,
  setParkingCount,
  setHomeType,
  setCoordinates, // ✅ comes from parent
}) {
  const [address, setAddress] = useState();

  return (
    <div>

      {/* 🔍 Search Bar */}
      <div className="p-3 flex gap-6">
        <FreeAddressSearch
          selectedAddress={(v) => {
            searchedAddress && searchedAddress(v);
            setAddress(v);
          }}
          setCoordinates={setCoordinates}
        />

        <Button className="flex gap-2" onClick={handleSearchClick}>
          <Search className="h-4 w-4" />
          Search
        </Button>
      </div>

      {/* 🎛 Filters */}
      <FilterSection
        setBathCount={setBathCount}
        setBedCount={setBedCount}
        setParkingCount={setParkingCount}
        setHomeType={setHomeType}
      />

      {/* 📊 Result Count */}
      {address && (
        <div className="px-3 my-5">
          <h2 className="text-xl">
            Found{" "}
            <span className="font-bold">
              {listing?.length}
            </span>{" "}
            result{listing?.length > 1 ? "s" : ""} in{" "}
            <span className="font-bold text-blue-600">
              {address?.label || address}
            </span>
          </h2>
        </div>
      )}

      {/* 🏠 Listing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-3">
        {listing?.length > 0
          ? listing.map((item) => (
              <Link
                key={item.id}
                href={`/view-listing/${item.id}`}
              >
                <div className="p-3 hover:border hover:border-primary rounded-lg cursor-pointer">
                  {/* <Image
                    src={item?.listingImages?.[0]?.url}
                    alt="listing"
                    width={400}
                    height={300}
                    className="rounded-lg object-cover h-[180px] w-full"
                  /> */}

                  <div className="flex mt-2 flex-col gap-2">
                    <h2 className="font-bold text-xl text-blue-600">
                      ₹{item.price}
                    </h2>

                    <div className="flex gap-2 items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4" />
                      <span>{item.address}</span>
                    </div>

                    <div className="flex gap-2 justify-between mt-2">
                      <span className="flex gap-2 items-center text-xs bg-slate-200 rounded-md px-2 py-1">
                        <BedDouble className="h-4 w-4" />
                        {item.bedroom}
                      </span>

                      <span className="flex gap-2 items-center text-xs bg-slate-200 rounded-md px-2 py-1">
                        <Bath className="h-4 w-4" />
                        {item.bathroom}
                      </span>

                      <span className="flex gap-2 items-center text-xs bg-slate-200 rounded-md px-2 py-1">
                        <Ruler className="h-4 w-4" />
                        {item.area}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          : [1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
              <div
                key={index}
                className="h-[230px] w-full bg-slate-200 animate-pulse rounded-lg"
              />
            ))}
      </div>
    </div>
  );
}

export default Listing;
