(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/_components/LeafletMap.jsx [app-client] (ecmascript, next/dynamic entry, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "static/chunks/node_modules_34619a67._.js",
  "static/chunks/app__components_LeafletMap_jsx_49bf2b17._.js",
  {
    "path": "static/chunks/node_modules_leaflet_dist_leaflet_ef5f0413.css",
    "included": [
      "[project]/node_modules/leaflet/dist/leaflet.css [app-client] (css)"
    ]
  },
  "static/chunks/app__components_LeafletMap_jsx_cc65c055._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/app/_components/LeafletMap.jsx [app-client] (ecmascript, next/dynamic entry)");
    });
});
}),
]);