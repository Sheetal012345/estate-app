"use client";

import axios from "axios";
import { useState } from "react";

function FreeAddressSearch({ selectedAddress, setCoordinates }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = async (value) => {
    setQuery(value);

    if (value.length < 3) {
      setSuggestions([]);
      return;
    }

    const res = await axios.get("https://photon.komoot.io/api/", {
      params: {
        q: value,
        limit: 5,
      },
    });

    setSuggestions(res.data.features);
  };

  const handleSelect = (place) => {
    const lat = Number(place.geometry.coordinates[1]);
    const lng = Number(place.geometry.coordinates[0]);

    const name = place.properties.name || "";
    const city = place.properties.city || "";
    const country = place.properties.country || "";

    const fullAddress = `${name}, ${city}, ${country}`;

  console.log("FULL ADDRESS:", fullAddress);
  console.log("LAT:", lat);
  console.log("LNG:", lng);
  console.log("RAW PLACE OBJECT:", place);

    setQuery(fullAddress);
    setSuggestions([]);

    // ✅ THESE ARE PROPS (NOW DEFINED)
    selectedAddress?.(fullAddress);
    setCoordinates({ lat, lng });
    setCoordinates({
  lat: 19.075983,
  lng: 72.877655,
});

  };

  return (
    <div className="relative w-full">
      <input
        value={query}
        onChange={(e) => fetchSuggestions(e.target.value)}
        placeholder="Search address"
        className="w-full border rounded-md p-2"
      />

      {suggestions.length > 0 && (
        <div className="absolute z-10 bg-white border w-full rounded-md shadow">
          {suggestions.map((place, index) => (
            <div
              key={index}
              onClick={() => handleSelect(place)}
              className="p-2 cursor-pointer hover:bg-gray-100"
            >
              {place.properties.name},{" "}
              {place.properties.city},{" "}
              {place.properties.country}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FreeAddressSearch;
