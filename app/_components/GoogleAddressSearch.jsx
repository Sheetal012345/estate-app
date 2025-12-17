"use client";

import React from "react";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-google-places-autocomplete";
import { MapPin } from "lucide-react";

function GoogleAddressSearch({selectedAddress,setCoordinates}) {
  return (
    <div className="flex items-center w-full ">
      <MapPin className="h-10 w-10 rounded-l-lg text-purple-400 bg-purple-200" />

      <GooglePlacesAutocomplete
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY}
        selectProps={{
          placeholder: "Search Property Address",
          isClearable: true,
          className: "w-full",
          onChange: (place) => {
            if (!place) return;

            console.log(place);
            selectedAddress(place);

            geocodeByAddress(place.label)
              .then((results) => getLatLng(results[0]))
              .then(({ lat, lng }) => {
               

                setCoordinates({lat,lng})
                
              }) 
              .catch((error) => console.error(error));
          },
        }}
      />
    </div>
  );
}

export default GoogleAddressSearch;
