module.exports = [
"[project]/src/components/base/input/hint-text.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HintText",
    ()=>HintText
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$Text$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-aria-components/dist/Text.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/cx.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
const HintText = ({ isInvalid, className, ...props })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$Text$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
        ...props,
        slot: isInvalid ? "errorMessage" : "description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cx"])("text-sm text-tertiary", // Invalid state
        isInvalid && "text-error-primary", "group-invalid:text-error-primary", className)
    }, void 0, false, {
        fileName: "[project]/src/components/base/input/hint-text.tsx",
        lineNumber: 17,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
HintText.displayName = "HintText";
}),
"[project]/src/components/base/input/label.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Label",
    ()=>Label
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$untitledui$2f$icons$2f$dist$2f$HelpCircle$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@untitledui/icons/dist/HelpCircle.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$Label$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-aria-components/dist/Label.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$tooltip$2f$tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/base/tooltip/tooltip.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/cx.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
const Label = ({ isRequired, tooltip, tooltipDescription, className, ...props })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$Label$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
        // Used for conditionally hiding/showing the label element via CSS:
        // <Input label="Visible only on mobile" className="lg:**:data-label:hidden" />
        // or
        // <Input label="Visible only on mobile" className="lg:label:hidden" />
        "data-label": "true",
        ...props,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cx"])("flex cursor-default items-center gap-0.5 text-sm font-medium text-secondary", className),
        children: [
            props.children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cx"])("hidden text-brand-tertiary", isRequired && "block", typeof isRequired === "undefined" && "group-required:block"),
                children: "*"
            }, void 0, false, {
                fileName: "[project]/src/components/base/input/label.tsx",
                lineNumber: 31,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            tooltip && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$tooltip$2f$tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                title: tooltip,
                description: tooltipDescription,
                placement: "top",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$tooltip$2f$tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TooltipTrigger"], {
                    // `TooltipTrigger` inherits the disabled state from the parent form field
                    // but we don't that. We want the tooltip be enabled even if the parent
                    // field is disabled.
                    isDisabled: false,
                    className: "cursor-pointer text-fg-quaternary transition duration-200 hover:text-fg-quaternary_hover focus:text-fg-quaternary_hover",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$untitledui$2f$icons$2f$dist$2f$HelpCircle$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HelpCircle"], {
                        className: "size-4"
                    }, void 0, false, {
                        fileName: "[project]/src/components/base/input/label.tsx",
                        lineNumber: 42,
                        columnNumber: 25
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/base/input/label.tsx",
                    lineNumber: 35,
                    columnNumber: 21
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/base/input/label.tsx",
                lineNumber: 34,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/base/input/label.tsx",
        lineNumber: 20,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
Label.displayName = "Label";
}),
"[project]/src/components/base/input/input.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Input",
    ()=>Input,
    "InputBase",
    ()=>InputBase,
    "TextField",
    ()=>TextField
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$untitledui$2f$icons$2f$dist$2f$HelpCircle$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@untitledui/icons/dist/HelpCircle.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$untitledui$2f$icons$2f$dist$2f$InfoCircle$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@untitledui/icons/dist/InfoCircle.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$Group$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-aria-components/dist/Group.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$Input$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-aria-components/dist/Input.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$TextField$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-aria-components/dist/TextField.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$input$2f$hint$2d$text$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/base/input/hint-text.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$input$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/base/input/label.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$tooltip$2f$tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/base/tooltip/tooltip.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/cx.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
const InputBase = ({ ref, tooltip, shortcut, groupRef, size = "sm", isInvalid, isDisabled, icon: Icon, placeholder, wrapperClassName, tooltipClassName, inputClassName, iconClassName, // Omit this prop to avoid invalid HTML attribute warning
isRequired: _isRequired, ...inputProps })=>{
    // Check if the input has a leading icon or tooltip
    const hasTrailingIcon = tooltip || isInvalid;
    const hasLeadingIcon = Icon;
    // If the input is inside a `TextFieldContext`, use its context to simplify applying styles
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(TextFieldContext);
    const inputSize = context?.size || size;
    const sizes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sortCx"])({
        sm: {
            root: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cx"])("px-3 py-2", hasTrailingIcon && "pr-9", hasLeadingIcon && "pl-10"),
            iconLeading: "left-3",
            iconTrailing: "right-3",
            shortcut: "pr-2.5"
        },
        md: {
            root: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cx"])("px-3.5 py-2.5", hasTrailingIcon && "pr-9.5", hasLeadingIcon && "pl-10.5"),
            iconLeading: "left-3.5",
            iconTrailing: "right-3.5",
            shortcut: "pr-3"
        }
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$Group$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Group"], {
        isDisabled,
        isInvalid,
        ref: groupRef,
        className: ({ isFocusWithin, isDisabled, isInvalid })=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cx"])("relative flex w-full flex-row place-content-center place-items-center rounded-lg bg-primary shadow-xs ring-1 ring-primary transition-shadow duration-100 ease-linear ring-inset", isFocusWithin && !isDisabled && "ring-2 ring-brand", // Disabled state styles
            isDisabled && "cursor-not-allowed bg-disabled_subtle ring-disabled", "group-disabled:cursor-not-allowed group-disabled:bg-disabled_subtle group-disabled:ring-disabled", // Invalid state styles
            isInvalid && "ring-error_subtle", "group-invalid:ring-error_subtle", // Invalid state with focus-within styles
            isInvalid && isFocusWithin && "ring-2 ring-error", isFocusWithin && "group-invalid:ring-2 group-invalid:ring-error", context?.wrapperClassName, wrapperClassName),
        children: [
            Icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cx"])("pointer-events-none absolute size-5 text-fg-quaternary", isDisabled && "text-fg-disabled", sizes[inputSize].iconLeading, context?.iconClassName, iconClassName)
            }, void 0, false, {
                fileName: "[project]/src/components/base/input/input.tsx",
                lineNumber: 109,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$Input$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                ...inputProps,
                ref: ref,
                placeholder: placeholder,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cx"])("m-0 w-full bg-transparent text-md text-primary ring-0 outline-hidden placeholder:text-placeholder autofill:rounded-lg autofill:text-primary", isDisabled && "cursor-not-allowed text-disabled", sizes[inputSize].root, context?.inputClassName, inputClassName)
            }, void 0, false, {
                fileName: "[project]/src/components/base/input/input.tsx",
                lineNumber: 121,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            tooltip && !isInvalid && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$tooltip$2f$tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                title: tooltip,
                placement: "top",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$tooltip$2f$tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TooltipTrigger"], {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cx"])("absolute cursor-pointer text-fg-quaternary transition duration-200 hover:text-fg-quaternary_hover focus:text-fg-quaternary_hover", sizes[inputSize].iconTrailing, context?.tooltipClassName, tooltipClassName),
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$untitledui$2f$icons$2f$dist$2f$HelpCircle$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HelpCircle"], {
                        className: "size-4"
                    }, void 0, false, {
                        fileName: "[project]/src/components/base/input/input.tsx",
                        lineNumber: 145,
                        columnNumber: 25
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/base/input/input.tsx",
                    lineNumber: 137,
                    columnNumber: 21
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/base/input/input.tsx",
                lineNumber: 136,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0)),
            isInvalid && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$untitledui$2f$icons$2f$dist$2f$InfoCircle$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InfoCircle"], {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cx"])("pointer-events-none absolute size-4 text-fg-error-secondary", sizes[inputSize].iconTrailing, context?.tooltipClassName, tooltipClassName)
            }, void 0, false, {
                fileName: "[project]/src/components/base/input/input.tsx",
                lineNumber: 152,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0)),
            shortcut && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cx"])("pointer-events-none absolute inset-y-0.5 right-0.5 z-10 flex items-center rounded-r-[inherit] bg-linear-to-r from-transparent to-bg-primary to-40% pl-8", sizes[inputSize].shortcut),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cx"])("pointer-events-none rounded px-1 py-px text-xs font-medium text-quaternary ring-1 ring-secondary select-none ring-inset", isDisabled && "bg-transparent text-disabled"),
                    "aria-hidden": "true",
                    children: typeof shortcut === "string" ? shortcut : "⌘K"
                }, void 0, false, {
                    fileName: "[project]/src/components/base/input/input.tsx",
                    lineNumber: 170,
                    columnNumber: 21
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/base/input/input.tsx",
                lineNumber: 164,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/base/input/input.tsx",
        lineNumber: 81,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
InputBase.displayName = "InputBase";
const TextFieldContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])({});
const TextField = ({ className, ...props })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TextFieldContext.Provider, {
        value: props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$TextField$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TextField"], {
            ...props,
            "data-input-wrapper": true,
            className: (state)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cx"])("group flex h-max w-full flex-col items-start justify-start gap-1.5", typeof className === "function" ? className(state) : className)
        }, void 0, false, {
            fileName: "[project]/src/components/base/input/input.tsx",
            lineNumber: 206,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/base/input/input.tsx",
        lineNumber: 205,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
TextField.displayName = "TextField";
const Input = ({ size = "sm", placeholder, icon: Icon, label, hint, shortcut, hideRequiredIndicator, className, ref, groupRef, tooltip, iconClassName, inputClassName, wrapperClassName, tooltipClassName, ...props })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TextField, {
        "aria-label": !label ? placeholder : undefined,
        ...props,
        className: className,
        children: ({ isRequired, isInvalid })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    label && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$input$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                        isRequired: hideRequiredIndicator ? !hideRequiredIndicator : isRequired,
                        children: label
                    }, void 0, false, {
                        fileName: "[project]/src/components/base/input/input.tsx",
                        lineNumber: 246,
                        columnNumber: 31
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InputBase, {
                        ref,
                        groupRef,
                        size,
                        placeholder,
                        icon: Icon,
                        shortcut,
                        iconClassName,
                        inputClassName,
                        wrapperClassName,
                        tooltipClassName,
                        tooltip
                    }, void 0, false, {
                        fileName: "[project]/src/components/base/input/input.tsx",
                        lineNumber: 248,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0)),
                    hint && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$input$2f$hint$2d$text$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HintText"], {
                        isInvalid: isInvalid,
                        children: hint
                    }, void 0, false, {
                        fileName: "[project]/src/components/base/input/input.tsx",
                        lineNumber: 264,
                        columnNumber: 30
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true)
    }, void 0, false, {
        fileName: "[project]/src/components/base/input/input.tsx",
        lineNumber: 243,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
Input.displayName = "Input";
}),
"[project]/src/components/base/textarea/textarea.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TextArea",
    ()=>TextArea,
    "TextAreaBase",
    ()=>TextAreaBase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$TextArea$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-aria-components/dist/TextArea.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$TextField$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-aria-components/dist/TextField.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$input$2f$hint$2d$text$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/base/input/hint-text.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$input$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/base/input/label.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/cx.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
// Creates a data URL for an SVG resize handle with a given color.
const getResizeHandleBg = (color)=>{
    return `url(data:image/svg+xml;base64,${btoa(`<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 2L2 10" stroke="${color}" stroke-linecap="round"/><path d="M11 7L7 11" stroke="${color}" stroke-linecap="round"/></svg>`)})`;
};
const TextAreaBase = ({ className, ...props })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$TextArea$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TextArea"], {
        ...props,
        style: {
            "--resize-handle-bg": getResizeHandleBg("#D5D7DA"),
            "--resize-handle-bg-dark": getResizeHandleBg("#373A41")
        },
        className: (state)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cx"])("w-full scroll-py-3 rounded-lg bg-primary px-3.5 py-3 text-md text-primary shadow-xs ring-1 ring-primary transition duration-100 ease-linear ring-inset placeholder:text-placeholder autofill:rounded-lg autofill:text-primary focus:outline-hidden", // Resize handle
            "[&::-webkit-resizer]:bg-(image:--resize-handle-bg) [&::-webkit-resizer]:bg-contain dark:[&::-webkit-resizer]:bg-(image:--resize-handle-bg-dark)", state.isFocused && !state.isDisabled && "ring-2 ring-brand", state.isDisabled && "cursor-not-allowed bg-disabled_subtle text-disabled ring-disabled", state.isInvalid && "ring-error_subtle", state.isInvalid && state.isFocused && "ring-2 ring-error", typeof className === "function" ? className(state) : className)
    }, void 0, false, {
        fileName: "[project]/src/components/base/textarea/textarea.tsx",
        lineNumber: 22,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
TextAreaBase.displayName = "TextAreaBase";
const TextArea = ({ label, hint, tooltip, textAreaRef, hideRequiredIndicator, textAreaClassName, placeholder, className, rows, cols, ...props })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$TextField$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TextField"], {
        ...props,
        className: (state)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cx"])("group flex h-max w-full flex-col items-start justify-start gap-1.5", typeof className === "function" ? className(state) : className),
        children: ({ isInvalid, isRequired })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    label && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$input$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                        isRequired: hideRequiredIndicator ? !hideRequiredIndicator : isRequired,
                        tooltip: tooltip,
                        children: label
                    }, void 0, false, {
                        fileName: "[project]/src/components/base/textarea/textarea.tsx",
                        lineNumber: 97,
                        columnNumber: 25
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TextAreaBase, {
                        placeholder: placeholder,
                        className: textAreaClassName,
                        ref: textAreaRef,
                        rows: rows,
                        cols: cols
                    }, void 0, false, {
                        fileName: "[project]/src/components/base/textarea/textarea.tsx",
                        lineNumber: 102,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0)),
                    hint && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$input$2f$hint$2d$text$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HintText"], {
                        isInvalid: isInvalid,
                        children: hint
                    }, void 0, false, {
                        fileName: "[project]/src/components/base/textarea/textarea.tsx",
                        lineNumber: 104,
                        columnNumber: 30
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true)
    }, void 0, false, {
        fileName: "[project]/src/components/base/textarea/textarea.tsx",
        lineNumber: 88,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
TextArea.displayName = "TextArea";
}),
"[project]/src/components/base/avatar/base-components/avatar-add-button.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AvatarAddButton",
    ()=>AvatarAddButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$untitledui$2f$icons$2f$dist$2f$Plus$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@untitledui/icons/dist/Plus.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$tooltip$2f$tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/base/tooltip/tooltip.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/cx.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const sizes = {
    xs: {
        root: "size-6",
        icon: "size-4"
    },
    sm: {
        root: "size-8",
        icon: "size-4"
    },
    md: {
        root: "size-10",
        icon: "size-5"
    }
};
const AvatarAddButton = ({ size, className, title = "Add user", ...props })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$tooltip$2f$tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
        title: title,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$tooltip$2f$tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TooltipTrigger"], {
            ...props,
            "aria-label": title,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cx"])("flex cursor-pointer items-center justify-center rounded-full border border-dashed border-primary bg-primary text-fg-quaternary outline-focus-ring transition duration-100 ease-linear hover:bg-primary_hover hover:text-fg-quaternary_hover focus-visible:outline-2 focus-visible:outline-offset-2 disabled:border-gray-200 disabled:bg-secondary disabled:text-gray-200", sizes[size].root, className),
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$untitledui$2f$icons$2f$dist$2f$Plus$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Plus"], {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cx"])("text-current transition-inherit-all", sizes[size].icon)
            }, void 0, false, {
                fileName: "[project]/src/components/base/avatar/base-components/avatar-add-button.tsx",
                lineNumber: 31,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/components/base/avatar/base-components/avatar-add-button.tsx",
            lineNumber: 22,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/base/avatar/base-components/avatar-add-button.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
}),
"[project]/src/components/base/avatar/base-components/avatar-company-icon.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AvatarCompanyIcon",
    ()=>AvatarCompanyIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/cx.ts [app-ssr] (ecmascript)");
