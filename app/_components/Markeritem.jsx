"use client";

import { Marker, Popup } from "react-leaflet";
import { MapPin } from "lucide-react";
import L from "leaflet";

// ✅ import marker images locally (THIS FIXES IT)
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// ✅ define icon ONCE
const markerIconFixed = new L.Icon({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
  iconSize: [25, 41],
  iconAnchor: [12, 41], // 👈 IMPORTANT (prevents floating)
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function MarkerItem({ item }) {
  // ⛔ skip listings without coordinates
  if (!item?.latitude || !item?.longitude) return null;

  return (
    <Marker
      position={[item.latitude, item.longitude]}
      icon={markerIconFixed}   // ✅ THIS IS THE KEY LINE
    >
      <Popup>
        <div className="text-sm">
          <p className="font-semibold text-blue-600">
            ₹{item.price}
          </p>

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
