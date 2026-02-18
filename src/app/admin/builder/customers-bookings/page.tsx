 "use client";
 
import { useMemo, useState } from "react";
 import { Button } from "@/components/base/buttons/button";
 import { Select } from "@/components/base/select/select";
 import { Input } from "@/components/base/input/input";
 import { SearchLg } from "@untitledui/icons";
import { Badge } from "@/components/base/badges/badges";
import { Mail01 } from "@untitledui/icons";
import { useRouter } from "next/navigation";
import { SlideoutMenu } from "@/components/application/slideout-menus/slideout-menu";
import { FileUpload } from "@/components/application/file-upload/file-upload-base";
 
 type BookingFilter = "all" | "booked" | "reserved" | "cancelled";
type PaymentStatus = "on_track" | "due_soon" | "overdue";
type ProjectKey = "all" | "altius" | "valley" | "heights";

type Booking = {
    id: string;
    buyerName: string;
    phone: string;
    unit: string;
    project: ProjectKey;
    bookingDate: string;
    totalValue: number;
    amountPaid: number;
    nextDueDate: string;
    paymentStatus: PaymentStatus;
    state: Exclude<BookingFilter, "all">;
};
 
 export default function CustomersBookingsPage() {
     const [filter, setFilter] = useState<BookingFilter>("all");
     const [search, setSearch] = useState("");
    const [project, setProject] = useState<ProjectKey>("all");
    const router = useRouter();
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [bookingStep, setBookingStep] = useState<1 | 2 | 3 | 4>(1);
    const [bookingProjectId, setBookingProjectId] = useState<ProjectKey | "">(project);
    const [bookingTowerId, setBookingTowerId] = useState<string>("tower-a");
    const [bookingFloorId, setBookingFloorId] = useState<string | null>(null);
    const [bookingUnitIndex, setBookingUnitIndex] = useState<number | null>(null);
    const [buyerName, setBuyerName] = useState("");
    const [buyerPhone, setBuyerPhone] = useState("");
    const [buyerEmail, setBuyerEmail] = useState("");
    const [buyerPan, setBuyerPan] = useState("");
    const [buyerAddress, setBuyerAddress] = useState("");
    const [existingBuyer, setExistingBuyer] = useState<{ name: string; phone: string; email?: string } | null>(null);
    const [advanceAmount, setAdvanceAmount] = useState<string>("");
    const [paymentPlan, setPaymentPlan] = useState<"construction" | "custom" | "one_time">("construction");
    const [isLoan, setIsLoan] = useState<"yes" | "no">("no");
    const [loanBank, setLoanBank] = useState("");
    const [loanAmount, setLoanAmount] = useState<string>("");
    const [paymentMode, setPaymentMode] = useState<"Cash" | "Bank" | "UPI" | "Cheque">("Cash");
    const [receiptFiles, setReceiptFiles] = useState<Array<{ name: string; size: number; progress: number }>>([]);
    const [scheduleMode, setScheduleMode] = useState<"percent" | "value">("percent");
    const [scheduleRows, setScheduleRows] = useState<Array<{ id: string; label: string; percent: string; value: string }>>([]);

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
    const resetBookingFlow = () => {
        setBookingStep(1);
        setBookingProjectId(project);
        setBookingTowerId("tower-a");
        setBookingFloorId(null);
        setBookingUnitIndex(null);
        setBuyerName("");
        setBuyerPhone("");
        setBuyerEmail("");
        setBuyerPan("");
        setBuyerAddress("");
        setExistingBuyer(null);
        setAdvanceAmount("");
        setPaymentPlan("construction");
        setIsLoan("no");
        setLoanBank("");
        setLoanAmount("");
        setPaymentMode("Cash");
        setReceiptFiles([]);
        setScheduleMode("percent");
        setScheduleRows([]);
    };

    const bookings: Booking[] = [
        {
            id: "BKG-1001",
            buyerName: "Rohit Mehta",
            phone: "98765 43210",
            unit: "A-1203",
            project: "altius",
            bookingDate: "2026-02-08",
            totalValue: 9150000,
            amountPaid: 4500000,
            nextDueDate: "2026-03-10",
            paymentStatus: "due_soon",
            state: "booked",
        },
        {
            id: "BKG-1002",
            buyerName: "Neha Gupta",
            phone: "91234 56789",
            unit: "B-0705",
            project: "valley",
            bookingDate: "2026-01-28",
            totalValue: 7850000,
            amountPaid: 7850000,
            nextDueDate: "—",
            paymentStatus: "on_track",
            state: "booked",
        },
        {
            id: "BKG-1003",
            buyerName: "Amit Verma",
            phone: "90000 11122",
            unit: "C-0302",
            project: "heights",
            bookingDate: "2025-12-20",
            totalValue: 6050000,
            amountPaid: 3500000,
            nextDueDate: "2026-02-22",
            paymentStatus: "overdue",
            state: "booked",
        },
        {
            id: "BKG-1004",
            buyerName: "Priya Natarajan",
            phone: "98989 12345",
            unit: "A-0501",
            project: "altius",
            bookingDate: "2026-02-10",
            totalValue: 8350000,
            amountPaid: 1000000,
            nextDueDate: "2026-03-05",
            paymentStatus: "due_soon",
            state: "reserved",
        },
        {
            id: "BKG-1005",
            buyerName: "Vikas Sharma",
            phone: "99111 22233",
            unit: "B-1104",
            project: "valley",
            bookingDate: "2025-11-18",
            totalValue: 7250000,
            amountPaid: 2500000,
            nextDueDate: "2026-02-01",
            paymentStatus: "overdue",
            state: "booked",
        },
        {
            id: "BKG-1006",
            buyerName: "Manasa Rao",
            phone: "98000 55544",
            unit: "C-0802",
            project: "heights",
            bookingDate: "2026-02-12",
            totalValue: 6900000,
            amountPaid: 1200000,
            nextDueDate: "2026-02-20",
            paymentStatus: "due_soon",
            state: "booked",
        },
        {
            id: "BKG-1007",
            buyerName: "Karan Patel",
            phone: "98989 00011",
            unit: "A-0204",
            project: "altius",
            bookingDate: "2026-02-15",
            totalValue: 6200000,
            amountPaid: 500000,
            nextDueDate: "—",
            paymentStatus: "overdue",
            state: "cancelled",
        },
    ];

    const nf = useMemo(() => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }), []);

    const filtered = useMemo(() => {
        const term = search.trim().toLowerCase();
        return bookings.filter((b) => {
            const matchProject = project === "all" || b.project === project;
            const matchState = filter === "all" || b.state === filter;
            const matchSearch =
                !term ||
                b.buyerName.toLowerCase().includes(term) ||
                b.unit.toLowerCase().includes(term) ||
                b.phone.replace(/\s/g, "").includes(term.replace(/\s/g, ""));
            return matchProject && matchState && matchSearch;
        });
    }, [bookings, project, filter, search]);

    const metrics = useMemo(() => {
        const total = filtered.length;
        const activeBuyers = new Set(filtered.map((b) => b.buyerName)).size;
        const overdueCount = filtered.filter((b) => b.paymentStatus === "overdue").length;
        const paid = filtered.reduce((sum, b) => sum + b.amountPaid, 0);
        const totalValue = filtered.reduce((sum, b) => sum + b.totalValue, 0);
        const collectionPct = totalValue > 0 ? Math.round((paid / totalValue) * 100) : 0;
        return { total, activeBuyers, overdueCount, collectionPct };
    }, [filtered]);

    const projectChips: Array<{ id: ProjectKey; label: string }> = [
        { id: "all", label: "All Projects" },
        { id: "altius", label: "Altius" },
        { id: "valley", label: "Valley" },
        { id: "heights", label: "Heights" },
    ];
    const toBadgeColor = (s: PaymentStatus): "success" | "warning" | "error" =>
        s === "on_track" ? "success" : s === "due_soon" ? "warning" : "error";
 
    const riskScope = useMemo(
        () => bookings.filter((b) => project === "all" || b.project === project),
        [bookings, project],
    );

    const topPending = useMemo(() => {
        return riskScope
            .filter((b) => b.state !== "cancelled")
            .map((b) => ({ ...b, pending: Math.max(0, b.totalValue - b.amountPaid) }))
            .filter((b) => b.pending > 0)
            .sort((a, b) => b.pending - a.pending)
            .slice(0, 3);
    }, [riskScope]);

    const upcoming7Days = useMemo(() => {
        const today = new Date();
        const in7 = new Date(today);
        in7.setDate(today.getDate() + 7);
        const parse = (s: string) => {
            if (!s || s === "—") return null;
            const d = new Date(s);
            return isNaN(d.getTime()) ? null : d;
        };
        return riskScope
            .filter((b) => b.state !== "cancelled")
            .map((b) => ({ ...b, due: parse(b.nextDueDate), pending: Math.max(0, b.totalValue - b.amountPaid) }))
            .filter((b) => b.due && b.due >= today && b.due <= in7)
            .sort((a, b) => (a.due!.getTime() - b.due!.getTime()))
            .slice(0, 3);
    }, [riskScope]);

    const recentCancelled = useMemo(() => {
        return riskScope
            .filter((b) => b.state === "cancelled")
            .sort((a, b) => (new Date(b.bookingDate).getTime() - new Date(a.bookingDate).getTime()))
            .slice(0, 3);
    }, [riskScope]);

     return (
         <section className="flex min-h-screen flex-col lg:pl-[300px]">
             <div className="top-0 z-10 px-4 md:px-8 pt-6 pb-4">
                 <div className="w-full max-w-8xl">
                     <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                         <div className="flex flex-col gap-1">
                             <h1 className="text-display-sm font-semibold text-primary">Customers &amp; Bookings</h1>
                         </div>
                         <div className="mt-3 md:mt-0 grid grid-cols-1 gap-2 md:flex md:items-center md:gap-2">
                            <Button
                                size="sm"
                                className="w-full md:w-auto"
                                onClick={() => {
                                    const params = new URLSearchParams();
                                    params.set("returnTo", "/admin/builder/customers-bookings");
                                    router.push(`/admin/builder/customers-bookings/add-booking?${params.toString()}`);
                                }}
                            >
                                 + Add Booking
                             </Button>
                             <div className="w-full md:w-48 shrink-0">
                                 <Select
                                     size="sm"
                                     placeholder="Filter"
                                     items={[
                                         { id: "booked", label: "Booked" },
                                         { id: "reserved", label: "Reserved" },
                                         { id: "cancelled", label: "Cancelled" },
                                         { id: "all", label: "All" },
                                     ]}
                                     selectedKey={filter}
                                     onSelectionChange={(key) => setFilter(String(key) as BookingFilter)}
                                 >
                                     {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                 </Select>
                             </div>
                             <div className="w-full md:w-72">
                                 <Input
                                     size="sm"
                                     placeholder="Search by name / unit / phone"
                                     icon={SearchLg}
                                     value={search}
                                     onChange={(v) => setSearch(v)}
                                 />
                             </div>
                         </div>
                     </div>
                </div>
             </div>
 
            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-4 md:px-8 pb-12 mt-10">
                <div className="w-full max-w-8xl grid gap-6">
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                        <div className="rounded-2xl bg-primary p-4 md:p-5 shadow-xs ring-1 ring-secondary_alt">
                            <p className="text-xs font-semibold uppercase tracking-wide text-quaternary">Total Bookings</p>
                            <p className="mt-2 text-3xl font-semibold text-primary">{metrics.total}</p>
                        </div>
                        <div className="rounded-2xl bg-primary p-4 md:p-5 shadow-xs ring-1 ring-secondary_alt">
                            <p className="text-xs font-semibold uppercase tracking-wide text-quaternary">Active Buyers</p>
                            <p className="mt-2 text-3xl font-semibold text-primary">{metrics.activeBuyers}</p>
                        </div>
                        <div className="rounded-2xl bg-primary p-4 md:p-5 shadow-xs ring-1 ring-secondary_alt">
                            <p className="text-xs font-semibold uppercase tracking-wide text-quaternary">Overdue Payments</p>
                            <p className="mt-2 text-3xl font-semibold text-primary">{metrics.overdueCount}</p>
                        </div>
                        <div className="rounded-2xl bg-primary p-4 md:p-5 shadow-xs ring-1 ring-secondary_alt">
                            <p className="text-xs font-semibold uppercase tracking-wide text-quaternary">Collection % This Month</p>
                            <p className="mt-2 text-3xl font-semibold text-primary">{metrics.collectionPct}%</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 overflow-x-auto pb-1">
                        {projectChips.map((chip) => (
                            <Button
                                key={chip.id}
                                size="sm"
                                color={project === chip.id ? "secondary" : "tertiary"}
                                className="rounded-full"
                                onClick={() => setProject(chip.id)}
                            >
                                {chip.label}
                            </Button>
                        ))}
                    </div>

                    <div className="rounded-2xl bg-primary p-0 shadow-xs ring-1 ring-secondary_alt">
                        <div className="hidden md:grid grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,0.9fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.9fr)] gap-3 px-4 py-2 text-xs font-medium text-tertiary">
                            <div>Buyer</div>
                            <div>Unit · Project</div>
                            <div>Booking date</div>
                            <div>Total value</div>
                            <div>Amount paid</div>
                            <div>Next due</div>
                            <div className="text-right">Status</div>
                        </div>
                        <ul className="divide-y divide-secondary">
                            {filtered.length === 0 ? (
                                <li className="px-4 py-6 text-sm text-secondary">No bookings match the filters.</li>
                            ) : (
                                filtered.map((b) => (
                                    <li
                                        key={b.id}
                                        role="button"
                                        tabIndex={0}
                                        onClick={() => router.push(`/admin/builder/customers-bookings/${b.id}`)}
                                        className="grid grid-cols-1 gap-2 px-4 py-3 transition-colors hover:bg-primary_hover cursor-pointer md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,0.9fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.9fr)] md:items-center"
                                    >
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-semibold text-primary">{b.buyerName}</p>
                                            <p className="truncate text-xs text-tertiary">{b.phone}</p>
                                        </div>
                                        <div className="text-sm text-secondary">
                                            <span className="text-primary font-medium">{b.unit}</span> ·{" "}
                                            <span className="text-tertiary capitalize">{b.project}</span>
                                        </div>
                                        <div className="text-xs text-secondary">{b.bookingDate}</div>
                                        <div className="text-xs text-primary font-semibold">{nf.format(b.totalValue)}</div>
                                        <div className="text-xs text-secondary">{nf.format(b.amountPaid)}</div>
                                        <div className="text-xs text-secondary">{b.nextDueDate}</div>
                                        <div className="md:text-right">
                                            <Badge type="pill-color" size="sm" color={toBadgeColor(b.paymentStatus)}>
                                                {b.paymentStatus === "on_track" ? "On track" : b.paymentStatus === "due_soon" ? "Due soon" : "Overdue"}
                                            </Badge>
                                        </div>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>

                    <div className="rounded-2xl bg-primary p-4 md:p-5 shadow-xs ring-1 ring-secondary_alt">
                        <div className="flex items-center justify-between gap-2">
                            <div>
                                <h2 className="text-sm font-semibold text-primary">Risk Panel</h2>
                                <p className="text-xs text-tertiary">Where cash risk is forming</p>
                            </div>
                        </div>
                        <div className="mt-4 grid gap-4 md:grid-cols-3">
                            <div className="rounded-xl bg-primary_hover p-3 ring-1 ring-secondary_alt">
                                <p className="text-sm font-semibold text-primary">Highest pending amount</p>
                                <ul className="mt-2 space-y-2">
                                    {topPending.length === 0 && <li className="text-xs text-secondary">No pending amounts.</li>}
                                    {topPending.map((b) => (
                                        <li key={b.id} className="flex items-center justify-between gap-2">
                                            <div className="min-w-0">
                                                <p className="truncate text-sm font-medium text-primary">{b.buyerName}</p>
                                                <p className="truncate text-xs text-tertiary">{b.unit} · {b.project}</p>
                                            </div>
                                            <span className="shrink-0 text-xs font-semibold text-primary">{nf.format((b as any).pending)}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="rounded-xl bg-primary_hover p-3 ring-1 ring-secondary_alt">
                                <p className="text-sm font-semibold text-primary">Upcoming in 7 days</p>
                                <ul className="mt-2 space-y-2">
                                    {upcoming7Days.length === 0 && <li className="text-xs text-secondary">No upcoming payments.</li>}
                                    {upcoming7Days.map((b) => (
                                        <li key={b.id} className="flex items-center justify-between gap-2">
                                            <div className="min-w-0">
                                                <p className="truncate text-sm font-medium text-primary">{b.buyerName}</p>
                                                <p className="truncate text-xs text-tertiary">
                                                    Due {(b as any).due?.toISOString().slice(0,10)} • {b.unit}
                                                </p>
                                            </div>
                                            <span className="shrink-0 text-xs font-semibold text-primary">{nf.format((b as any).pending)}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="rounded-xl bg-primary_hover p-3 ring-1 ring-secondary_alt">
                                <p className="text-sm font-semibold text-primary">Recent cancellations</p>
                                <ul className="mt-2 space-y-2">
                                    {recentCancelled.length === 0 && <li className="text-xs text-secondary">No recent cancellations.</li>}
                                    {recentCancelled.map((b) => (
                                        <li key={b.id} className="flex items-center justify-between gap-2">
                                            <div className="min-w-0">
                                                <p className="truncate text-sm font-medium text-primary">{b.buyerName}</p>
                                                <p className="truncate text-xs text-tertiary">{b.unit} · {b.project}</p>
                                            </div>
                                            <span className="shrink-0 text-xs text-secondary">{b.bookingDate}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

         </section>
     );
 }
 
