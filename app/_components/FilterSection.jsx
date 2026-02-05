"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BedDouble, Bath, Car } from "lucide-react";

function FilterSection({setBedCount,setBathCount,setParkingCount,setHomeType}) {
  return (
    
<div className="flex flex-wrap items-center gap-3 px-3 py-2">
      {/* BED */}
      <Select onValueChange={setBedCount}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Bed" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">
            <h2 className="flex items-center gap-2">
              <BedDouble className="h-5 w-5 text-purple-500" /> 1+
            </h2>
          </SelectItem>
          <SelectItem value="2">
            <h2 className="flex items-center gap-2">
              <BedDouble className="h-5 w-5 text-purple-500" /> 2+
            </h2>
          </SelectItem>
          <SelectItem value="3">
            <h2 className="flex items-center gap-2">
              <BedDouble className="h-5 w-5 text-purple-500" /> 3+
            </h2>
          </SelectItem>
        </SelectContent>
      </Select>

      {/* BATH */}
      <Select onValueChange={setBathCount}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Bath" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">
            <h2 className="flex items-center gap-2">
              <Bath className="h-5 w-5 text-purple-500" /> 1+
            </h2>
          </SelectItem>
          <SelectItem value="2">
            <h2 className="flex items-center gap-2">
              <Bath className="h-5 w-5 text-purple-500" /> 2+
            </h2>
          </SelectItem>
        </SelectContent>
      </Select>

      {/* PARKING */}
      <Select onValueChange={setParkingCount}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Parking" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">
            <h2 className="flex items-center gap-2">
              <Car className="h-5 w-5 text-purple-500" /> 1+
            </h2>
          </SelectItem>
          <SelectItem value="2">
            <h2 className="flex items-center gap-2">
              <Car className="h-5 w-5 text-purple-500" /> 2+
            </h2>
          </SelectItem>
        </SelectContent>
      </Select>
   {/*hometype*/}
      <Select onValueChange={setHomeType}>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Home Type" />
  </SelectTrigger>

  <SelectContent>
    <SelectItem value="All">
      All
    </SelectItem>

    <SelectItem value="1 RK">
       1 RK
    </SelectItem>

    <SelectItem value="1 BHK">
      1 BHK
    </SelectItem>

    <SelectItem value="2 BHK">
      2 BHK
    </SelectItem>

    {/* NEW HOME TYPE ADDED */}
    {/* <SelectItem value="3 BHK">
      3 BHK
    </SelectItem> */}
  </SelectContent>
</Select>
</div>

  
  );
}

export default FilterSection;
