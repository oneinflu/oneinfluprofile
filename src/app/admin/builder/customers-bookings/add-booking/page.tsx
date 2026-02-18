 "use client";
 
 import { useEffect, useMemo, useState } from "react";
 import { useRouter, useSearchParams } from "next/navigation";
 import { Button } from "@/components/base/buttons/button";
 import { Select } from "@/components/base/select/select";
 import { Input } from "@/components/base/input/input";
 import { FileUpload } from "@/components/application/file-upload/file-upload-base";
 import { Badge } from "@/components/base/badges/badges";
 
 type ProjectKey = "all" | "altius" | "valley" | "heights";
 
 export default function AddBookingPage() {
     const router = useRouter();
     const searchParams = useSearchParams();
     const [initializedFromQuery, setInitializedFromQuery] = useState(false);
     const returnTo = searchParams.get("returnTo");
     const floorPlanUrl =
         "https://happho.com/wp-content/smush-webp/2017/05/3D-floor-plan-visualization.jpg.webp";
     const amenities = [
         "Clubhouse",
         "Gym",
         "Swimming Pool",
         "24x7 Security",
         "Power Backup",
         "Elevators",
         "Parking",
         "Kids Play Area",
     ];
 
     const [bookingStep, setBookingStep] = useState<1 | 2 | 3 | 4>(1);
     const [bookingTowerId, setBookingTowerId] = useState<string>("tower-a");
     const [bookingFloorId, setBookingFloorId] = useState<string | null>(null);
     const [bookingUnitIndex, setBookingUnitIndex] = useState<number | null>(null);
 
     useEffect(() => {
         if (initializedFromQuery) return;
         const towerId = searchParams.get("towerId");
         const floorId = searchParams.get("floorId");
         const unitIndexStr = searchParams.get("unitIndex");
         if (towerId && floorId && unitIndexStr !== null) {
             const idx = Number(unitIndexStr);
             if (Number.isFinite(idx)) {
                 setBookingTowerId(towerId);
                 setBookingFloorId(floorId);
                 setBookingUnitIndex(idx);
                 setBookingStep(2);
             }
         }
         setInitializedFromQuery(true);
         // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [searchParams, initializedFromQuery]);
 
     const [buyerName, setBuyerName] = useState("");
     const [buyerPhone, setBuyerPhone] = useState("");
     const [buyerEmail, setBuyerEmail] = useState("");
     const [buyerPan, setBuyerPan] = useState("");
     const [buyerAddress, setBuyerAddress] = useState("");
     const [existingBuyer, setExistingBuyer] = useState<{ name: string; phone: string; email?: string } | null>(null);
 
     const [advanceAmount, setAdvanceAmount] = useState<string>("");
     const [paymentPlan, setPaymentPlan] = useState<"construction" | "custom" | "one_time">("construction");
     const [scheduleMode, setScheduleMode] = useState<"percent" | "value">("percent");
     const [scheduleRows, setScheduleRows] = useState<Array<{ id: string; label: string; percent: string; value: string }>>([]);
 
     const [isLoan, setIsLoan] = useState<"yes" | "no">("no");
     const [loanBank, setLoanBank] = useState("");
     const [loanAmount, setLoanAmount] = useState<string>("");
 
     const [paymentMode, setPaymentMode] = useState<"Cash" | "Bank" | "UPI" | "Cheque">("Cash");
     const [receiptFiles, setReceiptFiles] = useState<Array<{ name: string; size: number; progress: number }>>([]);
 
     const towerItems = [
         { id: "tower-a", label: "Tower A" },
         { id: "tower-b", label: "Tower B" },
         { id: "tower-c", label: "Tower C" },
     ];
     const getTowerRateOffset = (towerId: string): number => {
         if (towerId === "tower-a") return 250;
         if (towerId === "tower-b") return 150;
         if (towerId === "tower-c") return 200;
         return 0;
     };
     const getPricePerSft = (towerId: string, floorNumber: number, index: number): number => {
         const baseRate = 4400;
         const floorOffset = floorNumber * 40;
         const indexOffset = index * 15;
         return baseRate + getTowerRateOffset(towerId) + floorOffset + indexOffset;
     };
     const bookingFaces = ["East", "West", "North", "South"];
     const bookingSelectedUnitDetails = useMemo(() => {
         const tower = bookingTowerId;
         const floorNumber = bookingFloorId ? Number(bookingFloorId) : null;
         const index = bookingUnitIndex;
         if (!tower || !floorNumber || index === null || index === undefined) return null;
         const areaBase = 1200;
         const areaStep = 50;
         const area = areaBase + areaStep * (index % 4);
         const rate = getPricePerSft(tower, floorNumber, index);
         const total = rate * area;
         const unitNumber = `${floorNumber * 100 + (index + 1)}`;
         const facing = bookingFaces[index % bookingFaces.length];
         return {
             unitLabel: `Unit ${unitNumber}`,
             area,
             areaLabel: `${area.toLocaleString("en-IN")} sft`,
             rate,
             rateLabel: `₹ ${rate.toLocaleString("en-IN")}`,
             total,
             totalLabel: `₹ ${total.toLocaleString("en-IN")}`,
             facing,
             floor: floorNumber,
         };
     }, [bookingTowerId, bookingFloorId, bookingUnitIndex]);
 
     const handlePhoneCheck = (value: string) => {
         setBuyerPhone(value);
         const clean = value.replace(/\s+/g, "");
         const known = [
             { name: "Rohit Mehta", phone: "9876543210", email: "rohit@example.com" },
             { name: "Neha Gupta", phone: "9123456789", email: "neha@example.com" },
         ];
         const match = known.find((b) => b.phone === clean || b.phone === value);
         setExistingBuyer(match ?? null);
     };
 
    return (
        <section className="flex min-h-screen flex-col lg:pl-[300px]">
            <div className="top-0 z-10 px-4 md:px-8 pt-5 pb-3 border-b border-secondary bg-primary/60 backdrop-blur">
                <div className="mx-auto w-full max-w-7xl">
                    <div className="flex items-center justify-between">
                        <div className="min-w-0">
                            <h1 className="text-display-sm font-semibold text-primary">Add Booking</h1>
                            <div className="mt-2 flex items-center gap-2">
                                {[1, 2, 3, 4].map((s) => (
                                    <div
                                        key={s}
                                        className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                                            bookingStep === s ? "bg-brand-primary/10 text-secondary ring-1 ring-brand-primary" : "bg-secondary/20 text-tertiary"
                                        }`}
                                    >
                                        {s === 1 ? "Unit" : s === 2 ? "Buyer" : s === 3 ? "Payment" : "Review"}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <Button
                            size="sm"
                            color="secondary"
                            onClick={() => {
                                if (returnTo) {
                                    router.push(returnTo);
                                } else {
                                    router.back();
                                }
                            }}
                        >
                            Cancel
                        </Button>
                    </div>
                    <div className="mt-3 h-1 w-full rounded bg-secondary/30">
                        <div
                            className="h-1 rounded bg-brand-primary"
                            style={{ width: `${(bookingStep - 1) * (100 / 3)}%` }}
                        />
                    </div>
                </div>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-4 md:px-8 py-6">
                <div className="mx-auto w-full max-w-7xl grid grid-cols-1 gap-6 lg:grid-cols-12">
                    {bookingStep === 1 && (
                        <div className="lg:col-span-8 grid gap-6">
                            <div className="rounded-2xl bg-primary p-4 md:p-5 ring-1 ring-secondary_alt">
                                <div className="flex flex-wrap items-center gap-2">
                                    <p className="text-xs font-semibold text-secondary">Towers</p>
                                    <div className="flex flex-wrap gap-2">
                                        {towerItems.map((tw) => {
                                            const isSel = tw.id === bookingTowerId;
                                            return (
                                                <button
                                                    key={tw.id}
                                                    type="button"
                                                    onClick={() => {
                                                        setBookingTowerId(tw.id);
                                                        setBookingFloorId(null);
                                                        setBookingUnitIndex(null);
                                                    }}
                                                    className={
                                                        isSel
                                                            ? "inline-flex items-center rounded-full border border-brand-primary bg-brand-primary px-3 py-1 text-xs font-semibold text-primary shadow-xs"
                                                            : "inline-flex items-center rounded-full border border-secondary bg-primary_hover px-3 py-1 text-xs font-medium text-secondary hover:bg-secondary/40"
                                                    }
                                                >
                                                    {tw.label}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className="mt-4 grid gap-4 md:grid-cols-2">
                                    <div className="rounded-xl bg-primary p-3 ring-1 ring-secondary_alt">
                                        <p className="text-xs font-semibold text-secondary">Floors</p>
                                        <div className="mt-2 max-h-72 overflow-y-auto space-y-1">
                                            {Array.from({ length: 15 }, (_, i) => 15 - i).map((floor) => {
                                                const isSel = String(floor) === bookingFloorId;
                                                return (
                                                    <button
                                                        key={floor}
                                                        type="button"
                                                        onClick={() => {
                                                            setBookingFloorId(String(floor));
                                                            setBookingUnitIndex(null);
                                                        }}
                                                        className={
                                                            isSel
                                                                ? "w-full rounded-lg border border-brand-primary bg-brand-primary/5 px-2.5 py-2 text-left text-xs shadow-xs"
                                                                : "w-full rounded-lg border border-secondary bg-primary px-2.5 py-2 text-left text-xs hover:bg-secondary/30"
                                                        }
                                                    >
                                                        <div className="flex items-center justify-between gap-2">
                                                            <span className="text-[11px] font-semibold text-primary">{floor}F</span>
                                                            <span className="rounded-full bg-secondary/30 px-2 py-0.5 text-[10px] text-tertiary">8 units</span>
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    <div className="rounded-xl bg-primary p-3 ring-1 ring-secondary_alt">
                                        <p className="text-xs font-semibold text-secondary">Units</p>
                                        {!bookingFloorId ? (
                                            <div className="mt-3 rounded-lg border border-dashed border-secondary/70 p-4 text-center text-xs text-tertiary">
                                                Select a floor to see units.
                                            </div>
                                        ) : (
                                            <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
                                                {Array.from({ length: 8 }, (_, idx) => {
                                                    const floorNumber = Number(bookingFloorId);
                                                    const unitNumber = floorNumber * 100 + (idx + 1);
                                                    const faces = ["East", "West", "North", "South"];
                                                    const facing = faces[idx % faces.length];
                                                    const isSel = bookingUnitIndex === idx;
                                                    return (
                                                        <button
                                                            key={idx}
                                                            type="button"
                                                            onClick={() => setBookingUnitIndex(idx)}
                                                            className={`rounded-lg border px-3 py-2 text-left text-xs shadow-xs transition-colors ${
                                                                isSel ? "border-brand-primary ring-2 ring-brand-primary ring-offset-2 ring-offset-primary" : "border-secondary"
                                                            }`}
                                                        >
                                                            <p className="text-[11px] font-semibold text-primary">Unit {unitNumber}</p>
                                                            <p className="text-[11px] text-tertiary">{facing}</p>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {bookingStep === 1 && (
                        <div className="lg:col-span-4">
                            <div className="relative overflow-hidden rounded-2xl p-0 ring-1 ring-secondary_alt">
                                <div className="relative">
                                    <img
                                        src={floorPlanUrl}
                                        alt="Floor plan"
                                        className="h-40 w-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-primary/10 to-primary/80" />
                                    <div className="absolute left-3 top-3">
                                        <span className="rounded-full bg-primary/80 px-2 py-0.5 text-[10px] font-medium text-secondary ring-1 ring-secondary_alt">
                                            Floor plan
                                        </span>
                                    </div>
                                </div>
                                <div className="bg-primary p-4 md:p-5">
                                    <p className="text-xs font-semibold text-secondary">Unit summary</p>
                                    {bookingSelectedUnitDetails ? (
                                        <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
                                            <div>
                                                <p className="text-[10px] text-tertiary">Area</p>
                                                <p className="text-sm font-semibold text-secondary">{bookingSelectedUnitDetails.areaLabel}</p>
                                            </div>
                                            <div>
                                            <p className="text-[10px] text-tertiary">Price / sft</p>
                                                <p className="text-sm font-semibold text-secondary">{bookingSelectedUnitDetails.rateLabel}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-tertiary">Total value</p>
                                                <p className="text-sm font-semibold text-secondary">{bookingSelectedUnitDetails.totalLabel}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-tertiary">Facing • Floor</p>
                                                <p className="text-sm font-semibold text-secondary">
                                                    {bookingSelectedUnitDetails.facing} • {bookingSelectedUnitDetails.floor}
                                                </p>
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="mt-3 text-xs text-tertiary">Select tower, floor and unit to see summary.</p>
                                    )}
                                    <div className="mt-4">
                                        <p className="text-xs font-semibold text-secondary">Amenities</p>
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            {amenities.map((a) => (
                                                <Badge key={a} type="pill-color" size="sm" color="success">
                                                    {a}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
 
                     {bookingStep === 2 && (
                        <div className="lg:col-span-8 grid gap-6">
                             <div className="grid gap-3 md:grid-cols-2">
                                 <Input size="sm" label="Buyer name" value={buyerName} onChange={setBuyerName} placeholder="Full name" />
                                 <Input size="sm" label="Phone number" value={buyerPhone} onChange={handlePhoneCheck} placeholder="e.g. 98765 43210" />
                                 <Input size="sm" label="Email (optional)" value={buyerEmail} onChange={setBuyerEmail} placeholder="name@example.com" />
                                 <Input size="sm" label="PAN / ID (optional)" value={buyerPan} onChange={setBuyerPan} placeholder="ABCDE1234F" />
                                 <Input size="sm" label="Address (optional)" value={buyerAddress} onChange={setBuyerAddress} placeholder="Street, City" />
                             </div>
                             {existingBuyer && (
                                 <div className="rounded-xl bg-brand-primary/5 p-3 ring-1 ring-brand-primary/40 text-xs">
                                     <div className="flex items-center justify-between gap-2">
                                         <p className="text-secondary">
                                             Existing buyer found: <span className="font-semibold">{existingBuyer.name}</span> ({existingBuyer.phone})
                                         </p>
                                         <Button
                                             size="sm"
                                             onClick={() => {
                                                 setBuyerName(existingBuyer.name);
                                                 setBuyerEmail(existingBuyer.email ?? "");
                                             }}
                                         >
                                             Use existing profile
                                         </Button>
                                     </div>
                                 </div>
                             )}
                         </div>
                     )}
                    {bookingStep === 2 && (
                        <div className="lg:col-span-4">
                            <div className="relative overflow-hidden rounded-2xl p-0 ring-1 ring-secondary_alt">
                                <div className="relative">
                                    <img
                                        src={floorPlanUrl}
                                        alt="Floor plan"
                                        className="h-40 w-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-primary/10 to-primary/80" />
                                    <div className="absolute left-3 top-3">
                                        <span className="rounded-full bg-primary/80 px-2 py-0.5 text-[10px] font-medium text-secondary ring-1 ring-secondary_alt">
                                            Floor plan
                                        </span>
                                    </div>
                                </div>
                                <div className="bg-primary p-4 md:p-5">
                                    <p className="text-xs font-semibold text-secondary">Unit summary</p>
                                    <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
                                        <div>
                                            <p className="text-[10px] text-tertiary">Unit</p>
                                            <p className="text-sm font-semibold text-secondary">{bookingSelectedUnitDetails?.unitLabel ?? "—"}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-tertiary">Total value</p>
                                            <p className="text-sm font-semibold text-secondary">{bookingSelectedUnitDetails?.totalLabel ?? "—"}</p>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-xs font-semibold text-secondary">Amenities</p>
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            {amenities.map((a) => (
                                                <Badge key={a} type="pill-color" size="sm" color="success">
                                                    {a}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
 
                     {bookingStep === 3 && (
                        <div className="lg:col-span-8 grid gap-6">
                            <div className="rounded-2xl bg-primary p-4 md:p-5 ring-1 ring-secondary_alt">
                                 <p className="text-xs font-semibold text-secondary">Booking amount</p>
                                 <div className="mt-2 grid gap-3 md:grid-cols-2">
                                     <Input
                                         size="sm"
                                         label="Advance paid now"
                                         type="number"
                                         value={advanceAmount}
                                         onChange={setAdvanceAmount}
                                         placeholder="e.g. 500000"
                                     />
                                     <div className="flex flex-col justify-end whitespace-normal break-words">
                                         <p className="text-[10px] text-tertiary">Remaining value</p>
                                         <p className="text-sm font-semibold text-secondary">
                                             {(() => {
                                                 const adv = Number(advanceAmount || "0");
                                                 const total = bookingSelectedUnitDetails?.total ?? 0;
                                                 const remaining = Math.max(0, total - (Number.isFinite(adv) ? adv : 0));
                                                 return `₹ ${remaining.toLocaleString("en-IN")}`;
                                             })()}
                                         </p>
                                     </div>
                                 </div>
                             </div>
                            <div className="rounded-2xl bg-primary p-4 md:p-5 ring-1 ring-secondary_alt">
                                 <p className="text-xs font-semibold text-secondary">Payment plan</p>
                                 <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
                                     {[
                                         { id: "construction", title: "Construction-linked", desc: "Auto schedule by stages" },
                                         { id: "custom", title: "Custom schedule", desc: "Create your own milestones" },
                                         { id: "one_time", title: "One-time payment", desc: "Single final payment" },
                                     ].map((opt) => {
                                         const sel = paymentPlan === (opt.id as typeof paymentPlan);
                                         return (
                                             <button
                                                 key={opt.id}
                                                 type="button"
                                                 aria-pressed={sel}
                                                 onClick={() => {
                                                     const k = opt.id as typeof paymentPlan;
                                                     setPaymentPlan(k);
                                                     const labels =
                                                         k === "construction"
                                                             ? ["Slab payment", "Plaster stage", "Final payment"]
                                                             : k === "custom"
                                                             ? ["Milestone 1", "Milestone 2", "Milestone 3", "Final payment"]
                                                             : [];
                                                     if (labels.length > 0) {
                                                         const parts = labels.length;
                                                         const even = Math.floor(100 / parts);
                                                         const last = 100 - even * (parts - 1);
                                                         const percents = labels.map((_, i) => String(i === parts - 1 ? last : even));
                                                         setScheduleMode("percent");
                                                         setScheduleRows(labels.map((label, i) => ({ id: `${i}`, label, percent: percents[i], value: "" })));
                                                     } else {
                                                         setScheduleMode("value");
                                                         setScheduleRows([{ id: "0", label: "Final payment", percent: "", value: "" }]);
                                                     }
                                                 }}
                                                 className={
                                                     sel
                                                         ? "flex flex-col items-start rounded-lg border border-brand-primary bg-brand-primary/5 p-3 text-left shadow-xs ring-1 ring-brand-primary/40"
                                                         : "flex flex-col items-start rounded-lg border border-secondary bg-primary p-3 text-left hover:bg-secondary/30"
                                                 }
                                             >
                                                 <span className="text-sm font-semibold text-primary">{opt.title}</span>
                                                 <span className="mt-0.5 text-[11px] text-tertiary">{opt.desc}</span>
                                             </button>
                                         );
                                     })}
                                 </div>
                                 {paymentPlan !== "one_time" && (
                                     <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                                         <div className="flex items-center gap-1 rounded-full bg-primary p-1 ring-1 ring-secondary_alt">
                                             {(["percent", "value"] as const).map((mode) => {
                                                 const active = scheduleMode === mode;
                                                 return (
                                                     <button
                                                         key={mode}
                                                         type="button"
                                                         onClick={() => setScheduleMode(mode)}
                                                         className={
                                                             active
                                                                 ? "px-3 py-1 text-xs font-medium rounded-full bg-brand-primary/10 text-secondary ring-1 ring-brand-primary"
                                                                 : "px-3 py-1 text-xs font-medium rounded-full text-tertiary hover:text-secondary"
                                                         }
                                                     >
                                                         {mode === "percent" ? "Percent" : "Value"}
                                                     </button>
                                                 );
                                             })}
                                         </div>
                                         {paymentPlan === "custom" && (
                                             <Button
                                                 size="sm"
                                                 color="secondary"
                                                 onClick={() => {
                                                     const n = scheduleRows.length + 1;
                                                     setScheduleRows((prev) => [...prev, { id: `${Date.now()}`, label: `Milestone ${n}`, percent: "0", value: "0" }]);
                                                 }}
                                             >
                                                 + Add milestone
                                             </Button>
                                         )}
                                     </div>
                                 )}
                                 <div className="mt-3">
                                     <p className="text-[11px] text-tertiary">Schedule</p>
                                     <div className="mt-2 grid gap-2">
                                         {(() => {
                                             const total = bookingSelectedUnitDetails?.total ?? 0;
                                             const adv = Number(advanceAmount || "0");
                                             const remaining = Math.max(0, total - (Number.isFinite(adv) ? adv : 0));
                                             if (paymentPlan === "one_time") {
                                                 return (
                                                     <div className="rounded-lg bg-primary p-3 ring-1 ring-secondary_alt">
                                                         <div className="flex flex-wrap items-center justify-between gap-3">
                                                             <span className="min-w-0 whitespace-normal break-words text-sm font-medium text-primary">Final payment</span>
                                                             <span className="shrink-0 text-sm font-semibold text-secondary">₹ {remaining.toLocaleString("en-IN")}</span>
                                                         </div>
                                                     </div>
                                                 );
                                             }
                                             return scheduleRows.map((row, idx) => {
                                                 const p = Math.max(0, Math.min(100, Number(row.percent || "0")));
                                                 const v = Math.max(0, Number(row.value || "0"));
                                                 const valueFromPercent = Math.floor((p / 100) * remaining);
                                                 const percentFromValue = remaining > 0 ? Math.round((v / remaining) * 100) : 0;
                                                 const showValue = scheduleMode === "percent" ? valueFromPercent : v;
                                                 const showPercent = scheduleMode === "percent" ? p : percentFromValue;
                                                 return (
                                                     <div key={row.id} className="rounded-lg bg-primary p-3 ring-1 ring-secondary_alt">
                                                         <div className="grid gap-2 sm:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)_minmax(0,1fr)]">
                                                             <Input
                                                                 size="sm"
                                                                 label="Label"
                                                                 value={row.label}
                                                                 onChange={(val) =>
                                                                     setScheduleRows((prev) => prev.map((r, i) => (i === idx ? { ...r, label: val } : r)))
                                                                 }
                                                                 placeholder="Milestone name"
                                                             />
                                                             {scheduleMode === "percent" ? (
                                                                 <Input
                                                                     size="sm"
                                                                     label="%"
                                                                     type="number"
                                                                     value={row.percent}
                                                                     onChange={(val) =>
                                                                         setScheduleRows((prev) => prev.map((r, i) => (i === idx ? { ...r, percent: val } : r)))
                                                                     }
                                                                     placeholder="e.g. 25"
                                                                 />
                                                             ) : (
                                                                 <Input
                                                                     size="sm"
                                                                     label="Amount"
                                                                     type="number"
                                                                     value={row.value}
                                                                     onChange={(val) =>
                                                                         setScheduleRows((prev) => prev.map((r, i) => (i === idx ? { ...r, value: val } : r)))
                                                                     }
                                                                     placeholder="e.g. 500000"
                                                                 />
                                                             )}
                                                             <div className="flex min-w-0 flex-col justify-end">
                                                                 <p className="text-[10px] text-tertiary">Computed</p>
                                                                 <p className="whitespace-normal break-words text-sm font-semibold text-secondary">
                                                                     ₹ {Math.max(0, showValue).toLocaleString("en-IN")} • {Math.max(0, showPercent)}%
                                                                 </p>
                                                             </div>
                                                         </div>
                                                         {paymentPlan === "custom" && (
                                                             <div className="mt-2 flex justify-end">
                                                                 <Button size="sm" color="secondary" onClick={() => setScheduleRows((prev) => prev.filter((_, i) => i !== idx))}>
                                                                     Remove
                                                                 </Button>
                                                             </div>
                                                         )}
                                                     </div>
                                                 );
                                             });
                                         })()}
                                     </div>
                                     {(() => {
                                         const total = bookingSelectedUnitDetails?.total ?? 0;
                                         const adv = Number(advanceAmount || "0");
                                         const remaining = Math.max(0, total - (Number.isFinite(adv) ? adv : 0));
                                         if (paymentPlan === "one_time") return null;
                                         const allocated =
                                             scheduleMode === "percent"
                                                 ? scheduleRows.reduce((sum, r) => sum + Math.max(0, Number(r.percent || "0")), 0)
                                                 : scheduleRows.reduce((sum, r) => sum + Math.max(0, Number(r.value || "0")), 0);
                                         const overOrUnder = scheduleMode === "percent" ? allocated - 100 : allocated - remaining;
                                         const warn = overOrUnder !== 0;
                                         return (
                                             <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs">
                                                 <span className={warn ? "text-error" : "text-secondary"}>
                                                     {scheduleMode === "percent"
                                                         ? `Allocated: ${Math.max(0, Math.round(allocated))}% of 100%`
                                                         : `Allocated: ₹ ${Math.max(0, Math.round(allocated)).toLocaleString("en-IN")} of ₹ ${remaining.toLocaleString("en-IN")}`}
                                                 </span>
                                                 {warn && <span className="text-error">{overOrUnder > 0 ? "Over-allocated" : "Remaining to allocate"}</span>}
                                             </div>
                                         );
                                     })()}
                                 </div>
                             </div>
                            <div className="rounded-2xl bg-primary p-4 md:p-5 ring-1 ring-secondary_alt">
                                 <p className="text-xs font-semibold text-secondary">Loan</p>
                                 <div className="mt-2 grid gap-3">
                                     <Select
                                         size="sm"
                                         label="Buyer taking loan?"
                                         selectedKey={isLoan}
                                         onSelectionChange={(key) => setIsLoan(String(key) as typeof isLoan)}
                                         items={[
                                             { id: "no", label: "No" },
                                             { id: "yes", label: "Yes" },
                                         ]}
                                     >
                                         {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                     </Select>
                                     {isLoan === "yes" && (
                                         <div className="grid gap-3">
                                             <Input size="sm" label="Bank name" value={loanBank} onChange={setLoanBank} placeholder="e.g. HDFC Bank" />
                                             <Input
                                                 size="sm"
                                                 label="Loan amount (optional)"
                                                 type="number"
                                                 value={loanAmount}
                                                 onChange={setLoanAmount}
                                                 placeholder="e.g. 3000000"
                                             />
                                         </div>
                                     )}
                                 </div>
                             </div>
                            <div className="rounded-2xl bg-primary p-4 md:p-5 ring-1 ring-secondary_alt">
                                 <p className="text-xs font-semibold text-secondary">Payment mode</p>
                                 <div className="mt-2 grid gap-3 md:grid-cols-3">
                                     <Select
                                         size="sm"
                                         label="Mode"
                                         selectedKey={paymentMode}
                                         onSelectionChange={(key) => setPaymentMode(String(key) as typeof paymentMode)}
                                         items={[
                                             { id: "Cash", label: "Cash" },
                                             { id: "Bank", label: "Bank" },
                                             { id: "UPI", label: "UPI" },
                                             { id: "Cheque", label: "Cheque" },
                                         ]}
                                     >
                                         {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                     </Select>
                                 </div>
                                 <div className="mt-3">
                                     <p className="text-[11px] text-tertiary">Upload receipt (optional)</p>
                                     <FileUpload.Root className="mt-2">
                                         <FileUpload.DropZone
                                             hint="PDF or image files"
                                             accept="image/*,application/pdf"
                                             onDropFiles={(files) => {
                                                 const arr = Array.from(files);
                                                 setReceiptFiles((prev) => [...prev, ...arr.map((f) => ({ name: f.name, size: f.size, progress: 100 }))]);
                                             }}
                                         />
                                         {receiptFiles.length > 0 && (
                                             <FileUpload.List>
                                                 {receiptFiles.map((f, i) => (
                                                     <FileUpload.ListItemProgressBar
                                                         key={`${f.name}-${i}`}
                                                         name={f.name}
                                                         size={f.size}
                                                         progress={f.progress}
                                                         onDelete={() => setReceiptFiles((prev) => prev.filter((_, idx) => idx !== i))}
                                                     />
                                                 ))}
                                             </FileUpload.List>
                                         )}
                                     </FileUpload.Root>
                                 </div>
                             </div>
                         </div>
                     )}
                    {bookingStep === 3 && (
                        <div className="lg:col-span-4">
                            <div className="rounded-2xl bg-primary_hover/30 p-4 md:p-5 ring-1 ring-secondary_alt">
                                <p className="text-xs font-semibold text-secondary">Summary</p>
                                <div className="mt-3 grid gap-3 text-sm">
                                    <div className="flex items-center justify-between">
                                        <span className="text-tertiary text-[11px]">Unit</span>
                                        <span className="font-semibold text-secondary">{bookingSelectedUnitDetails?.unitLabel ?? "—"}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-tertiary text-[11px]">Advance</span>
                                        <span className="font-semibold text-secondary">₹ {Number(advanceAmount || "0").toLocaleString("en-IN")}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-tertiary text-[11px]">Pending</span>
                                        <span className="font-semibold text-secondary">
                                            {(() => {
                                                const adv = Number(advanceAmount || "0");
                                                const total = bookingSelectedUnitDetails?.total ?? 0;
                                                const remaining = Math.max(0, total - (Number.isFinite(adv) ? adv : 0));
                                                return `₹ ${remaining.toLocaleString("en-IN")}`;
                                            })()}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-tertiary text-[11px]">Next due</span>
                                        <span className="font-semibold text-secondary">
                                            {paymentPlan === "construction" ? "Slab stage" : paymentPlan === "one_time" ? "Final payment" : "Milestone 1"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
 
                    {bookingStep === 4 && (
                        <div className="lg:col-span-8 grid gap-6">
                            <div className="rounded-2xl bg-primary p-4 md:p-5 ring-1 ring-secondary_alt">
                                <div className="flex items-center justify-between">
                                    <p className="text-xs font-semibold text-secondary">Summary</p>
                                    <span className="rounded-full bg-secondary/20 px-2.5 py-0.5 text-[11px] font-medium text-tertiary">
                                        {paymentPlan === "construction" ? "Construction-linked" : paymentPlan === "custom" ? "Custom" : "One-time"}
                                    </span>
                                </div>
                                <div className="mt-3 grid gap-5">
                                    <div className="grid gap-3 md:grid-cols-2 text-sm">
                                        <div className="rounded-xl bg-primary_hover/40 p-3 ring-1 ring-secondary_alt">
                                            <div className="text-[11px] text-tertiary">Unit</div>
                                            <div className="font-semibold text-secondary">{bookingSelectedUnitDetails?.unitLabel ?? "—"}</div>
                                            <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                                                <div>
                                                    <div className="text-[10px] text-tertiary">Tower</div>
                                                    <div className="font-medium text-primary">
                                                        {(towerItems.find((t) => t.id === bookingTowerId)?.label) ?? "—"}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="text-[10px] text-tertiary">Floor</div>
                                                    <div className="font-medium text-primary">{bookingSelectedUnitDetails?.floor ?? "—"}</div>
                                                </div>
                                                <div>
                                                    <div className="text-[10px] text-tertiary">Area</div>
                                                    <div className="font-medium text-primary">{bookingSelectedUnitDetails?.areaLabel ?? "—"}</div>
                                                </div>
                                                <div>
                                                    <div className="text-[10px] text-tertiary">Price / sft</div>
                                                    <div className="font-medium text-primary">{bookingSelectedUnitDetails?.rateLabel ?? "—"}</div>
                                                </div>
                                                <div>
                                                    <div className="text-[10px] text-tertiary">Facing</div>
                                                    <div className="font-medium text-primary">
                                                        {bookingSelectedUnitDetails?.facing ?? "—"}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="text-[10px] text-tertiary">Total value</div>
                                                    <div className="font-semibold text-secondary">{bookingSelectedUnitDetails?.totalLabel ?? "—"}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="rounded-xl bg-primary_hover/40 p-3 ring-1 ring-secondary_alt">
                                            <div className="text-[11px] text-tertiary">Buyer</div>
                                            <div className="font-semibold text-secondary">{buyerName || "—"}</div>
                                            <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                                                <div>
                                                    <div className="text-[10px] text-tertiary">Phone</div>
                                                    <div className="font-medium text-primary">{buyerPhone || "—"}</div>
                                                </div>
                                                <div>
                                                    <div className="text-[10px] text-tertiary">Email</div>
                                                    <div className="font-medium text-primary">{buyerEmail || "—"}</div>
                                                </div>
                                                <div className="md:col-span-2">
                                                    <div className="text-[10px] text-tertiary">PAN / ID</div>
                                                    <div className="font-medium text-primary">{buyerPan || "—"}</div>
                                                </div>
                                                <div className="md:col-span-2">
                                                    <div className="text-[10px] text-tertiary">Address</div>
                                                    <div className="font-medium text-primary">{buyerAddress || "—"}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid gap-3 md:grid-cols-3">
                                        <div className="rounded-xl bg-primary_hover/40 p-3 ring-1 ring-secondary_alt">
                                            <div className="text-[11px] text-tertiary">Advance</div>
                                            <div className="text-sm font-semibold text-secondary">₹ {Number(advanceAmount || "0").toLocaleString("en-IN")}</div>
                                        </div>
                                        <div className="rounded-xl bg-primary_hover/40 p-3 ring-1 ring-secondary_alt">
                                            <div className="text-[11px] text-tertiary">Pending</div>
                                            <div className="text-sm font-semibold text-secondary">
                                                {(() => {
                                                    const adv = Number(advanceAmount || "0");
                                                    const total = bookingSelectedUnitDetails?.total ?? 0;
                                                    const remaining = Math.max(0, total - (Number.isFinite(adv) ? adv : 0));
                                                    return `₹ ${remaining.toLocaleString("en-IN")}`;
                                                })()}
                                            </div>
                                        </div>
                                        <div className="rounded-xl bg-primary_hover/40 p-3 ring-1 ring-secondary_alt">
                                            <div className="text-[11px] text-tertiary">Payment mode</div>
                                            <div className="text-sm font-semibold text-secondary">{paymentMode}</div>
                                        </div>
                                    </div>
                                    <div className="grid gap-3 md:grid-cols-2">
                                        <div className="rounded-xl bg-primary_hover/40 p-3 ring-1 ring-secondary_alt">
                                            <div className="text-[11px] text-tertiary">Loan</div>
                                            <div className="text-sm font-semibold text-secondary">{isLoan === "yes" ? "Yes" : "No"}</div>
                                            {isLoan === "yes" && (
                                                <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                                                    <div>
                                                        <div className="text-[10px] text-tertiary">Bank</div>
                                                        <div className="font-medium text-primary">{loanBank || "—"}</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-[10px] text-tertiary">Loan amount</div>
                                                        <div className="font-medium text-primary">
                                                            {loanAmount ? `₹ ${Number(loanAmount).toLocaleString("en-IN")}` : "—"}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="rounded-xl bg-primary_hover/40 p-3 ring-1 ring-secondary_alt">
                                            <div className="text-[11px] text-tertiary">Receipts</div>
                                            {receiptFiles.length === 0 ? (
                                                <div className="mt-2 text-xs text-tertiary">No files uploaded.</div>
                                            ) : (
                                                <ul className="mt-2 grid gap-1 text-xs">
                                                    {receiptFiles.map((f, i) => (
                                                        <li key={`${f.name}-${i}`} className="flex items-center justify-between gap-2 rounded bg-primary p-2 ring-1 ring-secondary_alt">
                                                            <span className="min-w-0 truncate text-primary">{f.name}</span>
                                                            <span className="shrink-0 text-tertiary">{Math.round(f.size / 1024)} KB</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </div>
                                    {(() => {
                                        const total = bookingSelectedUnitDetails?.total ?? 0;
                                        const adv = Number(advanceAmount || "0");
                                        const remaining = Math.max(0, total - (Number.isFinite(adv) ? adv : 0));
                                        if (paymentPlan === "one_time") {
                                            return (
                                                <div className="rounded-xl bg-primary_hover/40 p-3 ring-1 ring-secondary_alt text-sm">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-primary">Final payment</span>
                                                        <span className="font-semibold text-secondary">₹ {remaining.toLocaleString("en-IN")}</span>
                                                    </div>
                                                </div>
                                            );
                                        }
                                        const rows = scheduleRows.map((row) => {
                                            const p = Math.max(0, Math.min(100, Number(row.percent || "0")));
                                            const v = Math.max(0, Number(row.value || "0"));
                                            const valueFromPercent = Math.floor((p / 100) * remaining);
                                            const percentFromValue = remaining > 0 ? Math.round((v / remaining) * 100) : 0;
                                            const value = scheduleMode === "percent" ? valueFromPercent : v;
                                            const percent = scheduleMode === "percent" ? p : percentFromValue;
                                            return { label: row.label, value, percent };
                                        });
                                        const totalValue = rows.reduce((sum, r) => sum + r.value, 0);
                                        const totalPercent = rows.reduce((sum, r) => sum + r.percent, 0);
                                        return (
                                            <div className="rounded-xl bg-primary_hover/40 p-3 ring-1 ring-secondary_alt">
                                                <div className="text-[11px] text-tertiary">Schedule</div>
                                                <div className="mt-2 grid gap-2">
                                                    <div className="hidden md:grid grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,0.8fr)] px-2 text-[11px] text-tertiary">
                                                        <div>Milestone</div>
                                                        <div>Amount</div>
                                                        <div className="text-right">% of pending</div>
                                                    </div>
                                                    {rows.map((r, idx) => (
                                                        <div key={`${r.label}-${idx}`} className="grid grid-cols-1 gap-1 rounded-lg bg-primary p-2 ring-1 ring-secondary_alt md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,0.8fr)] md:items-center">
                                                            <div className="text-sm text-primary">{r.label}</div>
                                                            <div className="text-sm font-semibold text-secondary">₹ {Math.max(0, r.value).toLocaleString("en-IN")}</div>
                                                            <div className="text-sm text-secondary md:text-right">{Math.max(0, r.percent)}%</div>
                                                        </div>
                                                    ))}
                                                    <div className="grid grid-cols-1 gap-1 rounded-lg bg-primary p-2 ring-1 ring-secondary_alt md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,0.8fr)] md:items-center">
                                                        <div className="text-sm font-medium text-primary">Total</div>
                                                        <div className="text-sm font-semibold text-secondary">₹ {Math.max(0, totalValue).toLocaleString("en-IN")}</div>
                                                        <div className="text-sm text-secondary md:text-right">{Math.max(0, Math.round(totalPercent))}%</div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })()}
                                </div>
                            </div>
                        </div>
                    )}
                    {bookingStep === 4 && (
                        <div className="lg:col-span-4">
                            <div className="rounded-2xl bg-primary_hover/30 p-4 md:p-5 ring-1 ring-secondary_alt">
                                <p className="text-xs font-semibold text-secondary">Files</p>
                                <div className="mt-3">
                                    <FileUpload.Root>
                                        <FileUpload.DropZone
                                            hint="PDF or image files"
                                            accept="image/*,application/pdf"
                                            onDropFiles={(files) => {
                                                const arr = Array.from(files);
                                                setReceiptFiles((prev) => [...prev, ...arr.map((f) => ({ name: f.name, size: f.size, progress: 100 }))]);
                                            }}
                                        />
                                        {receiptFiles.length > 0 && (
                                            <FileUpload.List>
                                                {receiptFiles.map((f, i) => (
                                                    <FileUpload.ListItemProgressBar
                                                        key={`${f.name}-${i}`}
                                                        name={f.name}
                                                        size={f.size}
                                                        progress={f.progress}
                                                        onDelete={() => setReceiptFiles((prev) => prev.filter((_, idx) => idx !== i))}
                                                    />
                                                ))}
                                            </FileUpload.List>
                                        )}
                                    </FileUpload.Root>
                                </div>
                            </div>
                        </div>
                    )}
                 </div>
             </div>
            <div className="sticky bottom-0 z-10 border-t border-secondary bg-primary/70 backdrop-blur px-4 md:px-8 py-3">
                <div className="mx-auto w-full max-w-7xl flex items-center justify-between">
                    <div className="text-xs text-tertiary">Progress auto-saved while on this screen.</div>
                    <div className="flex gap-2">
                        {bookingStep > 1 && (
                            <Button
                                size="sm"
                                color="secondary"
                                onClick={() => setBookingStep((bookingStep - 1) as any)}
                            >
                                Back
                            </Button>
                        )}
                        {bookingStep === 1 && (
                            <Button size="sm" isDisabled={!bookingSelectedUnitDetails} onClick={() => setBookingStep(2)}>
                                Continue
                            </Button>
                        )}
                        {bookingStep === 2 && (
                            <Button
                                size="sm"
                                onClick={() => {
                                    const labels =
                                        paymentPlan === "construction"
                                            ? ["Slab payment", "Plaster stage", "Final payment"]
                                            : paymentPlan === "custom"
                                            ? ["Milestone 1", "Milestone 2", "Milestone 3", "Final payment"]
                                            : [];
                                    if (labels.length > 0) {
                                        const parts = labels.length;
                                        const even = Math.floor(100 / parts);
                                        const last = 100 - even * (parts - 1);
                                        const percents = labels.map((_, i) => String(i === parts - 1 ? last : even));
                                        setScheduleMode("percent");
                                        setScheduleRows(labels.map((label, i) => ({ id: `${i}`, label, percent: percents[i], value: "" })));
                                    } else {
                                        setScheduleMode("value");
                                        setScheduleRows([{ id: "0", label: "Final payment", percent: "", value: "" }]);
                                    }
                                    setBookingStep(3);
                                }}
                            >
                                Continue
                            </Button>
                        )}
                        {bookingStep === 3 && (
                            <Button size="sm" onClick={() => setBookingStep(4)}>
                                Review
                            </Button>
                        )}
                        {bookingStep === 4 && (
                            <>
                                <Button size="sm" color="secondary" onClick={() => router.push("/admin/builder/customers-bookings")}>
                                    Save Draft
                                </Button>
                                <Button size="sm" onClick={() => router.push("/admin/builder/customers-bookings")}>
                                    Confirm Booking
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
         </section>
     );
 }
 
