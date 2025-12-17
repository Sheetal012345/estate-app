module.exports = [
"[project]/Desktop/Project/real-estate-app/utils/supabase/client.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supabase",
    ()=>supabase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2f$real$2d$estate$2d$app$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/Project/real-estate-app/node_modules/@supabase/supabase-js/dist/module/index.js [app-ssr] (ecmascript) <locals>");
;
const supabaseUrl = ("TURBOPACK compile-time value", "https://gzenznyfpxhircppnfgl.supabase.co");
const supabaseKey = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6ZW56bnlmcHhoaXJjcHBuZmdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2NzQ1NTAsImV4cCI6MjA4MDI1MDU1MH0.M10Orc8X6bpnfc4YL2EkuHe5dm9xvOasRHSXiLAnq3s");
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2f$real$2d$estate$2d$app$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseKey);
}),
"[project]/Desktop/Project/real-estate-app/app/(routes)/edit-listing/[id]/page.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>EditListing
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2f$real$2d$estate$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Project/real-estate-app/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2f$real$2d$estate$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Project/real-estate-app/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2f$real$2d$estate$2d$app$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Project/real-estate-app/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2f$real$2d$estate$2d$app$2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$runtime$2f$organization$2d$DsA9O7QJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Project/real-estate-app/node_modules/@clerk/shared/dist/runtime/organization-DsA9O7QJ.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2f$real$2d$estate$2d$app$2f$utils$2f$supabase$2f$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Project/real-estate-app/utils/supabase/client.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2f$real$2d$estate$2d$app$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Project/real-estate-app/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
function EditListing() {
    const { user, isLoaded } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2f$real$2d$estate$2d$app$2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$runtime$2f$organization$2d$DsA9O7QJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useUser"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2f$real$2d$estate$2d$app$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2f$real$2d$estate$2d$app$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useParams"])();
    const listingId = Number(params.id); // ✅ correct way
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2f$real$2d$estate$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isLoaded) return;
        if (!user) {
            router.replace("/");
            return;
        }
        // ❌ Invalid ID
        if (!listingId || isNaN(listingId)) {
            router.replace("/");
            return;
        }
        verifyUserRecord();
    }, [
        isLoaded,
        user,
        listingId
    ]);
    const verifyUserRecord = async ()=>{
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2f$real$2d$estate$2d$app$2f$utils$2f$supabase$2f$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("listing") // ✅ lowercase
        .select("id").eq("id", listingId).eq("createdBy", user.id) // ✅ correct check
        .single();
        if (error || !data) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2f$real$2d$estate$2d$app$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("You are not allowed to edit this listing");
            router.replace("/");
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2f$real$2d$estate$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "px-10 md:px-36 my-10",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2f$real$2d$estate$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
            className: "font-bold text-2xl mb-6",
            children: [
                "Edit Listing #",
                listingId
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/Project/real-estate-app/app/(routes)/edit-listing/[id]/page.jsx",
            lineNumber: 48,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/Project/real-estate-app/app/(routes)/edit-listing/[id]/page.jsx",
        lineNumber: 47,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=Desktop_Project_real-estate-app_84f6e51d._.js.map