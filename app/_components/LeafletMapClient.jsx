"use client";

import dynamic from "next/dynamic";

// ⛔ Disable SSR completely
const LeafletMapClient = dynamic(
  () => import("./LeafletMap"),
  { ssr: false }
);

export default LeafletMapClient;
