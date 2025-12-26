"use client";

import { Marker, Popup } from "react-leaflet";
import { MapPin } from "lucide-react";

export default function MarkerItem({ item }) {
  // ⛔ skip listings without coordinates
  if (!item?.latitude || !item?.longitude) return null;

  return (
    <Marker position={[item.latitude, item.longitude]}>
      <Popup>
        <div className="text-sm">
          <p className="font-semibold text-blue-600">₹{item.price}</p>
          <div className="flex items-center gap-1 text-gray-600">
            <MapPin className="h-3 w-3" />
            <span>{item.address}</span>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            {item.bedroom} Bed • {item.bathroom} Bath
          </p>
        </div>
      </Popup>
    </Marker>
  );
}