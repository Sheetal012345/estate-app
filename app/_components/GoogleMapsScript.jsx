"use client";

import Script from "next/script";

export default function GoogleMapsScript() {
  return (
    <Script
      src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY}&libraries=places`}
      strategy="beforeInteractive"
    />
  );
}



//"https://maps.googleapis.com/maps/api/js?key=AIzaSyArwDJMBrtAwcRuD8fh96vzE0B0DX1ehPs"