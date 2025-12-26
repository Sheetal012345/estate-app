"use client";

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "@/lib/leafletIconFix";
import MarkerItem from "./Markeritem";

function MapController({ coordinates,listing }) {
  const map = useMap();

  useEffect(() => {
    if (coordinates?.lat && coordinates?.lng) {
      map.flyTo([coordinates.lat, coordinates.lng], 14, { animate: true });
    }
  }, [coordinates, map]);

  return null;
}

export default function LeafletMapSection({ coordinates, listing = [] }) {
  const [center] = useState({
    lat: -3.745,
    lng: -38.523,
  });

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={6}
      className="w-full h-full"
      gesturesHandling="greedy"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapController coordinates={coordinates} />

      {listing.map(
        (item) =>
          item.coordinates && (
            <Marker
              key={item.id}
              position={[item.coordinates.lat, item.coordinates.lng]}
            />
          )
      )}
      {listing.map((item,index)=>(
        <MarkerItem
        key={index}
        item={item}
        
        />
      ))}
    </MapContainer>
  );
}
