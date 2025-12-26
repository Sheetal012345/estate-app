(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/_components/LeafletMap.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LeafletMap
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$MapContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-leaflet/lib/MapContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$TileLayer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-leaflet/lib/TileLayer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Marker$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-leaflet/lib/Marker.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-leaflet/lib/hooks.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/leaflet/dist/leaflet-src.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
// Fix marker icon
delete __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Icon.Default.prototype._getIconUrl;
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
});
// ✅ minimal safe fix
function RecenterMap({ lat, lng }) {
    _s();
    const map = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMap"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RecenterMap.useEffect": ()=>{
            if (!lat || !lng) return;
            map.whenReady({
                "RecenterMap.useEffect": ()=>{
                    map.setView([
                        lat,
                        lng
                    ], map.getZoom());
                }
            }["RecenterMap.useEffect"]);
        }
    }["RecenterMap.useEffect"], [
        lat,
        lng,
        map
    ]);
    return null;
}
_s(RecenterMap, "IoceErwr5KVGS9kN4RQ1bOkYMAg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMap"]
    ];
});
_c = RecenterMap;
function LeafletMap({ coordinates }) {
    if (!coordinates) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$MapContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MapContainer"], {
        center: [
            coordinates.lat,
            coordinates.lng
        ],
        zoom: 14,
        style: {
            height: "300px",
            width: "100%"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$TileLayer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TileLayer"], {
                url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            }, void 0, false, {
                fileName: "[project]/app/_components/LeafletMap.jsx",
                lineNumber: 43,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Marker$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Marker"], {
                position: [
                    coordinates.lat,
                    coordinates.lng
                ]
            }, void 0, false, {
                fileName: "[project]/app/_components/LeafletMap.jsx",
                lineNumber: 45,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RecenterMap, {
                lat: coordinates.lat,
                lng: coordinates.lng
            }, void 0, false, {
                fileName: "[project]/app/_components/LeafletMap.jsx",
                lineNumber: 47,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/_components/LeafletMap.jsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
_c1 = LeafletMap;
var _c, _c1;
__turbopack_context__.k.register(_c, "RecenterMap");
__turbopack_context__.k.register(_c1, "LeafletMap");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/_components/LeafletMap.jsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/_components/LeafletMap.jsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=app__components_LeafletMap_jsx_49bf2b17._.js.map