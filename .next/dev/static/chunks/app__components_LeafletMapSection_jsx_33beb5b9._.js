(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/_components/LeafletMapSection.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LeafletMapSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
function LeafletMapSection({ coordinates, listing = [] }) {
    _s();
    const [center] = useState({
        lat: -3.745,
        lng: -38.523
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MapContainer, {
        center: [
            center.lat,
            center.lng
        ],
        zoom: 6,
        className: "w-full h-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TileLayer, {
                attribution: "© OpenStreetMap contributors",
                url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            }, void 0, false, {
                fileName: "[project]/app/_components/LeafletMapSection.jsx",
                lineNumber: 13,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MapController, {
                coordinates: coordinates
            }, void 0, false, {
                fileName: "[project]/app/_components/LeafletMapSection.jsx",
                lineNumber: 19,
                columnNumber: 7
            }, this),
            listing.map((item)=>item.coordinates && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Marker, {
                    position: [
                        item.coordinates.lat,
                        item.coordinates.lng
                    ]
                }, item.id, false, {
                    fileName: "[project]/app/_components/LeafletMapSection.jsx",
                    lineNumber: 25,
                    columnNumber: 13
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/app/_components/LeafletMapSection.jsx",
        lineNumber: 8,
        columnNumber: 5
    }, this);
}
_s(LeafletMapSection, "PUz4hOP9oO8j0NlgZPVQFmydxkY=");
_c = LeafletMapSection;
var _c;
__turbopack_context__.k.register(_c, "LeafletMapSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/_components/LeafletMapSection.jsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/_components/LeafletMapSection.jsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=app__components_LeafletMapSection_jsx_33beb5b9._.js.map