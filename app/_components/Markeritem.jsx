"use client";

import dynamic from "next/dynamic";
import { MapPin } from "lucide-react";
import L from "leaflet";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const Marker = dynamic(() =>
  import("react-leaflet").then((m) => m.Marker),
  { ssr: false }
);

const Popup = dynamic(() =>
  import("react-leaflet").then((m) => m.Popup),
  { ssr: false }
);

// import L from "leaflet";

const markerIconFixed = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// const markerIconFixed = L.icon({
//   iconUrl: markerIcon.src,
//   iconRetinaUrl: markerIcon2x.src,
//   shadowUrl: markerShadow.src,
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
//   shadowSize: [41, 41],
// });

export default function MarkerItem({ item }) {
  const lat = Number(item?.coordinates?.lat);
  const lng = Number(item?.coordinates?.lng);

  if (!lat || !lng) return null;

  return (
    <Marker position={[lat, lng]} icon={markerIconFixed}>
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
