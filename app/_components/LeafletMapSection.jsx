"use client";

import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import "@/lib/leafletIconFix";
import { Marker } from "react-leaflet";
import MarkerItem from "./Markeritem";
let L;

if (typeof window !== "undefined") {
  L = require("leaflet");

  delete L.Icon.Default.prototype._getIconUrl;

  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  });
}


function MapController({ coordinates }) {
  const { useMap } = require("react-leaflet");
  const map = useMap();

  useEffect(() => {
    if (coordinates?.lat && coordinates?.lng) {
      map.flyTo([coordinates.lat, coordinates.lng], 14, { animate: true });
    }
  }, [coordinates, map]);

  return null;
}

export default function LeafletMapSection({ coordinates, listing= [] ,height=800}) {
  const [center] = useState({
    lat: -3.745,
    lng: -38.523,
  });

  // ✅ lazy import to prevent SSR crash
  const { MapContainer, TileLayer } = require("react-leaflet");
 console.log(listing)
  return (
    <div style={{ height }} className="w-full rounded-md overflow-hidden">
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={6}
      // className="w-full h-[500px]"
      className={`w-full h-full`}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapController coordinates={coordinates} />
     {coordinates?.lat && coordinates?.lng && (
  <Marker position={[coordinates.lat, coordinates.lng]} />
)}
    

      {listing.map((item) => (
        <MarkerItem key={item.id} item={item} />
      ))}
    </MapContainer>
    </div>

  );
}
