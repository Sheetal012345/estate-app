"use client";

import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// ✅ minimal safe fix
function RecenterMap({ lat, lng }) {
  const map = useMap();

  useEffect(() => {
    if (!lat || !lng) return;

    map.whenReady(() => {
      map.setView([lat, lng], map.getZoom());
    });
  }, [lat, lng, map]);

  return null;
}

export default function LeafletMap({ coordinates }) {
  if (!coordinates) return null;

  return (
    <MapContainer
      center={[coordinates.lat, coordinates.lng]}
      zoom={14}
      style={{ height: "300px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Marker position={[coordinates.lat, coordinates.lng]} />

      <RecenterMap
        lat={coordinates.lat}
        lng={coordinates.lng}
      />
    </MapContainer>
  );
}
