"use client";

import { useState } from "react";
import { Bath, BedDouble, MapPin, Ruler, Search } from "lucide-react";
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
  setCoordinates,   // ✅ comes from parent
}) {
  const [address, setAddress] = useState();

  return (
    <div>
      <div className="p-3 flex gap-6">
        <FreeAddressSearch
          selectedAddress={(v) => {
            searchedAddress && searchedAddress(v);
            setAddress(v);
          }}
          setCoordinates={setCoordinates} // ✅ safe now
        />

        <Button className="flex gap-2" onClick={handleSearchClick}>
          <Search className="h-4 w-4" /> Search
        </Button>
      </div>

      <FilterSection
        setBathCount={setBathCount}
        setBedCount={setBedCount}
        setParkingCount={setParkingCount}
        setHomeType={setHomeType}
      />

      {/* rest of your component unchanged */}
    </div>
  );
}

export default Listing;