"use client";
;
;
const sizes = {
    xs: "size-2",
    sm: "size-3",
    md: "size-3.5",
    lg: "size-4",
    xl: "size-4.5",
    "2xl": "size-5 ring-[1.67px]"
};
const AvatarCompanyIcon = ({ size, src, alt })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
        src: src,
        alt: alt,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cx"])("bg-primary-25 absolute -right-0.5 -bottom-0.5 rounded-full object-cover ring-[1.5px] ring-bg-primary", sizes[size])
    }, void 0, false, {
        fileName: "[project]/src/components/base/avatar/base-components/avatar-company-icon.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
}),
"[project]/src/components/base/avatar/base-components/avatar-online-indicator.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AvatarOnlineIndicator",
    ()=>AvatarOnlineIndicator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/cx.ts [app-ssr] (ecmascript)");
"use client";
;
;
const sizes = {
    xs: "size-1.5",
    sm: "size-2",
    md: "size-2.5",
    lg: "size-3",
    xl: "size-3.5",
    "2xl": "size-4",
    "3xl": "size-4.5",
    "4xl": "size-5"
};
const AvatarOnlineIndicator = ({ size, status, className })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cx"])("absolute right-0 bottom-0 rounded-full ring-[1.5px] ring-bg-primary", status === "online" ? "bg-fg-success-secondary" : "bg-fg-disabled_subtle", sizes[size], className)
    }, void 0, false, {
        fileName: "[project]/src/components/base/avatar/base-components/avatar-online-indicator.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
}),
"[project]/src/components/base/avatar/base-components/verified-tick.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VerifiedTick",
    ()=>VerifiedTick
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/cx.ts [app-ssr] (ecmascript)");
"use client";
;
;
const sizes = {
    xs: {
        root: "size-2.5",
        tick: "size-[4.38px"
    },
    sm: {
        root: "size-3",
        tick: "size-[5.25px]"
    },
    md: {
        root: "size-3.5",
        tick: "size-[6.13px]"
    },
    lg: {
        root: "size-4",
        tick: "size-[7px]"
    },
    xl: {
        root: "size-4.5",
        tick: "size-[7.88px]"
    },
    "2xl": {
        root: "size-5",
        tick: "size-[8.75px]"
    },
    "3xl": {
        root: "size-6",
        tick: "size-[10.5px]"
    },
    "4xl": {
        root: "size-8",
        tick: "size-[14px]"
    }
};
const VerifiedTick = ({ size, className })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        "data-verified": true,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cx"])("z-10 text-utility-blue-500", sizes[size].root, className),
        viewBox: "0 0 10 10",
        fill: "none",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M7.72237 1.77098C7.81734 2.00068 7.99965 2.18326 8.2292 2.27858L9.03413 2.61199C9.26384 2.70714 9.44635 2.88965 9.5415 3.11936C9.63665 3.34908 9.63665 3.60718 9.5415 3.83689L9.20833 4.64125C9.11313 4.87106 9.113 5.12943 9.20863 5.35913L9.54122 6.16325C9.58839 6.27702 9.61268 6.39897 9.6127 6.52214C9.61272 6.6453 9.58847 6.76726 9.54134 6.88105C9.4942 6.99484 9.42511 7.09823 9.33801 7.18531C9.2509 7.27238 9.14749 7.34144 9.03369 7.38854L8.22934 7.72171C7.99964 7.81669 7.81706 7.99899 7.72174 8.22855L7.38833 9.03348C7.29318 9.26319 7.11067 9.4457 6.88096 9.54085C6.65124 9.636 6.39314 9.636 6.16343 9.54085L5.35907 9.20767C5.12935 9.11276 4.87134 9.11295 4.64177 9.20821L3.83684 9.54115C3.60725 9.63608 3.34937 9.636 3.11984 9.54092C2.89032 9.44585 2.70791 9.26356 2.6127 9.03409L2.27918 8.22892C2.18421 7.99923 2.0019 7.81665 1.77235 7.72133L0.967421 7.38792C0.737807 7.29281 0.555355 7.11041 0.460169 6.88083C0.364983 6.65125 0.364854 6.39327 0.45981 6.16359L0.792984 5.35924C0.8879 5.12952 0.887707 4.87151 0.792445 4.64193L0.459749 3.83642C0.41258 3.72265 0.388291 3.60069 0.388272 3.47753C0.388252 3.35436 0.412501 3.2324 0.459634 3.11861C0.506767 3.00482 0.57586 2.90144 0.662965 2.81436C0.75007 2.72728 0.853479 2.65822 0.967283 2.61113L1.77164 2.27795C2.00113 2.18306 2.1836 2.00099 2.27899 1.7717L2.6124 0.966768C2.70755 0.737054 2.89006 0.554547 3.11978 0.459397C3.34949 0.364246 3.60759 0.364246 3.83731 0.459397L4.64166 0.792571C4.87138 0.887487 5.12939 0.887293 5.35897 0.792031L6.16424 0.459913C6.39392 0.364816 6.65197 0.364836 6.88164 0.459968C7.11131 0.555099 7.29379 0.737554 7.38895 0.967208L7.72247 1.77238L7.72237 1.77098Z",
                className: "fill-current"
            }, void 0, false, {
                fileName: "[project]/src/components/base/avatar/base-components/verified-tick.tsx",
                lineNumber: 23,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M6.95829 3.68932C7.02509 3.58439 7.04747 3.45723 7.02051 3.3358C6.99356 3.21437 6.91946 3.10862 6.81454 3.04182C6.70961 2.97502 6.58245 2.95264 6.46102 2.97959C6.33959 3.00655 6.23384 3.08064 6.16704 3.18557L4.33141 6.06995L3.49141 5.01995C3.41375 4.92281 3.30069 4.8605 3.17709 4.84673C3.05349 4.83296 2.92949 4.86885 2.83235 4.94651C2.73522 5.02417 2.67291 5.13723 2.65914 5.26083C2.64536 5.38443 2.68125 5.50843 2.75891 5.60557L4.00891 7.16807C4.0555 7.22638 4.11533 7.27271 4.18344 7.30323C4.25154 7.33375 4.32595 7.34757 4.40047 7.34353C4.47499 7.3395 4.54747 7.31773 4.61188 7.28004C4.67629 7.24234 4.73077 7.18981 4.77079 7.12682L6.95829 3.68932Z",
                fill: "white"
            }, void 0, false, {
                fileName: "[project]/src/components/base/avatar/base-components/verified-tick.tsx",
                lineNumber: 27,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/base/avatar/base-components/verified-tick.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
}),
"[project]/src/components/base/avatar/base-components/index.tsx [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$avatar$2f$base$2d$components$2f$avatar$2d$add$2d$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/base/avatar/base-components/avatar-add-button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$avatar$2f$base$2d$components$2f$avatar$2d$company$2d$icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/base/avatar/base-components/avatar-company-icon.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$avatar$2f$base$2d$components$2f$avatar$2d$online$2d$indicator$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/base/avatar/base-components/avatar-online-indicator.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$avatar$2f$base$2d$components$2f$verified$2d$tick$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/base/avatar/base-components/verified-tick.tsx [app-ssr] (ecmascript)");
;
;
;
;
}),
"[project]/src/components/base/avatar/avatar.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Avatar",
    ()=>Avatar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$untitledui$2f$icons$2f$dist$2f$User01$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@untitledui/icons/dist/User01.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/cx.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$avatar$2f$base$2d$components$2f$index$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/components/base/avatar/base-components/index.tsx [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$avatar$2f$base$2d$components$2f$avatar$2d$online$2d$indicator$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/base/avatar/base-components/avatar-online-indicator.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$avatar$2f$base$2d$components$2f$verified$2d$tick$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/base/avatar/base-components/verified-tick.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
const styles = {
    xxs: {
        root: "size-4 outline-[0.5px] -outline-offset-[0.5px]",
        initials: "text-xs font-semibold",
        icon: "size-3"
    },
    xs: {
        root: "size-6 outline-[0.5px] -outline-offset-[0.5px]",
        initials: "text-xs font-semibold",
        icon: "size-4"
    },
    sm: {
        root: "size-8 outline-[0.75px] -outline-offset-[0.75px]",
        initials: "text-sm font-semibold",
        icon: "size-5"
    },
    md: {
        root: "size-10 outline-1 -outline-offset-1",
        initials: "text-md font-semibold",
        icon: "size-6"
    },
    lg: {
        root: "size-12 outline-1 -outline-offset-1",
        initials: "text-lg font-semibold",
        icon: "size-7"
    },
    xl: {
        root: "size-14 outline-1 -outline-offset-1",
        initials: "text-xl font-semibold",
        icon: "size-8"
    },
    "2xl": {
        root: "size-16 outline-1 -outline-offset-1",
        initials: "text-display-xs font-semibold",
        icon: "size-8"
    }
};
const Avatar = ({ contrastBorder = true, size = "md", src, alt, initials, placeholder, placeholderIcon: PlaceholderIcon, badge, status, verified, focusable = false, className })=>{
    const [isFailed, setIsFailed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const renderMainContent = ()=>{
        if (src && !isFailed) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                "data-avatar-img": true,
                className: "size-full rounded-full object-cover",
                src: src,
                alt: alt,
                onError: ()=>setIsFailed(true)
            }, void 0, false, {
                fileName: "[project]/src/components/base/avatar/avatar.tsx",
                lineNumber: 84,
                columnNumber: 20
            }, ("TURBOPACK compile-time value", void 0));
        }
        if (initials) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cx"])("text-quaternary", styles[size].initials),
                children: initials
            }, void 0, false, {
                fileName: "[project]/src/components/base/avatar/avatar.tsx",
                lineNumber: 88,
                columnNumber: 20
            }, ("TURBOPACK compile-time value", void 0));
        }
        if (PlaceholderIcon) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PlaceholderIcon, {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cx"])("text-fg-quaternary", styles[size].icon)
            }, void 0, false, {
                fileName: "[project]/src/components/base/avatar/avatar.tsx",
                lineNumber: 92,
                columnNumber: 20
            }, ("TURBOPACK compile-time value", void 0));
        }
        return placeholder || /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$untitledui$2f$icons$2f$dist$2f$User01$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["User01"], {
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cx"])("text-fg-quaternary", styles[size].icon)
        }, void 0, false, {
            fileName: "[project]/src/components/base/avatar/avatar.tsx",
            lineNumber: 95,
            columnNumber: 31
        }, ("TURBOPACK compile-time value", void 0));
    };
    const renderBadgeContent = ()=>{
        if (status) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$avatar$2f$base$2d$components$2f$avatar$2d$online$2d$indicator$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AvatarOnlineIndicator"], {
                status: status,
                size: size === "xxs" ? "xs" : size
            }, void 0, false, {
                fileName: "[project]/src/components/base/avatar/avatar.tsx",
                lineNumber: 100,
                columnNumber: 20
            }, ("TURBOPACK compile-time value", void 0));
        }
        if (verified) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$avatar$2f$base$2d$components$2f$verified$2d$tick$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VerifiedTick"], {
                size: size === "xxs" ? "xs" : size,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cx"])("absolute right-0 bottom-0", (size === "xxs" || size === "xs") && "-right-px -bottom-px")
            }, void 0, false, {
                fileName: "[project]/src/components/base/avatar/avatar.tsx",
                lineNumber: 105,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0));
        }
        return badge;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-avatar": true,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cx"])("relative inline-flex shrink-0 items-center justify-center rounded-full bg-avatar-bg outline-transparent", // Focus styles
        focusable && "group-outline-focus-ring group-focus-visible:outline-2 group-focus-visible:outline-offset-2", contrastBorder && "outline outline-avatar-contrast-border", styles[size].root, className),
        children: [
            renderMainContent(),
            renderBadgeContent()
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/base/avatar/avatar.tsx",
        lineNumber: 116,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/src/components/base/select/popover.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Popover",
    ()=>Popover
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$Popover$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-aria-components/dist/Popover.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/cx.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
const Popover = (props)=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$Popover$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Popover"], {
        placement: "bottom",
        containerPadding: 0,
        offset: 4,
        ...props,
        className: (state)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cx"])("max-h-64! w-(--trigger-width) origin-(--trigger-anchor-point) overflow-x-hidden overflow-y-auto rounded-lg bg-primary py-1 shadow-lg ring-1 ring-secondary_alt outline-hidden will-change-transform", state.isEntering && "duration-150 ease-out animate-in fade-in placement-right:slide-in-from-left-0.5 placement-top:slide-in-from-bottom-0.5 placement-bottom:slide-in-from-top-0.5", state.isExiting && "duration-100 ease-in animate-out fade-out placement-right:slide-out-to-left-0.5 placement-top:slide-out-to-bottom-0.5 placement-bottom:slide-out-to-top-0.5", props.size === "md" && "max-h-80!", typeof props.className === "function" ? props.className(state) : props.className)
    }, void 0, false, {
        fileName: "[project]/src/components/base/select/popover.tsx",
        lineNumber: 14,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/src/hooks/use-resize-observer.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useResizeObserver",
    ()=>useResizeObserver
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
/**
 * Checks if the ResizeObserver API is supported.
 * @returns True if the ResizeObserver API is supported, false otherwise.
 */ function hasResizeObserver() {
    return typeof window.ResizeObserver !== "undefined";
}
function useResizeObserver(options) {
    const { ref, box, onResize } = options;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const element = ref?.current;
        if (!element) {
            return;
        }
        if (!hasResizeObserver()) {
            window.addEventListener("resize", onResize, false);
            return ()=>{
                window.removeEventListener("resize", onResize, false);
            };
        } else {
            const resizeObserverInstance = new window.ResizeObserver((entries)=>{
                if (!entries.length) {
                    return;
                }
                onResize();
            });
            resizeObserverInstance.observe(element, {
                box
            });
            return ()=>{
                if (element) {
                    resizeObserverInstance.unobserve(element);
                }
            };
        }
    }, [
        onResize,
        ref,
        box
    ]);
}
}),
"[project]/src/components/base/select/combobox.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ComboBox",
    ()=>ComboBox
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$untitledui$2f$icons$2f$dist$2f$SearchLg$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@untitledui/icons/dist/SearchLg.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$ComboBox$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-aria-components/dist/ComboBox.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$Group$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-aria-components/dist/Group.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$Input$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-aria-components/dist/Input.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$ListBox$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-aria-components/dist/ListBox.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$input$2f$hint$2d$text$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/base/input/hint-text.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$input$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/base/input/label.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$select$2f$popover$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/base/select/popover.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$select$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/base/select/select.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$resize$2d$observer$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-resize-observer.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/cx.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
;
const ComboBoxValue = ({ size, shortcut, placeholder, shortcutClassName, ...otherProps })=>{
    const state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$ComboBox$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ComboBoxStateContext"]);
    const value = state?.selectedItem?.value || null;
    const inputValue = state?.inputValue || null;
    const first = inputValue?.split(value?.supportingText)?.[0] || "";
    const last = inputValue?.split(first)[1];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$Group$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Group"], {
        ...otherProps,
        className: ({ isFocusWithin, isDisabled })=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cx"])("relative flex w-full items-center gap-2 rounded-lg bg-primary shadow-xs ring-1 ring-primary outline-hidden transition-shadow duration-100 ease-linear ring-inset", isDisabled && "cursor-not-allowed bg-disabled_subtle", isFocusWithin && "ring-2 ring-brand", __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$select$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sizes"][size].root),
        children: ({ isDisabled })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$untitledui$2f$icons$2f$dist$2f$SearchLg$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SearchLg"], {
                        className: "pointer-events-none size-5 shrink-0 text-fg-quaternary"
                    }, void 0, false, {
                        fileName: "[project]/src/components/base/select/combobox.tsx",
                        lineNumber: 56,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative flex w-full items-center gap-2",
                        children: [
                            inputValue && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "absolute top-1/2 z-0 inline-flex w-full -translate-y-1/2 gap-2 truncate",
                                "aria-hidden": "true",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cx"])("text-md font-medium text-primary", isDisabled && "text-disabled"),
                                        children: first
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/base/select/combobox.tsx",
                                        lineNumber: 61,
                                        columnNumber: 33
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    last && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cx"])("-ml-0.75 text-md text-tertiary", isDisabled && "text-disabled"),
                                        children: last
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/base/select/combobox.tsx",
                                        lineNumber: 62,
                                        columnNumber: 42
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/base/select/combobox.tsx",
                                lineNumber: 60,
                                columnNumber: 29
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$Input$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                placeholder: placeholder,
                                className: "z-10 w-full appearance-none bg-transparent text-md text-transparent caret-alpha-black/90 placeholder:text-placeholder focus:outline-hidden disabled:cursor-not-allowed disabled:text-disabled disabled:placeholder:text-disabled"
                            }, void 0, false, {
                                fileName: "[project]/src/components/base/select/combobox.tsx",
                                lineNumber: 66,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/base/select/combobox.tsx",
                        lineNumber: 58,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0)),
                    shortcut && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cx"])("absolute inset-y-0.5 right-0.5 z-10 flex items-center rounded-r-[inherit] bg-linear-to-r from-transparent to-bg-primary to-40% pl-8", isDisabled && "to-bg-disabled_subtle", __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$select$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sizes"][size].shortcut, shortcutClassName),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cx"])("pointer-events-none rounded px-1 py-px text-xs font-medium text-quaternary ring-1 ring-secondary select-none ring-inset", isDisabled && "bg-transparent text-disabled"),
                            "aria-hidden": "true",
                            children: "⌘K"
                        }, void 0, false, {
                            fileName: "[project]/src/components/base/select/combobox.tsx",
                            lineNumber: 81,
                            columnNumber: 29
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/base/select/combobox.tsx",
                        lineNumber: 73,
                        columnNumber: 25
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true)
    }, void 0, false, {
        fileName: "[project]/src/components/base/select/combobox.tsx",
        lineNumber: 43,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
const ComboBox = ({ placeholder = "Search", shortcut = true, size = "sm", children, items, shortcutClassName, ...otherProps })=>{
    const placeholderRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [popoverWidth, setPopoverWidth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    // Resize observer for popover width
    const onResize = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (!placeholderRef.current) return;
        const divRect = placeholderRef.current?.getBoundingClientRect();
        setPopoverWidth(divRect.width + "px");
    }, [
        placeholderRef,
        setPopoverWidth
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$resize$2d$observer$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useResizeObserver"])({
        ref: placeholderRef,
        box: "border-box",
        onResize
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$select$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectContext"].Provider, {
        value: {
            size
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$ComboBox$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ComboBox"], {
            menuTrigger: "focus",
            ...otherProps,
            children: (state)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-1.5",
                    children: [
                        otherProps.label && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$input$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                            isRequired: state.isRequired,
                            tooltip: otherProps.tooltip,
                            children: otherProps.label
                        }, void 0, false, {
                            fileName: "[project]/src/components/base/select/combobox.tsx",
                            lineNumber: 123,
                            columnNumber: 29
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ComboBoxValue, {
                            ref: placeholderRef,
                            placeholder: placeholder,
                            shortcut: shortcut,
                            shortcutClassName: shortcutClassName,
                            size: size,
                            // This is a workaround to correctly calculating the trigger width
                            // while using ResizeObserver wasn't 100% reliable.
                            onFocus: onResize,
                            onPointerEnter: onResize
                        }, void 0, false, {
                            fileName: "[project]/src/components/base/select/combobox.tsx",
                            lineNumber: 128,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$select$2f$popover$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Popover"], {
                            size: size,
                            triggerRef: placeholderRef,
                            style: {
                                width: popoverWidth
                            },
                            className: otherProps.popoverClassName,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$ListBox$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ListBox"], {
                                items: items,
                                className: "size-full outline-hidden",
                                children: children
                            }, void 0, false, {
                                fileName: "[project]/src/components/base/select/combobox.tsx",
                                lineNumber: 141,
                                columnNumber: 29
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/base/select/combobox.tsx",
                            lineNumber: 140,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0)),
                        otherProps.hint && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$input$2f$hint$2d$text$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HintText"], {
                            isInvalid: state.isInvalid,
                            children: otherProps.hint
                        }, void 0, false, {
                            fileName: "[project]/src/components/base/select/combobox.tsx",
                            lineNumber: 146,
                            columnNumber: 45
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/base/select/combobox.tsx",
                    lineNumber: 121,
                    columnNumber: 21
                }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/components/base/select/combobox.tsx",
            lineNumber: 119,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/base/select/combobox.tsx",
        lineNumber: 118,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/src/components/base/select/select-item.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SelectItem",
    ()=>SelectItem
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$untitledui$2f$icons$2f$dist$2f$Check$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@untitledui/icons/dist/Check.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$ListBox$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-aria-components/dist/ListBox.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$Text$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-aria-components/dist/Text.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$avatar$2f$avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/base/avatar/avatar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/cx.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$is$2d$react$2d$component$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/is-react-component.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$select$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/base/select/select.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
const sizes = {
    sm: "p-2 pr-2.5",
    md: "p-2.5 pl-2"
};
const SelectItem = ({ label, id, value, avatarUrl, supportingText, isDisabled, icon: Icon, className, children, ...props })=>{
    const { size } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$select$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectContext"]);
    const labelOrChildren = label || (typeof children === "string" ? children : "");
    const textValue = supportingText ? labelOrChildren + " " + supportingText : labelOrChildren;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$ListBox$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ListBoxItem"], {
        id: id,
        value: value ?? {
            id,
            label: labelOrChildren,
            avatarUrl,
            supportingText,
            isDisabled,
            icon: Icon
        },
        textValue: textValue,
        isDisabled: isDisabled,
        ...props,
        className: (state)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cx"])("w-full px-1.5 py-px outline-hidden", typeof className === "function" ? className(state) : className),
        children: (state)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cx"])("flex cursor-pointer items-center gap-2 rounded-md outline-hidden select-none", state.isSelected && "bg-active", state.isDisabled && "cursor-not-allowed", state.isFocused && "bg-primary_hover", state.isFocusVisible && "ring-2 ring-focus-ring ring-inset", // Icon styles
                "*:data-icon:size-5 *:data-icon:shrink-0 *:data-icon:text-fg-quaternary", state.isDisabled && "*:data-icon:text-fg-disabled", sizes[size]),
                children: [
                    avatarUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$avatar$2f$avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Avatar"], {
                        "aria-hidden": "true",
                        size: "xs",
                        src: avatarUrl,
                        alt: label
                    }, void 0, false, {
                        fileName: "[project]/src/components/base/select/select-item.tsx",
                        lineNumber: 61,
                        columnNumber: 25
                    }, ("TURBOPACK compile-time value", void 0)) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$is$2d$react$2d$component$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isReactComponent"])(Icon) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                        "data-icon": true,
                        "aria-hidden": "true"
                    }, void 0, false, {
                        fileName: "[project]/src/components/base/select/select-item.tsx",
                        lineNumber: 63,
                        columnNumber: 25
                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isValidElement"])(Icon) ? Icon : null,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex w-full min-w-0 flex-1 flex-wrap gap-x-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$Text$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
                                slot: "label",
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cx"])("truncate text-md font-medium whitespace-nowrap text-primary", state.isDisabled && "text-disabled"),
                                children: label || (typeof children === "function" ? children(state) : children)
                            }, void 0, false, {
                                fileName: "[project]/src/components/base/select/select-item.tsx",
                                lineNumber: 69,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0)),
                            supportingText && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$Text$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
                                slot: "description",
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cx"])("text-md whitespace-nowrap text-tertiary", state.isDisabled && "text-disabled"),
                                children: supportingText
                            }, void 0, false, {
                                fileName: "[project]/src/components/base/select/select-item.tsx",
                                lineNumber: 77,
                                columnNumber: 29
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/base/select/select-item.tsx",
                        lineNumber: 68,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0)),
                    state.isSelected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$untitledui$2f$icons$2f$dist$2f$Check$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Check"], {
                        "aria-hidden": "true",
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cx"])("ml-auto text-fg-brand-primary", size === "sm" ? "size-4 stroke-[2.5px]" : "size-5", state.isDisabled && "text-fg-disabled")
                    }, void 0, false, {
                        fileName: "[project]/src/components/base/select/select-item.tsx",
                        lineNumber: 84,
                        columnNumber: 25
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/base/select/select-item.tsx",
                lineNumber: 45,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/base/select/select-item.tsx",
        lineNumber: 27,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/src/components/base/select/select.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Select",
    ()=>_Select,
    "SelectContext",
    ()=>SelectContext,
    "sizes",
    ()=>sizes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$untitledui$2f$icons$2f$dist$2f$ChevronDown$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@untitledui/icons/dist/ChevronDown.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$Button$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-aria-components/dist/Button.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$ListBox$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-aria-components/dist/ListBox.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$Select$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-aria-components/dist/Select.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$avatar$2f$avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/base/avatar/avatar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$input$2f$hint$2d$text$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/base/input/hint-text.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$input$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/base/input/label.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/cx.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$is$2d$react$2d$component$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/is-react-component.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$select$2f$combobox$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/base/select/combobox.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$select$2f$popover$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/base/select/popover.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$select$2f$select$2d$item$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/base/select/select-item.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
const sizes = {
    sm: {
        root: "py-2 px-3",
        shortcut: "pr-2.5"
    },
    md: {
        root: "py-2.5 px-3.5",
        shortcut: "pr-3"
    }
};
const SelectValue = ({ isOpen, isFocused, isDisabled, size, placeholder, placeholderIcon, ref })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$Button$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cx"])("relative flex w-full cursor-pointer items-center rounded-lg bg-primary shadow-xs ring-1 ring-primary outline-hidden transition duration-100 ease-linear ring-inset", (isFocused || isOpen) && "ring-2 ring-brand", isDisabled && "cursor-not-allowed bg-disabled_subtle text-disabled"),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$Select$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectValue"], {
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cx"])("flex h-max w-full items-center justify-start gap-2 truncate text-left align-middle", // Icon styles
            "*:data-icon:size-5 *:data-icon:shrink-0 *:data-icon:text-fg-quaternary in-disabled:*:data-icon:text-fg-disabled", sizes[size].root),
            children: (state)=>{
                const Icon = state.selectedItem?.icon || placeholderIcon;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        state.selectedItem?.avatarUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$avatar$2f$avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Avatar"], {
                            size: "xs",
                            src: state.selectedItem.avatarUrl,
                            alt: state.selectedItem.label
                        }, void 0, false, {
                            fileName: "[project]/src/components/base/select/select.tsx",
                            lineNumber: 81,
                            columnNumber: 33
                        }, ("TURBOPACK compile-time value", void 0)) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$is$2d$react$2d$component$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isReactComponent"])(Icon) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                            "data-icon": true,
                            "aria-hidden": "true"
                        }, void 0, false, {
                            fileName: "[project]/src/components/base/select/select.tsx",
                            lineNumber: 83,
                            columnNumber: 33
                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isValidElement"])(Icon) ? Icon : null,
                        state.selectedItem ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            className: "flex w-full gap-2 truncate",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "truncate text-md font-medium text-primary",
                                    children: state.selectedItem?.label
                                }, void 0, false, {
                                    fileName: "[project]/src/components/base/select/select.tsx",
                                    lineNumber: 90,
                                    columnNumber: 37
                                }, ("TURBOPACK compile-time value", void 0)),
                                state.selectedItem?.supportingText && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-md text-tertiary",
                                    children: state.selectedItem?.supportingText
                                }, void 0, false, {
                                    fileName: "[project]/src/components/base/select/select.tsx",
                                    lineNumber: 91,
                                    columnNumber: 76
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/base/select/select.tsx",
                            lineNumber: 89,
                            columnNumber: 33
                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cx"])("text-md text-placeholder", isDisabled && "text-disabled"),
                            children: placeholder
                        }, void 0, false, {
                            fileName: "[project]/src/components/base/select/select.tsx",
                            lineNumber: 94,
                            columnNumber: 33
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$untitledui$2f$icons$2f$dist$2f$ChevronDown$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChevronDown"], {
                            "aria-hidden": "true",
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cx"])("ml-auto shrink-0 text-fg-quaternary", size === "sm" ? "size-4 stroke-[2.5px]" : "size-5")
                        }, void 0, false, {
                            fileName: "[project]/src/components/base/select/select.tsx",
                            lineNumber: 97,
                            columnNumber: 29
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true);
            }
        }, void 0, false, {
            fileName: "[project]/src/components/base/select/select.tsx",
            lineNumber: 66,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/base/select/select.tsx",
        lineNumber: 58,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
const SelectContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])({
    size: "sm"
});
const Select = ({ placeholder = "Select", placeholderIcon, size = "sm", children, items, label, hint, tooltip, className, ...rest })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectContext.Provider, {
        value: {
            size
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$Select$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
            ...rest,
            className: (state)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cx"])("flex flex-col gap-1.5", typeof className === "function" ? className(state) : className),
            children: (state)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        label && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$input$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                            isRequired: state.isRequired,
                            tooltip: tooltip,
                            children: label
                        }, void 0, false, {
                            fileName: "[project]/src/components/base/select/select.tsx",
                            lineNumber: 118,
                            columnNumber: 29
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectValue, {
                            ...state,
                            size,
                            placeholder,
                            placeholderIcon: placeholderIcon
                        }, void 0, false, {
                            fileName: "[project]/src/components/base/select/select.tsx",
                            lineNumber: 123,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$select$2f$popover$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Popover"], {
                            size: size,
                            className: rest.popoverClassName,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$ListBox$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ListBox"], {
                                items: items,
                                className: "size-full outline-hidden",
                                children: children
                            }, void 0, false, {
                                fileName: "[project]/src/components/base/select/select.tsx",
                                lineNumber: 126,
                                columnNumber: 29
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/base/select/select.tsx",
                            lineNumber: 125,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0)),
                        hint && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$input$2f$hint$2d$text$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HintText"], {
                            isInvalid: state.isInvalid,
                            children: hint
                        }, void 0, false, {
                            fileName: "[project]/src/components/base/select/select.tsx",
                            lineNumber: 131,
                            columnNumber: 34
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true)
        }, void 0, false, {
            fileName: "[project]/src/components/base/select/select.tsx",
            lineNumber: 114,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/base/select/select.tsx",
        lineNumber: 113,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
const _Select = Select;
_Select.ComboBox = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$select$2f$combobox$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ComboBox"];
_Select.Item = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$select$2f$select$2d$item$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"];
;
}),
"[project]/src/components/base/radio-buttons/radio-buttons.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RadioButton",
    ()=>RadioButton,
    "RadioButtonBase",
    ()=>RadioButtonBase,
    "RadioGroup",
    ()=>RadioGroup
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$RadioGroup$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-aria-components/dist/RadioGroup.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/cx.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const RadioGroupContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
const RadioButtonBase = ({ className, isFocusVisible, isSelected, isDisabled, size = "sm" })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cx"])("flex size-4 min-h-4 min-w-4 cursor-pointer appearance-none items-center justify-center rounded-full bg-primary ring-1 ring-primary ring-inset", size === "md" && "size-5 min-h-5 min-w-5", isSelected && !isDisabled && "bg-brand-solid ring-bg-brand-solid", isDisabled && "cursor-not-allowed border-disabled bg-disabled_subtle", isFocusVisible && "outline-2 outline-offset-2 outline-focus-ring", className),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cx"])("size-1.5 rounded-full bg-fg-white opacity-0 transition-inherit-all", size === "md" && "size-2", isDisabled && "bg-fg-disabled_subtle", isSelected && "opacity-100")
        }, void 0, false, {
            fileName: "[project]/src/components/base/radio-buttons/radio-buttons.tsx",
            lineNumber: 38,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/base/radio-buttons/radio-buttons.tsx",
        lineNumber: 28,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
RadioButtonBase.displayName = "RadioButtonBase";
const RadioButton = ({ label, hint, className, size = "sm", hideIndicator, ...ariaRadioProps })=>{
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(RadioGroupContext);
    size = context?.size ?? size;
    const sizes = {
        sm: {
            root: "gap-2",
            textWrapper: "",
            label: "text-sm font-medium",
            hint: "text-sm"
        },
        md: {
            root: "gap-3",
            textWrapper: "gap-0.5",
            label: "text-md font-medium",
            hint: "text-md"
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$RadioGroup$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Radio"], {
        ...ariaRadioProps,
        className: (renderProps)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cx"])("flex items-start", renderProps.isDisabled && "cursor-not-allowed", sizes[size].root, typeof className === "function" ? className(renderProps) : className),
        children: ({ isSelected, isDisabled, isFocusVisible })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    !hideIndicator && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RadioButtonBase, {
                        size: size,
                        isSelected: isSelected,
                        isDisabled: isDisabled,
                        isFocusVisible: isFocusVisible,
                        className: label || hint ? "mt-0.5" : ""
                    }, void 0, false, {
                        fileName: "[project]/src/components/base/radio-buttons/radio-buttons.tsx",
                        lineNumber: 94,
                        columnNumber: 25
                    }, ("TURBOPACK compile-time value", void 0)),
                    (label || hint) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cx"])("inline-flex flex-col", sizes[size].textWrapper),
                        children: [
                            label && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cx"])("text-secondary select-none", sizes[size].label),
                                children: label
                            }, void 0, false, {
                                fileName: "[project]/src/components/base/radio-buttons/radio-buttons.tsx",
                                lineNumber: 104,
                                columnNumber: 39
                            }, ("TURBOPACK compile-time value", void 0)),
                            hint && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cx"])("text-tertiary", sizes[size].hint),
                                onClick: (event)=>event.stopPropagation(),
                                children: hint
                            }, void 0, false, {
                                fileName: "[project]/src/components/base/radio-buttons/radio-buttons.tsx",
                                lineNumber: 106,
                                columnNumber: 33
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/base/radio-buttons/radio-buttons.tsx",
                        lineNumber: 103,
                        columnNumber: 25
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true)
    }, void 0, false, {
        fileName: "[project]/src/components/base/radio-buttons/radio-buttons.tsx",
        lineNumber: 80,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
RadioButton.displayName = "RadioButton";
const RadioGroup = ({ children, className, size = "sm", ...props })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RadioGroupContext.Provider, {
        value: {
            size
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$RadioGroup$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RadioGroup"], {
            ...props,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cx"])("flex flex-col gap-4", className),
            children: children
        }, void 0, false, {
            fileName: "[project]/src/components/base/radio-buttons/radio-buttons.tsx",
            lineNumber: 127,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/base/radio-buttons/radio-buttons.tsx",
        lineNumber: 126,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/src/app/[username]/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProfilePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$buttons$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/base/buttons/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$buttons$2f$button$2d$utility$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/base/buttons/button-utility.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$untitledui$2f$icons$2f$dist$2f$Share04$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@untitledui/icons/dist/Share04.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$untitledui$2f$icons$2f$dist$2f$Sun$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@untitledui/icons/dist/Sun.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$untitledui$2f$icons$2f$dist$2f$Moon01$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@untitledui/icons/dist/Moon01.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$Dialog$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-aria-components/dist/Dialog.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$Modal$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-aria-components/dist/Modal.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$input$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/base/input/input.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$textarea$2f$textarea$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/base/textarea/textarea.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$select$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/base/select/select.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$radio$2d$buttons$2f$radio$2d$buttons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/base/radio-buttons/radio-buttons.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-themes/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/api.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
function toCta(v) {
    return v === "pay" ? "pay" : v === "request" ? "request" : v === "request_pay_later" ? "request_pay_later" : null;
}
function PaymentBottomSheet({ isOpen, onOpenChange, name, upiId }) {
    const pa = encodeURIComponent(upiId || "");
    const pn = encodeURIComponent(name || "");
    const phonePe = `phonepe://pay?pa=${pa}&pn=${pn}&cu=INR`;
    const googlePay = `tez://upi/pay?pa=${pa}&pn=${pn}&cu=INR`;
    const whatsappPay = `upi://pay?pa=${pa}&pn=${pn}&cu=INR`;
    const disabled = !upiId;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$Dialog$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogTrigger"], {
        isOpen: isOpen,
        onOpenChange: onOpenChange,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$buttons$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                slot: "trigger",
                className: "hidden",
                children: "Open"
            }, void 0, false, {
                fileName: "[project]/src/app/[username]/page.tsx",
                lineNumber: 50,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$Modal$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ModalOverlay"], {
                isDismissable: true,
                className: ({ isEntering, isExiting })=>`fixed inset-0 z-50 bg-overlay/40 backdrop-blur-sm ${isEntering ? "duration-150 ease-out animate-in fade-in" : ""} ${isExiting ? "duration-100 ease-in animate-out fade-out" : ""}`,
                children: ({ state })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$Modal$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Modal"], {
                        className: "w-full cursor-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$Dialog$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Dialog"], {
                            "aria-label": "Make a Payment",
                            className: "fixed inset-x-0 bottom-0 mx-auto w-[min(92vw,640px)] max-h-[80vh] overflow-y-auto rounded-t-2xl bg-primary shadow-xl ring-1 ring-secondary_alt focus:outline-hidden",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between border-b border-secondary px-4 py-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex min-w-0 flex-col",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "text-lg font-semibold text-primary",
                                                    children: "Make a Payment"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/[username]/page.tsx",
                                                    lineNumber: 62,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-tertiary",
                                                    children: "Choose your payment app"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/[username]/page.tsx",
                                                    lineNumber: 63,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/[username]/page.tsx",
                                            lineNumber: 61,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$buttons$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                            size: "sm",
                                            onClick: ()=>state.close(),
                                            children: "Close"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/[username]/page.tsx",
                                            lineNumber: 65,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/[username]/page.tsx",
                                    lineNumber: 60,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "px-4 py-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-3 gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                disabled: disabled,
                                                onClick: ()=>{
                                                    if (!disabled) window.location.href = phonePe;
                                                },
                                                className: "flex flex-col items-center gap-2 rounded-xl bg-primary p-4 ring-1 ring-secondary_alt disabled:opacity-50",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: "/phonepe-icon.png",
                                                        alt: "PhonePe",
                                                        className: "size-10"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/[username]/page.tsx",
                                                        lineNumber: 74,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-sm font-medium text-primary",
                                                        children: "PhonePe"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/[username]/page.tsx",
                                                        lineNumber: 75,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/[username]/page.tsx",
                                                lineNumber: 69,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                disabled: disabled,
                                                onClick: ()=>{
                                                    if (!disabled) window.location.href = googlePay;
                                                },
                                                className: "flex flex-col items-center gap-2 rounded-xl bg-primary p-4 ring-1 ring-secondary_alt disabled:opacity-50",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: "/google-pay-icon.png",
                                                        alt: "Google Pay",
                                                        className: "size-10"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/[username]/page.tsx",
                                                        lineNumber: 82,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-sm font-medium text-primary",
                                                        children: "G Pay"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/[username]/page.tsx",
                                                        lineNumber: 83,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/[username]/page.tsx",
                                                lineNumber: 77,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                disabled: disabled,
                                                onClick: ()=>{
                                                    if (!disabled) window.location.href = whatsappPay;
                                                },
                                                className: "flex flex-col items-center gap-2 rounded-xl bg-primary p-4 ring-1 ring-secondary_alt disabled:opacity-50",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: "/whatsapp.png",
                                                        alt: "WhatsApp Pay",
                                                        className: "size-10 rounded"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/[username]/page.tsx",
                                                        lineNumber: 90,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-sm font-medium text-primary",
                                                        children: "UPI Pay"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/[username]/page.tsx",
                                                        lineNumber: 91,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/[username]/page.tsx",
                                                lineNumber: 85,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/[username]/page.tsx",
                                        lineNumber: 68,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/[username]/page.tsx",
                                    lineNumber: 67,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/[username]/page.tsx",
                            lineNumber: 59,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/[username]/page.tsx",
                        lineNumber: 58,
                        columnNumber: 21
                    }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/[username]/page.tsx",
                lineNumber: 51,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/[username]/page.tsx",
        lineNumber: 49,
        columnNumber: 9
    }, this);
}
function ProfilePage() {
    const [username, setUsername] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useParams"])();
    const [isLandscape, setIsLandscape] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let alive = true;
        (async ()=>{
            try {
                if (username) return;
                const fromRoute = params?.username ? String(params.username) : "";
                if (fromRoute && fromRoute.trim()) {
                    setUsername(fromRoute.trim());
                    return;
                }
                try {
                    const stored = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : null;
                    if (stored && stored.trim()) //TURBOPACK unreachable
                    ;
                } catch  {}
                let token = null;
                let userId = null;
                if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                ;
                if (!token || !userId) return;
                const me = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].get(`/users/id/${userId}`, {
                    token
                });
                if (!alive) return;
                setUsername(me.username);
            } catch  {
                if (!alive) return;
            }
        })();
        return ()=>{
            alive = false;
        };
    }, [
        params,
        username
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let q = null;
        const update = ()=>{
            try {
                const m = window.matchMedia("(orientation: landscape)");
                q = m;
                setIsLandscape(Boolean(m.matches));
            } catch  {}
        };
        update();
        const handler = ()=>update();
        try {
            window.addEventListener("orientationchange", handler);
            window.addEventListener("resize", handler);
        } catch  {}
        return ()=>{
            try {
                window.removeEventListener("orientationchange", handler);
                window.removeEventListener("resize", handler);
            } catch  {}
        };
    }, []);
    const [profile, setProfile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [offers, setOffers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [links, setLinks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [payEnabled, setPayEnabled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [upiId, setUpiId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [contactMethod, setContactMethod] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("whatsapp");
    const [contactEmail, setContactEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [contactWhatsapp, setContactWhatsapp] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [portfolioItems, setPortfolioItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!username) return;
        let alive = true;
        (async ()=>{
            try {
                const endpoint = `/users/${username}/profile`;
                const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].get(endpoint);
                if (!alive) return;
                setProfile(res.profile);
                setOffers(res.offers.map((o)=>({
                        title: o.title,
                        description: o.description || null,
                        priceType: o.priceType === "fixed" ? "fixed" : o.priceType === "starting" ? "starting" : "custom",
                        price: o.price,
                        cta: toCta(o.cta),
                        delivery: o.delivery || null,
                        includes: Array.isArray(o.includes) ? o.includes : []
                    })));
                setLinks(res.links.map((l)=>({
                        platform: l.platform,
                        icon: l.icon,
                        url: l.url
                    })));
                setPayEnabled(Boolean(res.payment?.payEnabled));
                setUpiId(res.payment?.upiId || "");
                const method = res.contact?.method || (res.contact?.whatsapp ? "whatsapp" : "email");
                setContactMethod(method);
                setContactEmail(res.contact?.email || "");
                setContactWhatsapp(res.contact?.whatsapp || "");
                setPortfolioItems(Array.isArray(res.portfolio) ? res.portfolio : []);
                try {
                    const origin = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : "";
                    const url = `${origin}/${username}`;
                    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].post(`/users/${username}/analytics/view`, {
                        url
                    }).catch(()=>{});
                } catch  {}
            } catch  {
                if (!alive) return;
            }
        })();
        return ()=>{
            alive = false;
        };
    }, [
        username
    ]);
    const [publicData, setPublicData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [publicError, setPublicError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!username) return;
        const url = `http://192.168.0.6:3000/${encodeURIComponent(username)}`;
        console.group("PUBLIC_PROFILE_GET");
        console.log("REQUEST GET", url);
        console.groupEnd();
        let alive = true;
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].get(url).then((data)=>{
            if (!alive) return;
            console.group("PUBLIC_PROFILE_RESPONSE");
            console.log("BODY", data);
            console.groupEnd();
            setPublicData(data);
            setPublicError(null);
        }).catch((err)=>{
            if (!alive) return;
            setPublicError(String(err?.message || "Error"));
        });
        return ()=>{
            alive = false;
        };
    }, [
        username
    ]);
    const [requestOpen, setRequestOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [prefillService, setPrefillService] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const openRequest = (service)=>{
        setPrefillService(service || null);
        setRequestOpen(true);
    };
    const [paymentOpen, setPaymentOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const openPayment = ()=>setPaymentOpen(true);
    const [requestSuccessOpen, setRequestSuccessOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [requestSuccessService, setRequestSuccessService] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            isLandscape && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 flex items-center justify-center bg-black/70",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-4 w-full max-w-sm rounded-2xl bg-primary p-4 text-center shadow-xl ring-1 ring-secondary_alt",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-md font-semibold text-primary",
                            children: "Please rotate your device to portrait"
                        }, void 0, false, {
                            fileName: "[project]/src/app/[username]/page.tsx",
                            lineNumber: 260,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-1 text-sm text-tertiary",
                            children: "This page is optimized for portrait orientation."
                        }, void 0, false, {
                            fileName: "[project]/src/app/[username]/page.tsx",
                            lineNumber: 261,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/[username]/page.tsx",
                    lineNumber: 259,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/[username]/page.tsx",
                lineNumber: 258,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "lg:hidden flex min-h-screen pt-5  bg-linear-to-br from-[#ffffff] via-[#F4EBFF] to-[#ffffff] dark:bg-linear-to-br dark:from-[#0d1117] dark:via-[#42307D] dark:to-[#000000] px-4 pb-20 overflow-y-auto scrollbar-hide",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ProfileCard, {
                        username: username,
                        profile: profile,
                        payEnabled: payEnabled,
                        upiId: upiId,
                        offers: offers,
                        links: links,
                        portfolio: portfolioItems,
                        onRequest: openRequest
                    }, void 0, false, {
                        fileName: "[project]/src/app/[username]/page.tsx",
                        lineNumber: 267,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PrimaryCTAStrip, {
                        username: username,
                        payEnabled: payEnabled,
                        upiId: upiId,
                        contactMethod: contactMethod,
                        email: contactEmail,
                        whatsapp: contactWhatsapp,
                        variant: "mobile",
                        onRequest: openRequest,
                        onPay: openPayment
                    }, void 0, false, {
                        fileName: "[project]/src/app/[username]/page.tsx",
                        lineNumber: 268,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/[username]/page.tsx",
                lineNumber: 265,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "hidden lg:flex min-h-screen items-center justify-center bg-linear-to-br from-[#ffffff] via-[#F4EBFF] to-[#ffffff] dark:bg-linear-to-br dark:from-[#0d1117] dark:via-[#42307D] dark:to-[#000000] px-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto w-full max-w-4xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-2xl bg-primary p-4 ring-1 ring-secondary_alt",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ProfileCard, {
                                username: username,
                                profile: profile,
                                payEnabled: payEnabled,
                                upiId: upiId,
                                offers: offers,
                                links: links,
                                portfolio: portfolioItems,
                                onRequest: openRequest
                            }, void 0, false, {
                                fileName: "[project]/src/app/[username]/page.tsx",
                                lineNumber: 273,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/[username]/page.tsx",
                            lineNumber: 272,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PrimaryCTAStrip, {
                                username: username,
                                payEnabled: payEnabled,
                                upiId: upiId,
                                contactMethod: contactMethod,
                                email: contactEmail,
                                whatsapp: contactWhatsapp,
                                variant: "mobile",
                                onRequest: openRequest,
                                onPay: openPayment
                            }, void 0, false, {
                                fileName: "[project]/src/app/[username]/page.tsx",
                                lineNumber: 276,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/[username]/page.tsx",
                            lineNumber: 275,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/[username]/page.tsx",
                    lineNumber: 271,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/[username]/page.tsx",
                lineNumber: 270,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RequestServiceBottomSheet, {
                isOpen: requestOpen,
                onOpenChange: setRequestOpen,
                username: username,
                services: offers.map((o)=>o.title),
                offers: offers,
                prefillService: prefillService,
                onSuccess: (service)=>{
                    setRequestSuccessService(service || "");
                    setRequestSuccessOpen(true);
                }
            }, void 0, false, {
                fileName: "[project]/src/app/[username]/page.tsx",
                lineNumber: 281,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PaymentBottomSheet, {
                isOpen: paymentOpen,
                onOpenChange: setPaymentOpen,
                name: profile?.name || username,
                upiId: upiId
            }, void 0, false, {
                fileName: "[project]/src/app/[username]/page.tsx",
                lineNumber: 293,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RequestSuccessBottomSheet, {
                isOpen: requestSuccessOpen,
                onOpenChange: setRequestSuccessOpen,
                username: username,
                service: requestSuccessService,
                contactMethod: contactMethod,
                email: contactEmail,
                whatsapp: contactWhatsapp
            }, void 0, false, {
                fileName: "[project]/src/app/[username]/page.tsx",
                lineNumber: 299,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true);
}
function ProfileCard({ username, profile, payEnabled, upiId, offers, links, portfolio, onRequest }) {
    const { resolvedTheme, setTheme } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTheme"])();
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>setMounted(true), []);
    const isDark = mounted && resolvedTheme === "dark";
    const themeLabel = isDark ? "Switch to light" : "Switch to dark";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full max-w-sm",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative flex flex-col gap-3 rounded-2xl bg-primary p-0 pb-5 shadow-none",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative h-44 w-full overflow-hidden rounded-t-2xl sm:h-56",
                        children: [
                            profile?.avatarUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: profile.avatarUrl,
                                loading: "lazy",
                                alt: "Avatar",
                                className: "size-full object-cover"
                            }, void 0, false, {
                                fileName: "[project]/src/app/[username]/page.tsx",
                                lineNumber: 323,
                                columnNumber: 25
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "size-full bg-primary_hover animate-pulse"
                            }, void 0, false, {
                                fileName: "[project]/src/app/[username]/page.tsx",
                                lineNumber: 325,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-x-0 bottom-0 h-28 bg-linear-to-b from-transparent to-primary dark:to-[#0b0f14]"
                            }, void 0, false, {
                                fileName: "[project]/src/app/[username]/page.tsx",
                                lineNumber: 327,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute left-3 top-3",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "inline-flex items-center justify-center rounded-md bg-primary/75 backdrop-blur p-1.5 shadow-xs",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: isDark ? "/faviconwhite.png" : "/favicon.png",
                                        alt: "Brand",
                                        className: "size-5",
                                        onError: (e)=>{
                                            e.currentTarget.src = "/faviconwhite.png";
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/[username]/page.tsx",
                                        lineNumber: 330,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/[username]/page.tsx",
                                    lineNumber: 329,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/[username]/page.tsx",
                                lineNumber: 328,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute right-3 top-3",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$buttons$2f$button$2d$utility$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ButtonUtility"], {
                                            tooltip: "Share profile",
                                            size: "sm",
                                            color: "secondary",
                                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$untitledui$2f$icons$2f$dist$2f$Share04$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Share04"],
                                            onClick: ()=>{
                                                const url = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : `/${username}`;
                                                const text = `Check out ${username}'s profile`;
                                                if (typeof navigator !== "undefined" && navigator.share) {
                                                    navigator.share({
                                                        title: text,
                                                        text,
                                                        url
                                                    }).catch(()=>{});
                                                } else {
                                                    const wa = `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`;
                                                    window.open(wa, "_blank");
                                                }
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/[username]/page.tsx",
                                            lineNumber: 342,
                                            columnNumber: 29
                                        }, this),
                                        mounted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$buttons$2f$button$2d$utility$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ButtonUtility"], {
                                            tooltip: themeLabel,
                                            size: "sm",
                                            color: "secondary",
                                            icon: isDark ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$untitledui$2f$icons$2f$dist$2f$Sun$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Sun"] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$untitledui$2f$icons$2f$dist$2f$Moon01$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Moon01"],
                                            onClick: ()=>setTheme(isDark ? "light" : "dark")
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/[username]/page.tsx",
                                            lineNumber: 361,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/[username]/page.tsx",
                                    lineNumber: 341,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/[username]/page.tsx",
                                lineNumber: 340,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/[username]/page.tsx",
                        lineNumber: 321,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-6 pb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col items-center gap-1",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-3xl sm:text-4xl font-semibold leading-tight tracking-tight text-primary text-center",
                                    children: profile?.name || username
                                }, void 0, false, {
                                    fileName: "[project]/src/app/[username]/page.tsx",
                                    lineNumber: 374,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/[username]/page.tsx",
                                lineNumber: 373,
                                columnNumber: 21
                            }, this),
                            profile?.bio && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-sm text-tertiary text-center",
                                children: truncateBio(profile.bio)
                            }, void 0, false, {
                                fileName: "[project]/src/app/[username]/page.tsx",
                                lineNumber: 377,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/[username]/page.tsx",
                        lineNumber: 372,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-1 flex items-center justify-center gap-2",
                        children: links.length > 0 ? links.map((l)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: l.url,
                                target: "_blank",
                                rel: "noopener noreferrer",
                                "aria-label": l.platform,
                                className: "rounded-full bg-primary_hover p-2 ring-1 ring-secondary_alt transition-colors hover:bg-primary",
                                onClick: ()=>{
                                    try {
                                        const payload = {
                                            category: "social",
                                            label: l.platform,
                                            url: l.url
                                        };
                                        const endpoint = `${("TURBOPACK compile-time value", "https://newyearbackendcode-zrp62.ondigitalocean.app")}/users/${encodeURIComponent(username)}/analytics/click`;
                                        const blob = new Blob([
                                            JSON.stringify(payload)
                                        ], {
                                            type: "application/json"
                                        });
                                        if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
                                            navigator.sendBeacon(endpoint, blob);
                                        } else {
                                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].post(`/users/${username}/analytics/click`, payload).catch(()=>{});
                                        }
                                    } catch  {}
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: l.icon,
                                    alt: l.platform,
                                    className: "size-5"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/[username]/page.tsx",
                                    lineNumber: 403,
                                    columnNumber: 29
                                }, this)
                            }, `${l.platform}:${l.url}`, false, {
                                fileName: "[project]/src/app/[username]/page.tsx",
                                lineNumber: 383,
                                columnNumber: 25
                            }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-full bg-primary_hover p-2 ring-1 ring-secondary_alt size-9 animate-pulse"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/[username]/page.tsx",
                                    lineNumber: 408,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-full bg-primary_hover p-2 ring-1 ring-secondary_alt size-9 animate-pulse"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/[username]/page.tsx",
                                    lineNumber: 409,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-full bg-primary_hover p-2 ring-1 ring-secondary_alt size-9 animate-pulse"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/[username]/page.tsx",
                                    lineNumber: 410,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-full bg-primary_hover p-2 ring-1 ring-secondary_alt size-9 animate-pulse"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/[username]/page.tsx",
                                    lineNumber: 411,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true)
                    }, void 0, false, {
                        fileName: "[project]/src/app/[username]/page.tsx",
                        lineNumber: 380,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/[username]/page.tsx",
                lineNumber: 320,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ProfileServices, {
                username: username,
                payEnabled: payEnabled,
                upiId: upiId,
                offers: offers,
                onRequest: onRequest
            }, void 0, false, {
                fileName: "[project]/src/app/[username]/page.tsx",
                lineNumber: 416,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ProfilePortfolio, {
                username: username,
                items: portfolio
            }, void 0, false, {
                fileName: "[project]/src/app/[username]/page.tsx",
                lineNumber: 417,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ProfileFooter, {}, void 0, false, {
                fileName: "[project]/src/app/[username]/page.tsx",
                lineNumber: 418,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/[username]/page.tsx",
        lineNumber: 319,
        columnNumber: 9
    }, this);
}
function truncateBio(text) {
    const max = 150;
    return text.length > max ? text.slice(0, max - 1) + "…" : text;
}
function ProfileServices({ username, payEnabled, upiId, offers, onRequest }) {
    const formatINR = new Intl.NumberFormat("en-IN");
    const labelFor = (o)=>{
        if (o.priceType === "fixed" && typeof o.price === "number") return `₹${formatINR.format(o.price)}`;
        if (o.priceType === "starting" && typeof o.price === "number") return `Starting at ₹${formatINR.format(o.price)}`;
        return "Custom pricing";
    };
    const handlePay = (service, price)=>{
        if (!price || !payEnabled) return onRequest(service);
        const link = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(username)}&am=${encodeURIComponent(String(price))}&tn=${encodeURIComponent(service)}`;
        window.location.href = link;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-md font-semibold text-primary",
                children: "Services"
            }, void 0, false, {
                fileName: "[project]/src/app/[username]/page.tsx",
                lineNumber: 442,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "mt-2 flex flex-col gap-2",
                children: offers.length > 0 ? offers.map((o)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        className: "rounded-2xl bg-primary p-4 shadow-xs ring-1 ring-secondary_alt",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-start justify-between gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex min-w-0 flex-col",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "truncate text-sm font-semibold text-primary",
                                                children: o.title
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/[username]/page.tsx",
                                                lineNumber: 449,
                                                columnNumber: 37
                                            }, this),
                                            o.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "truncate text-sm text-tertiary",
                                                children: o.description
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/[username]/page.tsx",
                                                lineNumber: 450,
                                                columnNumber: 55
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/[username]/page.tsx",
                                        lineNumber: 448,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "shrink-0 text-right",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm font-medium text-primary",
                                            children: labelFor(o)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/[username]/page.tsx",
                                            lineNumber: 453,
                                            columnNumber: 37
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/[username]/page.tsx",
                                        lineNumber: 452,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/[username]/page.tsx",
                                lineNumber: 447,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-3",
                                children: o.cta === "pay" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$buttons$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                    size: "sm",
                                    color: "primary",
                                    className: "w-full",
                                    onClick: ()=>handlePay(o.title, o.price),
                                    children: "Pay Now"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/[username]/page.tsx",
                                    lineNumber: 458,
                                    columnNumber: 37
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$buttons$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                    size: "sm",
                                    color: "primary",
                                    className: "w-full",
                                    onClick: ()=>{
                                        try {
                                            const payload = {
                                                category: "request",
                                                label: o.title
                                            };
                                            const endpoint = `${("TURBOPACK compile-time value", "https://newyearbackendcode-zrp62.ondigitalocean.app")}/users/${encodeURIComponent(username)}/analytics/click`;
                                            const blob = new Blob([
                                                JSON.stringify(payload)
                                            ], {
                                                type: "application/json"
                                            });
                                            if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
                                                navigator.sendBeacon(endpoint, blob);
                                            } else {
                                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].post(`/users/${username}/analytics/click`, payload).catch(()=>{});
                                            }
                                        } catch  {}
                                        onRequest(o.title);
                                    },
                                    children: "Request Service"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/[username]/page.tsx",
                                    lineNumber: 462,
                                    columnNumber: 37
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/[username]/page.tsx",
                                lineNumber: 456,
                                columnNumber: 29
                            }, this)
                        ]
                    }, o.title, true, {
                        fileName: "[project]/src/app/[username]/page.tsx",
                        lineNumber: 446,
                        columnNumber: 25
                    }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            className: "rounded-2xl bg-primary p-4 shadow-xs ring-1 ring-secondary_alt",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-start justify-between gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex min-w-0 flex-col gap-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "h-4 w-36 bg-primary_hover rounded animate-pulse"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/[username]/page.tsx",
                                                    lineNumber: 491,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "h-3 w-56 bg-primary_hover rounded animate-pulse"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/[username]/page.tsx",
                                                    lineNumber: 492,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/[username]/page.tsx",
                                            lineNumber: 490,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "shrink-0",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-4 w-24 bg-primary_hover rounded animate-pulse"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/[username]/page.tsx",
                                                lineNumber: 495,
                                                columnNumber: 37
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/[username]/page.tsx",
                                            lineNumber: 494,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/[username]/page.tsx",
                                    lineNumber: 489,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-3",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-8 w-full bg-primary_hover rounded-md animate-pulse"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/[username]/page.tsx",
                                        lineNumber: 499,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/[username]/page.tsx",
                                    lineNumber: 498,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/[username]/page.tsx",
                            lineNumber: 488,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            className: "rounded-2xl bg-primary p-4 shadow-xs ring-1 ring-secondary_alt",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-start justify-between gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex min-w-0 flex-col gap-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "h-4 w-28 bg-primary_hover rounded animate-pulse"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/[username]/page.tsx",
                                                    lineNumber: 505,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "h-3 w-44 bg-primary_hover rounded animate-pulse"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/[username]/page.tsx",
                                                    lineNumber: 506,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/[username]/page.tsx",
                                            lineNumber: 504,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "shrink-0",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-4 w-20 bg-primary_hover rounded animate-pulse"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/[username]/page.tsx",
                                                lineNumber: 509,
                                                columnNumber: 37
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/[username]/page.tsx",
                                            lineNumber: 508,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/[username]/page.tsx",
                                    lineNumber: 503,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-3",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-8 w-full bg-primary_hover rounded-md animate-pulse"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/[username]/page.tsx",
                                        lineNumber: 513,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/[username]/page.tsx",
                                    lineNumber: 512,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/[username]/page.tsx",
                            lineNumber: 502,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true)
            }, void 0, false, {
                fileName: "[project]/src/app/[username]/page.tsx",
                lineNumber: 443,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/[username]/page.tsx",
        lineNumber: 441,
        columnNumber: 9
    }, this);
}
function ProfilePortfolio({ username, items }) {
    const iconFor = (p)=>{
        const map = {
            instagram: "/instagram.png",
            youtube: "/youtube.png",
            tiktok: "/tiktok.png",
            website: "/web.png"
        };
        return map[p] || "/web.png";
    };
    const urlFor = (it)=>it.fileUrl || it.externalUrl || "";
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [galleryOpen, setGalleryOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [active, setActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [wantAutoplay, setWantAutoplay] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-md font-semibold text-primary",
                        children: "Work & Collaborations"
                    }, void 0, false, {
                        fileName: "[project]/src/app/[username]/page.tsx",
                        lineNumber: 558,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$buttons$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        size: "sm",
                        color: "link-color",
                        onClick: ()=>setGalleryOpen(true),
                        children: "View all"
                    }, void 0, false, {
                        fileName: "[project]/src/app/[username]/page.tsx",
                        lineNumber: 559,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/[username]/page.tsx",
                lineNumber: 557,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-2 overflow-x-auto",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-2 snap-x snap-mandatory",
                    children: items.length > 0 ? items.map((it)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "snap-start w-36 sm:w-40 overflow-hidden rounded-xl ring-1 ring-secondary_alt bg-primary hover:bg-primary_hover",
                            onClick: ()=>{
                                setActive(it);
                                setWantAutoplay(it.contentType === "video");
                                setOpen(true);
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "aspect-square w-full overflow-hidden relative",
                                    children: [
                                        it.contentType === "video" && urlFor(it) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                                            src: urlFor(it),
                                            className: "size-full object-cover pointer-events-none",
                                            muted: true,
                                            playsInline: true,
                                            preload: "metadata",
                                            controlsList: "nodownload noplaybackrate",
                                            disablePictureInPicture: true,
                                            onContextMenu: (e)=>e.preventDefault()
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/[username]/page.tsx",
                                            lineNumber: 577,
                                            columnNumber: 41
                                        }, this) : it.contentType === "image" && urlFor(it) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: urlFor(it),
                                            alt: String(it.title || it.brand || it.platform || "Portfolio"),
                                            className: "size-full object-cover select-none",
                                            draggable: false,
                                            onContextMenu: (e)=>e.preventDefault()
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/[username]/page.tsx",
                                            lineNumber: 588,
                                            columnNumber: 41
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex size-full items-center justify-center bg-primary_hover",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: iconFor(String(it.platform || "website")),
                                                alt: String(it.platform || "website"),
                                                className: "size-10 opacity-90"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/[username]/page.tsx",
                                                lineNumber: 597,
                                                columnNumber: 45
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/[username]/page.tsx",
                                            lineNumber: 596,
                                            columnNumber: 41
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute inset-0 flex items-center justify-center",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$buttons$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                size: "sm",
                                                color: "secondary",
                                                className: "px-3",
                                                onClick: (e)=>{
                                                    e.stopPropagation();
                                                    setActive(it);
                                                    setWantAutoplay(it.contentType === "video");
                                                    setOpen(true);
                                                },
                                                children: it.contentType === "video" ? "Play" : "View"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/[username]/page.tsx",
                                                lineNumber: 601,
                                                columnNumber: 41
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/[username]/page.tsx",
                                            lineNumber: 600,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/[username]/page.tsx",
                                    lineNumber: 575,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between gap-2 px-2 py-1",
                                    children: [
                                        it.brand && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "truncate text-xs text-primary",
                                            children: it.brand
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/[username]/page.tsx",
                                            lineNumber: 617,
                                            columnNumber: 50
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: iconFor(String(it.platform || "website")),
                                            alt: "platform",
                                            className: "size-4 opacity-80"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/[username]/page.tsx",
                                            lineNumber: 618,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/[username]/page.tsx",
                                    lineNumber: 616,
                                    columnNumber: 33
                                }, this)
                            ]
                        }, it.id, true, {
                            fileName: "[project]/src/app/[username]/page.tsx",
                            lineNumber: 565,
                            columnNumber: 29
                        }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "snap-start w-36 sm:w-40 overflow-hidden rounded-xl ring-1 ring-secondary_alt bg-primary",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "aspect-square w-full bg-primary_hover animate-pulse"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/[username]/page.tsx",
                                        lineNumber: 625,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "px-2 py-1",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-3 w-24 bg-primary_hover rounded animate-pulse"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/[username]/page.tsx",
                                            lineNumber: 627,
                                            columnNumber: 37
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/[username]/page.tsx",
                                        lineNumber: 626,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/[username]/page.tsx",
                                lineNumber: 624,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "snap-start w-36 sm:w-40 overflow-hidden rounded-xl ring-1 ring-secondary_alt bg-primary",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "aspect-square w-full bg-primary_hover animate-pulse"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/[username]/page.tsx",
                                        lineNumber: 631,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "px-2 py-1",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-3 w-20 bg-primary_hover rounded animate-pulse"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/[username]/page.tsx",
                                            lineNumber: 633,
                                            columnNumber: 37
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/[username]/page.tsx",
                                        lineNumber: 632,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/[username]/page.tsx",
                                lineNumber: 630,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "snap-start w-36 sm:w-40 overflow-hidden rounded-xl ring-1 ring-secondary_alt bg-primary",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "aspect-square w-full bg-primary_hover animate-pulse"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/[username]/page.tsx",
                                        lineNumber: 637,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "px-2 py-1",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-3 w-16 bg-primary_hover rounded animate-pulse"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/[username]/page.tsx",
                                            lineNumber: 639,
                                            columnNumber: 37
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/[username]/page.tsx",
                                        lineNumber: 638,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/[username]/page.tsx",
                                lineNumber: 636,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true)
                }, void 0, false, {
                    fileName: "[project]/src/app/[username]/page.tsx",
                    lineNumber: 562,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/[username]/page.tsx",
                lineNumber: 561,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$Dialog$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogTrigger"], {
                isOpen: open,
                onOpenChange: setOpen,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$buttons$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        slot: "trigger",
                        className: "hidden",
                        children: "Open"
                    }, void 0, false, {
                        fileName: "[project]/src/app/[username]/page.tsx",
                        lineNumber: 648,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$Modal$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ModalOverlay"], {
                        isDismissable: true,
                        className: ({ isEntering, isExiting })=>`fixed inset-0 z-50 bg-overlay/50 backdrop-blur-md flex items-center justify-center p-4 ${isEntering ? "duration-150 ease-out animate-in fade-in" : ""} ${isExiting ? "duration-100 ease-in animate-out fade-out" : ""}`,
                        children: ({ state })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$Modal$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Modal"], {
                                className: "w-full cursor-auto",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$Dialog$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Dialog"], {
                                    "aria-label": "Portfolio item",
                                    className: "mx-auto w-[min(92vw,420px)] overflow-hidden rounded-[2rem] bg-primary shadow-2xl ring-1 ring-secondary_alt focus:outline-hidden",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between border-b border-secondary px-5 py-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-md font-semibold text-primary",
                                                    children: active?.brand || "Preview"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/[username]/page.tsx",
                                                    lineNumber: 659,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$buttons$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                        size: "sm",
                                                        onClick: ()=>state.close(),
                                                        children: "Back"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/[username]/page.tsx",
                                                        lineNumber: 661,
                                                        columnNumber: 41
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/[username]/page.tsx",
                                                    lineNumber: 660,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/[username]/page.tsx",
                                            lineNumber: 658,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-3",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mx-auto aspect-[9/19] w-full rounded-[1.5rem] ring-1 ring-secondary_alt overflow-hidden bg-primary",
                                                children: active ? active.contentType === "video" && urlFor(active) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                                                    src: urlFor(active),
                                                    className: "size-full object-cover",
                                                    autoPlay: wantAutoplay,
                                                    muted: true,
                                                    playsInline: true,
                                                    controlsList: "nodownload noplaybackrate",
                                                    disablePictureInPicture: true,
                                                    onContextMenu: (e)=>e.preventDefault()
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/[username]/page.tsx",
                                                    lineNumber: 668,
                                                    columnNumber: 45
                                                }, this) : active.contentType === "image" && urlFor(active) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: urlFor(active),
                                                    alt: String(active.title || active.brand || active.platform || "Portfolio"),
                                                    className: "size-full object-cover select-none",
                                                    draggable: false,
                                                    onContextMenu: (e)=>e.preventDefault()
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/[username]/page.tsx",
                                                    lineNumber: 679,
                                                    columnNumber: 45
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex size-full items-center justify-center",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: iconFor(String(active.platform || "website")),
                                                        alt: String(active.platform || "website"),
                                                        className: "size-16 opacity-90"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/[username]/page.tsx",
                                                        lineNumber: 688,
                                                        columnNumber: 49
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/[username]/page.tsx",
                                                    lineNumber: 687,
                                                    columnNumber: 45
                                                }, this) : null
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/[username]/page.tsx",
                                                lineNumber: 665,
                                                columnNumber: 37
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/[username]/page.tsx",
                                            lineNumber: 664,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/[username]/page.tsx",
                                    lineNumber: 657,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/[username]/page.tsx",
                                lineNumber: 656,
                                columnNumber: 25
                            }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/[username]/page.tsx",
                        lineNumber: 649,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/[username]/page.tsx",
                lineNumber: 647,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$Dialog$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogTrigger"], {
                isOpen: galleryOpen,
                onOpenChange: setGalleryOpen,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$buttons$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        slot: "trigger",
                        className: "hidden",
                        children: "Open"
                    }, void 0, false, {
                        fileName: "[project]/src/app/[username]/page.tsx",
                        lineNumber: 701,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$Modal$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ModalOverlay"], {
                        isDismissable: true,
                        className: ({ isEntering, isExiting })=>`fixed inset-0 z-50 bg-overlay/50 backdrop-blur-md ${isEntering ? "duration-150 ease-out animate-in fade-in" : ""} ${isExiting ? "duration-100 ease-in animate-out fade-out" : ""}`,
                        children: ({ state })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$Modal$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Modal"], {
                                className: "w-full cursor-auto",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$Dialog$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Dialog"], {
                                    "aria-label": "Portfolio gallery",
                                    className: "mx-auto my-8 w-[min(92vw,640px)] overflow-hidden rounded-2xl bg-primary shadow-xl ring-1 ring-secondary_alt focus:outline-hidden",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between border-b border-secondary px-4 py-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-md font-semibold text-primary",
                                                    children: "Work & Collaborations"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/[username]/page.tsx",
                                                    lineNumber: 712,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$buttons$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                    size: "sm",
                                                    onClick: ()=>state.close(),
                                                    children: "Close"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/[username]/page.tsx",
                                                    lineNumber: 713,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/[username]/page.tsx",
                                            lineNumber: 711,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-3",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-2 sm:grid-cols-3 gap-2",
                                                children: items.length > 0 ? items.map((it)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        className: "overflow-hidden rounded-xl ring-1 ring-secondary_alt bg-primary hover:bg-primary_hover",
                                                        onClick: ()=>{
                                                            setActive(it);
                                                            setWantAutoplay(it.contentType === "video");
                                                            setOpen(true);
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "aspect-square w-full overflow-hidden relative",
                                                                children: [
                                                                    it.contentType === "video" && urlFor(it) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                                                                        src: urlFor(it),
                                                                        className: "size-full object-cover pointer-events-none",
                                                                        muted: true,
                                                                        playsInline: true,
                                                                        preload: "metadata",
                                                                        controlsList: "nodownload noplaybackrate",
                                                                        disablePictureInPicture: true,
                                                                        onContextMenu: (e)=>e.preventDefault()
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/[username]/page.tsx",
                                                                        lineNumber: 731,
                                                                        columnNumber: 61
                                                                    }, this) : it.contentType === "image" && urlFor(it) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                        src: urlFor(it),
                                                                        alt: String(it.title || it.brand || it.platform || "Portfolio"),
                                                                        className: "size-full object-cover select-none",
                                                                        draggable: false,
                                                                        onContextMenu: (e)=>e.preventDefault()
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/[username]/page.tsx",
                                                                        lineNumber: 742,
                                                                        columnNumber: 61
                                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex size-full items-center justify-center bg-primary_hover",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                            src: iconFor(String(it.platform || "website")),
                                                                            alt: String(it.platform || "website"),
                                                                            className: "size-10 opacity-90"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/[username]/page.tsx",
                                                                            lineNumber: 751,
                                                                            columnNumber: 65
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/[username]/page.tsx",
                                                                        lineNumber: 750,
                                                                        columnNumber: 61
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "absolute inset-0 flex items-center justify-center",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$buttons$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                                            size: "sm",
                                                                            color: "secondary",
                                                                            className: "px-3",
                                                                            onClick: (e)=>{
                                                                                e.stopPropagation();
                                                                                setActive(it);
                                                                                setWantAutoplay(it.contentType === "video");
                                                                                setOpen(true);
                                                                            },
                                                                            children: it.contentType === "video" ? "Play" : "View"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/[username]/page.tsx",
                                                                            lineNumber: 755,
                                                                            columnNumber: 61
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/[username]/page.tsx",
                                                                        lineNumber: 754,
                                                                        columnNumber: 57
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/[username]/page.tsx",
                                                                lineNumber: 729,
                                                                columnNumber: 53
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center justify-between gap-2 px-2 py-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "truncate text-xs text-primary",
                                                                        children: it.brand || ""
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/[username]/page.tsx",
                                                                        lineNumber: 771,
                                                                        columnNumber: 57
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                        src: iconFor(String(it.platform || "website")),
                                                                        alt: "platform",
                                                                        className: "size-4 opacity-80"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/[username]/page.tsx",
                                                                        lineNumber: 772,
                                                                        columnNumber: 57
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/[username]/page.tsx",
                                                                lineNumber: 770,
                                                                columnNumber: 53
                                                            }, this)
                                                        ]
                                                    }, it.id, true, {
                                                        fileName: "[project]/src/app/[username]/page.tsx",
                                                        lineNumber: 719,
                                                        columnNumber: 49
                                                    }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "overflow-hidden rounded-xl ring-1 ring-secondary_alt bg-primary",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "aspect-square w-full bg-primary_hover animate-pulse"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/[username]/page.tsx",
                                                                    lineNumber: 779,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "px-2 py-1",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "h-3 w-24 bg-primary_hover rounded animate-pulse"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/[username]/page.tsx",
                                                                        lineNumber: 781,
                                                                        columnNumber: 57
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/[username]/page.tsx",
                                                                    lineNumber: 780,
                                                                    columnNumber: 53
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/[username]/page.tsx",
                                                            lineNumber: 778,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "overflow-hidden rounded-xl ring-1 ring-secondary_alt bg-primary",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "aspect-square w-full bg-primary_hover animate-pulse"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/[username]/page.tsx",
                                                                    lineNumber: 785,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "px-2 py-1",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "h-3 w-20 bg-primary_hover rounded animate-pulse"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/[username]/page.tsx",
                                                                        lineNumber: 787,
                                                                        columnNumber: 57
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/[username]/page.tsx",
                                                                    lineNumber: 786,
                                                                    columnNumber: 53
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/[username]/page.tsx",
                                                            lineNumber: 784,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "overflow-hidden rounded-xl ring-1 ring-secondary_alt bg-primary",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "aspect-square w-full bg-primary_hover animate-pulse"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/[username]/page.tsx",
                                                                    lineNumber: 791,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "px-2 py-1",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "h-3 w-16 bg-primary_hover rounded animate-pulse"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/[username]/page.tsx",
                                                                        lineNumber: 793,
                                                                        columnNumber: 57
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/[username]/page.tsx",
                                                                    lineNumber: 792,
                                                                    columnNumber: 53
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/[username]/page.tsx",
                                                            lineNumber: 790,
                                                            columnNumber: 49
                                                        }, this)
                                                    ]
                                                }, void 0, true)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/[username]/page.tsx",
                                                lineNumber: 716,
                                                columnNumber: 37
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/[username]/page.tsx",
                                            lineNumber: 715,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/[username]/page.tsx",
                                    lineNumber: 710,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/[username]/page.tsx",
                                lineNumber: 709,
                                columnNumber: 25
                            }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/[username]/page.tsx",
                        lineNumber: 702,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/[username]/page.tsx",
                lineNumber: 700,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/[username]/page.tsx",
        lineNumber: 556,
        columnNumber: 9
    }, this);
}
function ProfileFooter() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-6 mb-2 text-center",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
            href: "https://oneinflu.com/",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "inline-flex flex-col items-center gap-0.5 text-xs text-secondary hover:text-secondary_hover",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "font-medium",
                    children: "Powered by INFLU"
                }, void 0, false, {
                    fileName: "[project]/src/app/[username]/page.tsx",
                    lineNumber: 818,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-[11px]",
                    children: "Profiles that convert, not just link"
                }, void 0, false, {
                    fileName: "[project]/src/app/[username]/page.tsx",
                    lineNumber: 819,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/[username]/page.tsx",
            lineNumber: 812,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/[username]/page.tsx",
        lineNumber: 811,
        columnNumber: 9
    }, this);
}
function PrimaryCTAStrip({ username, payEnabled, upiId, contactMethod, email, whatsapp, variant, onRequest, onPay }) {
    const base = variant === "mobile" ? "fixed inset-x-0 bottom-0 z-30 px-4 pb-4" : variant === "inline" ? "" : "px-0";
    const inner = variant === "mobile" ? "mx-auto max-w-sm w-full" : "w-full";
    const waText = encodeURIComponent(`Hi ${username}, I'd like to discuss a collaboration.`);
    const cols = "grid-cols-2";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: base,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `${inner}`,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-3xl bg-primary/90 dark:bg-linear-to-r dark:from-[#1f143d]/90 dark:to-[#4b2e8b]/90 backdrop-blur p-2 shadow-xl ring-1 ring-secondary_alt dark:ring-brand overflow-hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `grid ${cols} gap-2 min-w-0`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$buttons$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                            className: "w-full !bg-white !text-black hover:!bg-gray-100 !ring-secondary_alt dark:!bg-white dark:!text-black",
                            size: "sm",
                            color: "secondary",
                            onClick: ()=>{
                                try {
                                    const payload = {
                                        category: "pay",
                                        label: "Make Payment"
                                    };
                                    const endpoint = `${("TURBOPACK compile-time value", "https://newyearbackendcode-zrp62.ondigitalocean.app")}/users/${encodeURIComponent(username)}/analytics/click`;
                                    const blob = new Blob([
                                        JSON.stringify(payload)
                                    ], {
                                        type: "application/json"
                                    });
                                    if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
                                        navigator.sendBeacon(endpoint, blob);
                                    } else {
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].post(`/users/${username}/analytics/click`, payload).catch(()=>{});
                                    }
                                } catch  {}
                                onPay();
                            },
                            children: "Make Payment"
                        }, void 0, false, {
                            fileName: "[project]/src/app/[username]/page.tsx",
                            lineNumber: 840,
                            columnNumber: 25
                        }, this),
                        contactMethod === "whatsapp" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$buttons$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                            className: "w-full !bg-[#47AE4C] !text-white hover:!bg-[#10887B] !ring-transparent",
                            size: "sm",
                            color: "secondary",
                            onClick: ()=>{
                                const digits = whatsapp.replace(/\D/g, "");
                                const url = `https://wa.me/${digits}?text=${waText}`;
                                try {
                                    const payload = {
                                        category: "contact",
                                        label: "whatsapp",
                                        url
                                    };
                                    const endpoint = `${("TURBOPACK compile-time value", "https://newyearbackendcode-zrp62.ondigitalocean.app")}/users/${encodeURIComponent(username)}/analytics/click`;
                                    const blob = new Blob([
                                        JSON.stringify(payload)
                                    ], {
                                        type: "application/json"
                                    });
                                    if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
                                        navigator.sendBeacon(endpoint, blob);
                                    } else {
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].post(`/users/${username}/analytics/click`, payload).catch(()=>{});
                                    }
                                } catch  {}
                                window.open(url, "_blank");
                            },
                            children: "Chat on WhatsApp"
                        }, void 0, false, {
                            fileName: "[project]/src/app/[username]/page.tsx",
                            lineNumber: 854,
                            columnNumber: 29
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$buttons$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                            className: "w-full",
                            size: "sm",
                            color: "secondary",
                            onClick: ()=>{
                                const url = `mailto:${email}?subject=${encodeURIComponent("Collaboration inquiry")}&body=${encodeURIComponent(`Hi ${username}, I'd like to discuss a collaboration.`)}`;
                                try {
                                    const payload = {
                                        category: "contact",
                                        label: "email",
                                        url
                                    };
                                    const endpoint = `${("TURBOPACK compile-time value", "https://newyearbackendcode-zrp62.ondigitalocean.app")}/users/${encodeURIComponent(username)}/analytics/click`;
                                    const blob = new Blob([
                                        JSON.stringify(payload)
                                    ], {
                                        type: "application/json"
                                    });
                                    if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
                                        navigator.sendBeacon(endpoint, blob);
                                    } else {
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].post(`/users/${username}/analytics/click`, payload).catch(()=>{});
                                    }
                                } catch  {}
                                window.location.href = url;
                            },
                            children: "Mail Us"
                        }, void 0, false, {
                            fileName: "[project]/src/app/[username]/page.tsx",
                            lineNumber: 870,
                            columnNumber: 29
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/[username]/page.tsx",
                    lineNumber: 839,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/[username]/page.tsx",
                lineNumber: 838,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/[username]/page.tsx",
            lineNumber: 837,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/[username]/page.tsx",
        lineNumber: 836,
        columnNumber: 9
    }, this);
}
function RequestServiceBottomSheet({ isOpen, onOpenChange, username, services, offers, prefillService, onSuccess }) {
    const [serviceKey, setServiceKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(prefillService);
    const [budget, setBudget] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [contactMethod, setContactMethod] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("whatsapp");
    const [contact, setContact] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const items = services.map((t)=>({
            id: t,
            label: t
        }));
    const selectedTitle = serviceKey || services[0] || null;
    const selectedOffer = offers.find((o)=>o.title === selectedTitle) || null;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isOpen) {
            setServiceKey(prefillService || null);
        }
    }, [
        isOpen,
        prefillService
    ]);
    const submit = async ()=>{
        const selectedService = selectedTitle || "Service";
        if (!name.trim() || !contact.trim()) return;
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].post(`/users/${username}/enquiries`, {
                service: selectedService,
                brand: name.trim(),
                contactMethod,
                contact: contact.trim(),
                message: message.trim(),
                budget: budget ? Number(budget) : undefined
            });
            onOpenChange(false);
            onSuccess(selectedService);
        } catch  {}
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$Dialog$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogTrigger"], {
        isOpen: isOpen,
        onOpenChange: onOpenChange,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$buttons$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                slot: "trigger",
                className: "hidden",
                children: "Open"
            }, void 0, false, {
                fileName: "[project]/src/app/[username]/page.tsx",
                lineNumber: 929,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$Modal$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ModalOverlay"], {
                isDismissable: true,
                className: ({ isEntering, isExiting })=>`fixed inset-0 z-50 bg-overlay/40 backdrop-blur-sm ${isEntering ? "duration-150 ease-out animate-in fade-in" : ""} ${isExiting ? "duration-100 ease-in animate-out fade-out" : ""}`,
                children: ({ state })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$Modal$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Modal"], {
                        className: "w-full cursor-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$Dialog$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Dialog"], {
                            "aria-label": "Request Service",
                            className: "fixed inset-x-0 bottom-0 mx-auto w-[min(92vw,640px)] max-h-[80vh] overflow-y-auto rounded-t-2xl bg-primary shadow-xl ring-1 ring-secondary_alt focus:outline-hidden",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between border-b border-secondary px-4 py-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex min-w-0 flex-col",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "text-lg font-semibold text-primary",
                                                    children: selectedTitle ? `Request to ${selectedTitle}` : "Request a Service"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/[username]/page.tsx",
                                                    lineNumber: 941,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-tertiary",
                                                    children: selectedTitle ? "Review the service details and share your info" : "Share a few details to get started"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/[username]/page.tsx",
                                                    lineNumber: 942,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/[username]/page.tsx",
                                            lineNumber: 940,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$buttons$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                            size: "sm",
                                            onClick: ()=>state.close(),
                                            children: "Close"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/[username]/page.tsx",
                                            lineNumber: 944,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/[username]/page.tsx",
                                    lineNumber: 939,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col gap-4 px-4 py-4",
                                    children: [
                                        !prefillService && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$select$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
                                            size: "md",
                                            label: "Service",
                                            placeholder: "Select a service",
                                            items: items,
                                            selectedKey: serviceKey || undefined,
                                            onSelectionChange: (key)=>setServiceKey(String(key)),
                                            children: (item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$select$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"].Item, {
                                                    id: item.id,
                                                    children: item.label
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/[username]/page.tsx",
                                                    lineNumber: 957,
                                                    columnNumber: 52
                                                }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/[username]/page.tsx",
                                            lineNumber: 949,
                                            columnNumber: 37
                                        }, this),
                                        selectedOffer && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-xl bg-primary p-3 ring-1 ring-secondary_alt",
                                            children: [
                                                selectedOffer.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-primary",
                                                    children: selectedOffer.description
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/[username]/page.tsx",
                                                    lineNumber: 964,
                                                    columnNumber: 45
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-3 grid grid-cols-2 gap-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs text-secondary",
                                                                    children: "Delivery"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/[username]/page.tsx",
                                                                    lineNumber: 968,
                                                                    columnNumber: 49
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm text-primary",
                                                                    children: selectedOffer.delivery || "—"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/[username]/page.tsx",
                                                                    lineNumber: 969,
                                                                    columnNumber: 49
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/[username]/page.tsx",
                                                            lineNumber: 967,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs text-secondary",
                                                                    children: "Includes"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/[username]/page.tsx",
                                                                    lineNumber: 972,
                                                                    columnNumber: 49
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm text-primary",
                                                                    children: (selectedOffer.includes || []).slice(0, 3).join(", ") || "—"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/[username]/page.tsx",
                                                                    lineNumber: 973,
                                                                    columnNumber: 49
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/[username]/page.tsx",
                                                            lineNumber: 971,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/[username]/page.tsx",
                                                    lineNumber: 966,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/[username]/page.tsx",
                                            lineNumber: 962,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$input$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                            label: "Budget (optional)",
                                            type: "number",
                                            inputMode: "numeric",
                                            placeholder: "Your budget (optional)",
                                            value: budget,
                                            onChange: setBudget
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/[username]/page.tsx",
                                            lineNumber: 981,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$input$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                            isRequired: true,
                                            label: "Your Name",
                                            placeholder: "Brand / Your name",
                                            value: name,
                                            onChange: setName
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/[username]/page.tsx",
                                            lineNumber: 983,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex min-w-0 flex-col gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm font-medium text-secondary",
                                                    children: "Contact Method"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/[username]/page.tsx",
                                                    lineNumber: 986,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$radio$2d$buttons$2f$radio$2d$buttons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RadioGroup"], {
                                                    value: contactMethod,
                                                    onChange: (v)=>setContactMethod(v),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$radio$2d$buttons$2f$radio$2d$buttons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RadioButton"], {
                                                            value: "whatsapp",
                                                            label: "WhatsApp"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/[username]/page.tsx",
                                                            lineNumber: 988,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$radio$2d$buttons$2f$radio$2d$buttons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RadioButton"], {
                                                            value: "email",
                                                            label: "Email"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/[username]/page.tsx",
                                                            lineNumber: 989,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/[username]/page.tsx",
                                                    lineNumber: 987,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/[username]/page.tsx",
                                            lineNumber: 985,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$input$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                            isRequired: true,
                                            label: "Contact Detail",
                                            placeholder: contactMethod === "whatsapp" ? "WhatsApp number" : "Email address",
                                            type: contactMethod === "email" ? "email" : "tel",
                                            inputMode: contactMethod === "email" ? "email" : "numeric",
                                            value: contact,
                                            onChange: setContact
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/[username]/page.tsx",
                                            lineNumber: 993,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$textarea$2f$textarea$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TextArea"], {
                                            label: "Message (optional)",
                                            rows: 4,
                                            placeholder: "Briefly describe your requirement",
                                            value: message,
                                            onChange: setMessage
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/[username]/page.tsx",
                                            lineNumber: 1003,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 pt-2",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$buttons$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                size: "sm",
                                                color: "secondary",
                                                className: "w-full",
                                                onClick: submit,
                                                children: "Send Request"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/[username]/page.tsx",
                                                lineNumber: 1006,
                                                columnNumber: 37
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/[username]/page.tsx",
                                            lineNumber: 1005,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/[username]/page.tsx",
                                    lineNumber: 947,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/[username]/page.tsx",
                            lineNumber: 938,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/[username]/page.tsx",
                        lineNumber: 937,
                        columnNumber: 21
                    }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/[username]/page.tsx",
                lineNumber: 930,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/[username]/page.tsx",
        lineNumber: 928,
        columnNumber: 9
    }, this);
}
function RequestSuccessBottomSheet({ isOpen, onOpenChange, username, service, contactMethod, email, whatsapp }) {
    const waText = `Hi ${username}, I just submitted a request for ${service}`;
    const waLink = whatsapp ? `https://wa.me/${encodeURIComponent(String(whatsapp).replace(/[^0-9+]/g, ""))}?text=${encodeURIComponent(waText)}` : null;
    const mailLink = email ? `mailto:${email}?subject=${encodeURIComponent("Collaboration inquiry")}&body=${encodeURIComponent(waText)}` : null;
    const animRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let alive = true;
        if (!isOpen || !animRef.current) return;
        (async ()=>{
            try {
                const mod = await __turbopack_context__.A("[project]/node_modules/lottie-web/build/player/lottie.js [app-ssr] (ecmascript, async loader)");
                if (!alive || !animRef.current) return;
                const anim = mod.default.loadAnimation({
                    container: animRef.current,
                    renderer: "svg",
                    loop: false,
                    autoplay: true,
                    path: "/sent.json"
                });
                const t = setTimeout(()=>{
                    try {
                        anim.destroy();
                    } catch  {}
                }, 3000);
                return ()=>{
                    clearTimeout(t);
                    try {
                        anim.destroy();
                    } catch  {}
                };
            } catch  {}
        })();
        return ()=>{
            alive = false;
        };
    }, [
        isOpen
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$Dialog$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogTrigger"], {
        isOpen: isOpen,
        onOpenChange: onOpenChange,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$buttons$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                slot: "trigger",
                className: "hidden",
                children: "Open"
            }, void 0, false, {
                fileName: "[project]/src/app/[username]/page.tsx",
                lineNumber: 1053,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$Modal$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ModalOverlay"], {
                isDismissable: true,
                className: ({ isEntering, isExiting })=>`fixed inset-0 z-50 bg-overlay/40 backdrop-blur-sm ${isEntering ? "duration-150 ease-out animate-in fade-in" : ""} ${isExiting ? "duration-100 ease-in animate-out fade-out" : ""}`,
                children: ({ state })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$Modal$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Modal"], {
                        className: "w-full cursor-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$Dialog$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Dialog"], {
                            "aria-label": "Request Submitted",
                            className: "fixed inset-x-0 bottom-0 mx-auto w-[min(92vw,640px)] max-h-[80vh] overflow-y-auto rounded-t-2xl bg-primary shadow-xl ring-1 ring-secondary_alt focus:outline-hidden",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between border-b border-secondary px-4 py-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex min-w-0 flex-col",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "text-lg font-semibold text-primary",
                                                    children: "Request submitted"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/[username]/page.tsx",
                                                    lineNumber: 1065,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-tertiary",
                                                    children: [
                                                        "We’ve notified ",
                                                        username,
                                                        ". You’ll hear back soon."
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/[username]/page.tsx",
                                                    lineNumber: 1066,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/[username]/page.tsx",
                                            lineNumber: 1064,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$buttons$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                            size: "sm",
                                            onClick: ()=>state.close(),
                                            children: "Close"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/[username]/page.tsx",
                                            lineNumber: 1068,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/[username]/page.tsx",
                                    lineNumber: 1063,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "px-4 py-6",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mx-auto flex w-full max-w-sm flex-col items-center gap-4 text-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                ref: animRef,
                                                className: "inline-flex size-20 items-center justify-center rounded-full bg-secondary/20 ring-1 ring-secondary_alt overflow-hidden"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/[username]/page.tsx",
                                                lineNumber: 1072,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-md font-semibold text-primary",
                                                children: [
                                                    "Your request for “",
                                                    service || "Service",
                                                    "” has been registered"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/[username]/page.tsx",
                                                lineNumber: 1073,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-tertiary",
                                                children: "Feel free to reach out directly while we process it."
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/[username]/page.tsx",
                                                lineNumber: 1074,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-2 w-full",
                                                children: contactMethod === "whatsapp" ? waLink ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$buttons$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                    size: "sm",
                                                    color: "primary",
                                                    className: "w-full",
                                                    onClick: ()=>window.open(waLink, "_blank"),
                                                    children: "Chat on WhatsApp"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/[username]/page.tsx",
                                                    lineNumber: 1078,
                                                    columnNumber: 49
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$buttons$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                    size: "sm",
                                                    color: "secondary",
                                                    className: "w-full",
                                                    disabled: true,
                                                    children: "WhatsApp unavailable"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/[username]/page.tsx",
                                                    lineNumber: 1080,
                                                    columnNumber: 49
                                                }, this) : mailLink ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$buttons$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                    size: "sm",
                                                    color: "secondary",
                                                    className: "w-full",
                                                    onClick: ()=>{
                                                        window.location.href = mailLink;
                                                    },
                                                    children: "Email Us"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/[username]/page.tsx",
                                                    lineNumber: 1083,
                                                    columnNumber: 45
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$base$2f$buttons$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                    size: "sm",
                                                    color: "secondary",
                                                    className: "w-full",
                                                    disabled: true,
                                                    children: "Email unavailable"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/[username]/page.tsx",
                                                    lineNumber: 1085,
                                                    columnNumber: 45
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/[username]/page.tsx",
                                                lineNumber: 1075,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/[username]/page.tsx",
                                        lineNumber: 1071,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/[username]/page.tsx",
                                    lineNumber: 1070,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/[username]/page.tsx",
                            lineNumber: 1062,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/[username]/page.tsx",
                        lineNumber: 1061,
                        columnNumber: 21
                    }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/[username]/page.tsx",
                lineNumber: 1054,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/[username]/page.tsx",
        lineNumber: 1052,
        columnNumber: 9
    }, this);
}
}),
];

//# sourceMappingURL=src_26c2f4eb._.js.map